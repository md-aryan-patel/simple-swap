const { ethers } = require("hardhat");
const di = require("../di/mainModule");
const swapAbi = require("../artifacts/contracts/swap.sol/TokenSwap.json");
const { toWei } = require("../utils/converter");

require("dotenv").config();

const sepoliaUserWallet = di.UserSepoliaWallet.getSepoliaWallet();
const polygonUserWallet = di.UserPolygonWallet.getPolygonWallet();
const adminPolygonWallet = di.AdminPolygonWallet.getPolygonWallet();

const sepolia_swap = new ethers.Contract(
  process.env.sep_swap,
  swapAbi.abi,
  di.SepoliaProvider.getSepoliaProvider()
);

const polygon_swap = new ethers.Contract(
  process.env.pol_swap,
  swapAbi.abi,
  di.PolygonProvider.getPolygonProvider()
);

const getSignatureOnPolygon = async (_from, _to, _amount, _nonce) => {
  const hash = await sepolia_swap.getMessageHash(_from, _to, _amount, _nonce);
  const sign = await sepoliaUserWallet.signMessage(ethers.utils.arrayify(hash));
  return sign;
};

const getSignatureOnSepolia = async (_from, _to, _amount, _nonce) => {
  const hash = await polygon_swap.getMessageHash(_from, _to, _amount, _nonce);
  const sign = await polygonUserWallet.signMessage(ethers.utils.arrayify(hash));
  return sign;
};

const burnEthOnSepoliaAndgetBtcOnPolygon = async (_to, _amount) => {
  const result = await sepolia_swap
    .connect(sepoliaUserWallet)
    .burnEth(process.env.user_address, toWei(_amount));
  console.log(`Burn hash: ${result.hash}`);
  sepolia_swap.on("Swap", async (from, to, amount, nonce, timestamp, state) => {
    console.log("Swap called....");
    sepolia_swap.on("LogPriceUpdated", async (price) => {
      await mintBtcOnPolygon(from, to, amount, price, nonce);
    });
  });
  polygon_swap.off("Swap", () => {});
  polygon_swap.off("LogPriceUpdated", () => {});
};

const mintBtcOnPolygon = async (_from, _to, _amount, _price, _nonce) => {
  const signature = await getSignatureOnPolygon(_from, _to, _amount, 1);

  const result = await polygon_swap
    .connect(adminPolygonWallet)
    .mintBtc(_from, _to, _amount, toWei(_price), 1, signature);
  console.log("Minted on hash: " + result.hash);
};

const burnBtcOnSepoliaAndgetEthOnPolygon = async (_to, _amount) => {
  const result = await sepolia_swap
    .connect(sepoliaUserWallet)
    .burnBtc(process.env.user_address, toWei(_amount));
  console.log(`Burn Hash: ${result.hash}`);
  sepolia_swap.on("Swap", async (from, to, amount, nonce, timestamp, state) => {
    console.log("Swap called....");
    sepolia_swap.on("LogPriceUpdated", async (price) => {
      await mintEthOnPolygon(from, to, amount, price, nonce);
    });
  });
};

const mintEthOnPolygon = async (_from, _to, _amount, _price, _nonce) => {
  const signature = await getSignatureOnPolygon(_from, _to, _amount, 1);

  const result = await polygon_swap
    .connect(adminPolygonWallet)
    .mintEth(_from, _to, _amount, toWei(_price), 1, signature);
  console.log("Minted on hash: " + result.hash);
};

const main = async () => {
  burnEthOnSepoliaAndgetBtcOnPolygon(process.env.user_address, 1);
};

main();
