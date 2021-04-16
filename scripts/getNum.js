const Web3= require("web3");
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()

const infuraKey = process.env.INFURA_API_KEY;
const mnemonic = process.env.MNEMONIC

const provider = new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/`+ infuraKey)
const web3 = new Web3(provider);
const accountOwner = provider.addresses[0]

const artifact = require('../build/contracts/SimpleStorage.json')
const ABI = artifact.abi

let contract = new web3.eth.Contract(ABI, process.env.CONTRACT_ADDRESS);

async function getNum(){
  let num = await contract.methods.num().call()
  console.log(num)
  return process.exit()
}


async function  getBalance (account) {
  let balance= await web3.eth.getBalance(account);
  console.log('The balance of '+ account+' is '+balance )
}

getBalance(accountOwner);
getNum()
