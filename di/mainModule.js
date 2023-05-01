const { ethers } = require("hardhat");
require("dotenv").config();

const sepoliaUrl = process.env.sepolia_network;
const polygonUrl = process.env.polygon_network;

const SepoliaProvider = (() => {
  let provider;
  const createProvider = () => {
    provider = new ethers.providers.JsonRpcProvider(sepoliaUrl);
    return provider;
  };
  return {
    getSepoliaProvider: () => {
      if (!provider) provider = createProvider();
      return provider;
    },
  };
})();

const PolygonProvider = (() => {
  let provider;
  const createProvider = () => {
    provider = new ethers.providers.JsonRpcProvider(polygonUrl);
    return provider;
  };
  return {
    getPolygonProvider: () => {
      if (!provider) provider = createProvider();
      return provider;
    },
  };
})();

const UserSepoliaWallet = (() => {
  let wallet;
  const createWallet = () => {
    wallet = new ethers.Wallet(
      process.env.user_private_key,
      SepoliaProvider.getSepoliaProvider()
    );
    return wallet;
  };

  return {
    getSepoliaWallet: () => {
      if (!wallet) wallet = createWallet();
      return wallet;
    },
  };
})();

const UserPolygonWallet = (() => {
  let wallet;
  const createWallet = () => {
    wallet = new ethers.Wallet(
      process.env.user_private_key,
      PolygonProvider.getPolygonProvider()
    );
    return wallet;
  };

  return {
    getPolygonWallet: () => {
      if (!wallet) wallet = createWallet();
      return wallet;
    },
  };
})();

const AdminSepoliaWallet = (() => {
  let wallet;
  const createWallet = () => {
    wallet = new ethers.Wallet(
      process.env.admin_private_key,
      SepoliaProvider.getSepoliaProvider()
    );
    return wallet;
  };

  return {
    getSepoliaWallet: () => {
      if (!wallet) wallet = createWallet();
      return wallet;
    },
  };
})();

const AdminPolygonWallet = (() => {
  let wallet;
  const createWallet = () => {
    wallet = new ethers.Wallet(
      process.env.admin_private_key,
      PolygonProvider.getPolygonProvider()
    );
    return wallet;
  };

  return {
    getPolygonWallet: () => {
      if (!wallet) wallet = createWallet();
      return wallet;
    },
  };
})();

module.exports = {
  SepoliaProvider,
  AdminSepoliaWallet,
  UserSepoliaWallet,
  PolygonProvider,
  UserPolygonWallet,
  AdminPolygonWallet,
};
