const { ethers } = require("hardhat");
const di = require("../di/mainModule");
const ethAbi = require("../artifacts/contracts/firstToken.sol/firstToken.json");
const btcAbi = require("../artifacts/contracts/secondToken.sol/secondToken.json");
const { toWei } = require("../utils/converter");

const adminSepoliaWallet = di.AdminSepoliaWallet.getSepoliaWallet();
const adminPolygonWallet = di.AdminPolygonWallet.getPolygonWallet();
const user = process.env.user_address;

const sepoliaEth = new ethers.Contract(
  process.env.sep_XETH,
  ethAbi.abi,
  di.SepoliaProvider.getSepoliaProvider()
);

const polygonEth = new ethers.Contract(
  process.env.pol_XETH,
  ethAbi.abi,
  di.PolygonProvider.getPolygonProvider()
);

const sepoliaBtc = new ethers.Contract(
  process.env.sep_XBTC,
  btcAbi.abi,
  di.SepoliaProvider.getSepoliaProvider()
);

const polygonBtc = new ethers.Contract(
  process.env.pol_XBTC,
  btcAbi.abi,
  di.PolygonProvider.getPolygonProvider()
);

/* Initial Minting */

const mintEthOnSepolia = async (_amount) => {
  const result = await sepoliaEth
    .connect(adminSepoliaWallet)
    .mint(process.env.user_address, _amount);
  console.log(result.hash);
};

const mintEthOnPolygon = async (_amount) => {
  const result = await polygonEth
    .connect(adminPolygonWallet)
    .mint(process.env.user_address, _amount);
  console.log(result.hash);
};

const mintBtcOnSepolia = async (_amount) => {
  const result = await sepoliaBtc
    .connect(adminSepoliaWallet)
    .mint(process.env.user_address, _amount);
  console.log(result.hash);
};

const mintBtcOnPolygon = async (_amount) => {
  const result = await polygonBtc
    .connect(adminPolygonWallet)
    .mint(process.env.user_address, _amount);
  console.log(result.hash);
};

/* Adding validators */

const addValidatorOnSepoliEth = async (_address) => {
  const result = await sepoliaEth
    .connect(adminSepoliaWallet)
    .addValidato(_address);
  console.log(result.hash);
};

const addValidatorOnSepoliBtc = async (_address) => {
  const result = await sepoliaBtc
    .connect(adminSepoliaWallet)
    .addValidato(_address);
  console.log(result.hash);
};

const addValidatorOnPolygonEth = async (_address) => {
  const result = await polygonEth
    .connect(adminPolygonWallet)
    .addValidato(_address);
  console.log(result.hash);
};

const addValidatorOnPolygonBtc = async (_address) => {
  const result = await polygonBtc
    .connect(adminPolygonWallet)
    .addValidato(_address);
  console.log(result.hash);
};

/* Getting Balance */

const getBalanceEthSepolia = async (_address) => {
  const result = await sepoliaEth.balanceOf(_address);
  console.log(`Eth on sepolia: ${result}`);
};

const getBalanceBtcSepolia = async (_address) => {
  const result = await sepoliaBtc.balanceOf(_address);
  console.log(`Btc on sepolia: ${result}`);
};

const getBalanceEthPolygon = async (_address) => {
  const result = await polygonEth.balanceOf(_address);
  console.log(`Eth on polygon: ${result}`);
};

const getBalanceBtcPolygon = async (_address) => {
  const result = await polygonBtc.balanceOf(_address);
  console.log(`Btc on polygon: ${result}`);
};

const getNames = async () => {
  console.log(await sepoliaBtc.name());
  console.log(await sepoliaEth.name());
  console.log(await polygonBtc.name());
  console.log(await polygonEth.name());
};

const main = async () => {
  await getNames();
  /*_____mint aount for user_______/
  const amount = toWei(100);
  await mintEthOnSepolia(amount);
  await mintEthOnPolygon(amount);
  await mintBtcOnSepolia(amount);
  await mintBtcOnPolygon(amount);
  /*______________________________*/
  /*_______________Log balance_______________ */
  await getBalanceBtcPolygon(user);
  await getBalanceEthPolygon(user);
  await getBalanceBtcSepolia(user);
  await getBalanceEthSepolia(user);
  /*__________________________________________*/
  /*_______________add swap address as validator____________*/
  // await addValidatorOnPolygonBtc(process.env.pol_swap);
  // await addValidatorOnPolygonEth(process.env.pol_swap);
  // await addValidatorOnSepoliBtc(process.env.sep_swap);
  // await addValidatorOnSepoliEth(process.env.sep_swap);
};
main();
