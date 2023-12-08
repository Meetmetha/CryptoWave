pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BondContract is Ownable {

    struct TokenConfig {
        uint256 minDeposit;
        bool isSupported;
    }
    struct Bond {
        address depositor;
        address token;
        uint256 amount;
        bytes32 hash;
    }
    event BondCreated(address creator, address token, uint256 bondId);
    event BondRedeemed(address redemmer, address token, uint256 bondId);

    mapping(address => TokenConfig) public tokenConfigs;
    mapping(uint256 => Bond) private bonds;

    uint256 private nextBondId;

    function setTokenConfig(address token, uint256 minDeposit) external  onlyOwner {
        tokenConfigs[token] = TokenConfig(minDeposit, true);
    }

    function createBond(address token, uint256 amount, bytes32 hash) public {
        require(tokenConfigs[token].isSupported, "Token not supported");
        require(amount >= tokenConfigs[token].minDeposit, "Deposit too low");
        require(IERC20(token).allowance(msg.sender, address(this)) >= amount, "Insufficient allowance");
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        uint256 bondId = nextBondId;
        nextBondId++;//Increment Bond
        bonds[bondId] = Bond(msg.sender, token, amount, hash);
        emit BondCreated(msg.sender, token, bondId);
    }

    function redeemBond(uint256 bondId, string memory key) public {
        require(bonds[bondId].depositor != address(0), "Bond does not exist");
        Bond storage bondData = bonds[bondId];
        require(keccak256(abi.encodePacked(key)) == bondData.hash, "Invalid Key");
        address token = bondData.token;
        IERC20(token).transfer(msg.sender, bondData.amount);
        delete bonds[bondId];//Remove Bond
        emit BondRedeemed(msg.sender, token, bondId);
    }

    function getBondData(uint256 bondId) external view returns(address depositor,address token,uint256 amount,bytes32 hash) {
        Bond storage bondData = bonds[bondId];
        require(bondData.depositor != address(0), "Bond does not exist");
        return (bondData.depositor,bondData.token,bondData.amount,bondData.hash);
    }

    function getHashOfKey(string memory key) external pure returns(bytes32) {
        return keccak256(abi.encodePacked(key));
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