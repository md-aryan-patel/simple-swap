const hre = require("hardhat");
const { toWei } = require("../utils/converter");

async function main() {
  const FirstToken = await hre.ethers.getContractFactory("firstToken");
  const firstToken = await FirstToken.deploy();
  await firstToken.deployed();

  const SecondToken = await hre.ethers.getContractFactory("secondToken");
  const secondToken = await SecondToken.deploy();
  await secondToken.deployed();

  const Swap = await hre.ethers.getContractFactory("TokenSwap");
  const swap = await Swap.deploy(process.env.sep_XETH, process.env.sep_XBTC, {
    value: toWei(0.1),
  });
  await swap.deployed();

  console.log(`First token deplyed to: ${firstToken.address}`);

  console.log(`Second token deplyed to: ${secondToken.address}`);

  console.log(`Swap token deplyed to: ${swap.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
