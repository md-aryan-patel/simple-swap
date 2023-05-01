const { ethers } = require("hardhat");

const toWei = (num) => ethers.utils.parseEther(num.toString());
const toEth = (num) => ethers.utils.formatEther(num);
module.exports = { toWei, toEth };
