//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

import "hardhat/console.sol";

contract LotteryContract{
    AggregatorV3Interface internal priceFeed;

    struct Depositer {
        address userAddress;
        uint256 amount;
    }
    Depositer[] public depositersList;
    event Deposit(address indexed user, uint256 amount);

    constructor(address _priceFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
    }
    function getLatestPrice() public view returns (int) {
        (   , //roundID
            int price,
            , // startedAt
            , // timeStamp
            // answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }

    function deposit() external payable {
        int ethUsdPrice = 3000;//getLatestPrice();
        uint256 requiredAmountInWei = (10 * 10**18) / uint256(ethUsdPrice);
        require(msg.value >= requiredAmountInWei);
        bool isNewDepositer = true;
        //Only 1 entry per wallet
        for (uint256 i = 0; i < depositersList.length; i++) {
            if (depositersList[i].userAddress == msg.sender) {
                depositersList[i].amount += msg.value;
                isNewDepositer = false;
                break;
            }
        }
        // If the depositer is new, add them to the depositersList
        if (isNewDepositer) {
            depositersList.push(Depositer({
                userAddress: msg.sender,
                amount: msg.value
            }));
        }
        emit Deposit(msg.sender, msg.value);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    function getDepositersList() public view returns (Depositer[] memory) {
        return depositersList;
    }
}
