//Connect wallet
    //Press Button
    //Call your wallet to TransferFrom Wallet 10ETH.
    // token, user, amount, balance
    //When your deposit is done your account is added to the Participant
    //Gets lock for 1h
    //When time is up the contract draws a random address from the participant array
    //Allows the person to withdraw the amount minus 5% 
    //if the person doesnt WD before the next round the next person gets both amounts. 
    //Times restarts and accept deposit again.
    // One entry per wallet.

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract LotteryContract{
        struct Depositer {
            address userAddress;
            uint256 amount;
        }
        Depositer[] public depositersList;
        event Deposit(address indexed user, uint256 amount);

        function deposit() external payable {
            require(msg.value > 10);
            bool isNewDepositer = true;
            //Only 1 entry per wallet
            for (uint256 i = 0; i < depositersList.length; i++) {
                if (depositersList[i].userAddress == msg.sender) {
                    depositersList[i].amount += msg.value;
                    isNewDepositer = false;
                    break;
                }
            }
            emit Deposit(msg.sender, msg.value);
        }

        function getContractBalance() public view returns (uint256) {
            return address(this).balance;
        }
}
