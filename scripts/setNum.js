const Web3= require("web3");
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()

const infuraKey = process.env.INFURA_API_KEY;
const mnemonic = process.env.MNEMONIC

const provider = new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/`+ infuraKey)
const web3 = new Web3(provider);
const accountOwner = provider.addresses[0]

const artifact = require('../build/contracts/SimpleStorage.json');
const ABI = artifact.abi
const contractAddress = process.env.CONTRACT_ADDRESS;

let contract = new web3.eth.Contract(ABI, contractAddress);


async function getLatestNonce () {
  const nonce = await web3.eth.getTransactionCount(accountOwner, "latest") //get latest nonce
  return nonce
}

async function setNum(){

  let nonce = await getLatestNonce();
  
  //the transaction
  const tx = {
    from: accountOwner,
    to: contractAddress,
    nonce: nonce,
    gas: 210000,
    data: contract.methods.setNum(888).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx,  process.env.PRIVATE_KEY)

  signPromise
    .then(signedTx => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
         function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              
            )
            return process.exit()
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
            return process.exit()
          }
        }
      )
    })
    .catch(err => {
      console.log(" Promise failed:", err)
    })


    console.log('aki')
  
}

setNum()
