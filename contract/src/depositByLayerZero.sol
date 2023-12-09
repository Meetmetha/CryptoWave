pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@layerzero-contracts/lzApp/NonblockingLzApp.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract depositByLayerZero is NonblockingLzApp {

    constructor( address _destinationReciever,uint16 _destinationChainbyLayerZero, address _lzEndpoint) NonblockingLzApp(_lzEndpoint){
        destinationReciever = _destinationReciever;
        endpoint = ILayerZeroEndpoint(_lzEndpoint);
        destinationChainbyLayerZero = _destinationChainbyLayerZero;
    }

    //DepositFunds Configs
    mapping(address => TokenConfig) public tokenConfigs;
    mapping(uint256 => Deposit) public deposits;
    uint256 public nextDepositId;
    struct TokenConfig {
        bool isSupported;
        uint256 minDeposit;
        address datafeedchalinlink;
        int256 defaultPrice; // 8 decimal
    }
    struct Deposit {
        address depositFor;
        address user;
        address token;
        uint256 amount;
    }

    //Destination Configs 
    address public destinationReciever;
    uint16 public destinationChainbyLayerZero;
    event deposited(address depositFor,address depositor,uint256 USDvalue);

    //LayerZero Configs
    ILayerZeroEndpoint public endpoint;
    event MessageSent(
            uint16 destinationChainbyLayerZero,
            address destinationReciever,
            address depositFor,
            address depositor,
            uint256 USDvalue
        );

    //Owner Functions
    function setTokenConfig(address token,uint256 minDeposit, address datafeed,int256 defaultPrice) external  onlyOwner {
        tokenConfigs[token] = TokenConfig(true,minDeposit,datafeed,defaultPrice);
    }

    function setdestinationChainbyLayerzero(uint16 _destinationChainID) external  onlyOwner {
        destinationChainbyLayerZero = _destinationChainID;
    }

    function setDestinationReciever(address _destinationReciever) external  onlyOwner {
        destinationReciever = _destinationReciever;
    }

    // User Functions
    function depositCollateral(address depositFor, address token, uint256 amount) external  {
        require(tokenConfigs[token].isSupported, "Token not supported");
        require(amount >= tokenConfigs[token].minDeposit, "Deposit too low");
        require(IERC20(token).allowance(_msgSender(), address(this)) >= amount, "Insufficient allowance");
        IERC20(token).transferFrom(_msgSender(), address(this), amount);
        uint256 depositID = nextDepositId;
        nextDepositId++;
        deposits[depositID] = Deposit(depositFor,_msgSender(),token,amount);
        uint256 USDvalue = amount * uint256(getAssetPrice(token));
        emit deposited(depositFor,_msgSender(), USDvalue);
        _sendViaLayerZero(depositFor,_msgSender(), USDvalue);
        
    }

    //LayerZero
    function _nonblockingLzReceive(
        uint16,
        bytes memory,
        uint64,
        bytes memory
    ) internal override {
        revert("We dont accept Incoming messages");
    }


    function _sendViaLayerZero(
        address depositFor,
        address depositor,
        uint256 USDvalue
    ) internal {
        bytes memory data = abi.encode(depositFor,depositor,USDvalue);
        uint16 version = 1;
        uint256 gasForLzReceive = 350000;
        bytes memory adapterParams = abi.encodePacked(version, gasForLzReceive);
        (uint256 messageFee, ) = lzEndpoint.estimateFees(
            destinationChainbyLayerZero,
            address(this),
            data,
            false,
            adapterParams
        );
        bytes memory trustedRemote = trustedRemoteLookup[destinationChainbyLayerZero];
        endpoint.send{value:messageFee}(
            destinationChainbyLayerZero,
            trustedRemote,
            data,
            payable(msg.sender),
            address(this),
            bytes("")
        );
        emit MessageSent(
            destinationChainbyLayerZero,
            destinationReciever,
            depositFor,
            depositor,
            USDvalue
        );
    }

    function getAssetPrice(address token) internal view returns (int){
        if(tokenConfigs[token].datafeedchalinlink != address(0)){
            AggregatorV3Interface priceFeed = AggregatorV3Interface(tokenConfigs[token].datafeedchalinlink);
            (,int price,,,) = priceFeed.latestRoundData();
            return price;
        }
        else{
            return tokenConfigs[token].defaultPrice; 
        }
    }

    function recoverEther() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function recoverTokens(address tokenAddress) external onlyOwner {
        IERC20 token = IERC20(tokenAddress);
        token.transfer(owner(), token.balanceOf(address(this)));
    }
    
    fallback() external payable {}
    receive() external payable {}

}