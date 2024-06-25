//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

//Connect wallet
    //Press Button
    //Call your wallet to TransferFrom Wallet 10USD of ETH.
    // token, user, amount, balance
    //When your deposit is done your account is added to the Participant
    //Gets lock for 1h
    //When time is up the contract draws a random address from the participant array
    //Allows the person to withdraw the amount minus 5% 
    //if the person doesnt WD before the next round the next person gets both amounts. 
    //Times restarts and accept deposit again.
    // One entry per wallet.

import "hardhat/console.sol";

contract LotteryContract{
    mapping (address => _Bet) public bets;

    event Deposit(
        address indexed user,
        uint256 amountEth,
        uint256 timestamp
    );

    struct _Bet {
        address user; // User who made the order
        uint256 amountEth; // Amount they give
        uint256 timestamp; //When order was created
    }

    //Deposits
    function depositEth(uint256 _amountEth) public payable{
        // with msg.value we can get the amount of ETHER of the sender
        //require(msg.value, "Not enough Ether");
        bets[msg.sender] = _Bet({
            user: msg.sender,
            amountEth: _amountEth,
            timestamp: block.timestamp
        });
        emit Deposit(
            msg.sender,
            _amountEth,
            block.timestamp
        );
    }
}