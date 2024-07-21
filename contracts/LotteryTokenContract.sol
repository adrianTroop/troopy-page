//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";

contract LotteryTokenContract{
    address public feeAccount;
    uint256 public feePercent;
    uint256 public depositBalance;
    mapping(address => mapping(address => uint256)) public tokens;
    mapping(address => address[]) public tokenUsers;

    event Deposit(
        address token,
        address user,
        uint256 amount,
        uint256 balance
    );

    constructor(address _feeAccount, uint256 _feePercent){
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    function depositToken(address _token, uint256 _amount) public{
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));
        if (tokens[_token][msg.sender] == 0) {
            tokenUsers[_token].push(msg.sender); // Add user to tracking if new depositor
        }
        tokens[_token][msg.sender] += _amount;
        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    function balanceOf(address _token, address _user) 
        public
        view
        returns (uint256)
    {
        return tokens[_token][_user];
    }
    function balanceTotal(address _token) 
        public
        view
        returns (uint256 total)
    {
        address[] memory users = tokenUsers[_token];
        for (uint256 i = 0; i < users.length; i++) {
            total += tokens[_token][users[i]];
            }
        return total;
    }
}