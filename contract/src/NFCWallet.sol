pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import {Client} from "./Client.sol";
import {CCIPReceiver} from "./CCIPReceiver.sol";
import "@layerzero-contracts/lzApp/NonblockingLzApp.sol";

contract NFCWallet is CCIPReceiver, NonblockingLzApp {

    constructor( address _lzEndpoint,address router) NonblockingLzApp(_lzEndpoint) CCIPReceiver(router){
        endpoint = ILayerZeroEndpoint(_lzEndpoint);
        totalSupply = 1000*10**8;
        balances[msg.sender] = totalSupply;
    }

    struct SpendLimit {
        uint256 spendLimitSet;
        uint256 spendLimitUsed;
    }

    //Wallet Config
    mapping(address => uint256) balances;
    mapping(address => SpendLimit) public spendLimits;
    uint256 totalSupply;
    address public admin;
    event paymentSuccess(address payFrom,address payTo,uint256 amount);
    event depositCrosschain(address depositFor,address depositor,uint256 amount,uint64 chainID);

    modifier onlyRelayer() {
        require(admin == msg.sender, "Only the admin can call this function");
        _;
    }

    mapping(uint64 => bool) public allowlistedSourceChains;
    mapping(address => bool) public allowlistedSenders;
    modifier onlyAllowlistedCCIPSender(uint64 _sourceChainSelector, address _sender) {
        require(allowlistedSourceChains[_sourceChainSelector],"Source Chain Invalid");
        require(allowlistedSenders[_sender],"Invalid Sender");
        _;
    }

    function allowlistSourceChain(
        uint64 _sourceChainSelector,
        bool allowed
    ) external onlyOwner {
        allowlistedSourceChains[_sourceChainSelector] = allowed;
    }

    function allowlistSender(address _sender, bool allowed) external onlyOwner {
        allowlistedSenders[_sender] = allowed;
    }

    ILayerZeroEndpoint public endpoint;

    function setAdmin(address _admin) external onlyOwner {
        admin = _admin;
    }

    function balanceOf(address owner) public view returns (uint) {
        return balances[owner];
    }

    function resetSpendLimit(uint256 _spendlimit) external {
        require(_spendlimit <= balances[msg.sender],"SpendLimit is greater than user balance");
        spendLimits[msg.sender].spendLimitSet = _spendlimit;
        spendLimits[msg.sender].spendLimitUsed = 0;
    }

    function getSpendlimit(address _spenderAddress) external view returns (uint256){
        return spendLimits[_spenderAddress].spendLimitSet;
    }

    function getSpendlimitUsed(address _spenderAddress) external view returns (uint256){
        return spendLimits[_spenderAddress].spendLimitUsed;
    }

    function getUserdata(address user) external view returns (uint256,uint256){
        return (balances[user],spendLimits[user].spendLimitSet);
    }

    function getUserHash(address user) external view returns (bytes32){
        return keccak256(abi.encode(user,spendLimits[user].spendLimitSet));
    }

    function decimals() public pure  returns (uint) {
        return 8;
    }

    function processPay(address payFrom,address payTo,uint amount) external onlyRelayer returns (bool) {
        require(amount <= balances[payFrom],"Not Enough Balance");
        require(amount <= spendLimits[payFrom].spendLimitSet - spendLimits[payFrom].spendLimitUsed,"SpendLimit Exceeded");
        balances[payFrom] = balances[payFrom] - amount;
        balances[payTo] = balances[payTo] + amount;
        spendLimits[payFrom].spendLimitUsed=spendLimits[payFrom].spendLimitUsed+amount;
        emit paymentSuccess(payFrom, payTo, amount);
        return true;
    }

    function _processDeposit(address depositFor,address depositor,uint256 amount,uint64 chainID) internal {
        balances[depositFor] = balances[depositFor] + amount;
        emit depositCrosschain(depositFor,depositor,amount,chainID);
    }

    function setCustomBalanceForUser(address user,uint256 _amount) external onlyOwner {
        balances[user] = balances[user] + _amount;
    }

    // ChalinkLink Config for this Contract
    event MessageReceived(
        bytes32 indexed messageId, 
        uint64 indexed sourceChainSelector,
        address sender, 
        address depositor,
        uint256 amount
    );

    // CCIP Reciever
    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal override onlyAllowlistedCCIPSender(
            any2EvmMessage.sourceChainSelector,
            abi.decode(any2EvmMessage.sender, (address))
        ) {
        (address depositFor,address depositor, uint256 amount) = abi.decode(any2EvmMessage.data, (address, address, uint256));
        _processDeposit(depositFor,depositor,amount,any2EvmMessage.sourceChainSelector);
        emit MessageReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector, // fetch the source chain identifier (aka selector)
            abi.decode(any2EvmMessage.sender, (address)), // abi-decoding of the sender address,
            depositor,
            amount
        );
    }

    // Layerzero Config
    event MessageReceivedbyLZ(
        uint16 indexed sourceChainSelector,
        address sender, 
        address depositor,
        uint256 amount
    );

    // LayerZero Reciever
    function _nonblockingLzReceive(uint16 _srcChainId, bytes memory _srcAddress, uint64 _nonce, bytes memory _payload) internal override {
        (address depositFor,address depositor, uint256 amount) = abi.decode(_payload, (address, address, uint256));
        _processDeposit(depositFor,depositor,amount,_srcChainId);  
        emit MessageReceivedbyLZ(_srcChainId,depositFor,depositor,amount);
    }

    fallback() external payable {}
    receive() external payable {}
}