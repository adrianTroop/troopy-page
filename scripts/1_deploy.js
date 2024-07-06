const { ethers } = require("hardhat");

async function main() {
    console.log(`Preparing deployment... \n`)
    //fetch contract
    const Token = await ethers.getContractFactory("LotteryContract")

    const accounts = await ethers.getSigners()

    console.log(`Accounts fetched: \n ${accounts[0].address}\n${accounts[1].address}\n`)

    //Deploy contracts
    const lotteryContract = await Token.deploy()
    await lotteryContract.deployed()
    console.log(`LotteryContract Deployed to: ${lotteryContract.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
