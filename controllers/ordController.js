const { execSync, exec, execFileSync } =require("child_process");
const fs = require("fs");
const {download} = require('../helpers/downloadImage');
const  dotenv = require("dotenv");
const path = require("path");
dotenv.config();

// fileName and fee rate gotten from db
const inscribe = async (feeRate, receiverAddress, imagePath) => {
  try {
    const command = `ord --cookie-file "/home/ubuntu/.bitcoin/.cookie" --wallet ordinalHashes wallet inscribe --fee-rate --destination ${receiverAddress} ${feeRate} ${imagePath}`;
    const child = JSON.parse(execSync(command).toString());
    console.log(child);
    return child.inscription;
  } catch (e) {
    console.log(e.message);
  }
};

const sendInscription = async (address, inscriptionId, collectionName) => {
  try {
    const command = `ord --cookie-file "/home/ubuntu/.bitcoin/.cookie" --wallet ${collectionName} wallet send --fee-rate ${10} ${address} ${inscriptionId}`;
    const child = execSync(command).toString();
    console.log(child);
    return child;
  } catch (e) {
    console.log(e.message);
  }
};

const inscriptionPaymentAddress = async () => {
  try {
    const command = `ord --cookie-file "/home/ubuntu/.bitcoin/.cookie" --wallet ordinalHashes wallet receive`;
    let payAddress;
    const child = execSync(command).toString();
    payAddress = JSON.parse(child);
    console.log(payAddress.address);
    return payAddress.address;
  } catch (e) {
    console.log(e.message);
  }
};

const collectionWallet = async (collectionName) => {
  try {
    const command = `ord --cookie-file "/home/ubuntu/.bitcoin/.cookie" --wallet ${collectionName} wallet create`;
    const child = JSON.parse(execSync(command).toString());
    console.log(child.mnemonic);
    return child.mnemonic;
  } catch (e) {
    console.log(e.message);
  }
};

const mint = async (collectionName, feeRate, filePath, recieverAddress) => {
  try {
    const command = `ord --cookie-file "/home/ubuntu/.bitcoin/.cookie" --wallet ${collectionName} wallet inscribe --fee-rate ${feeRate} --destination ${recieverAddress} ${filePath} `;
    const child = JSON.parse(exec(command).toString());
    console.log(child);
    return child.inscription;
  } catch (e) {
    console.log(e.message);
  }
};

const getCollectionUtxo = async (collectionName) => {
  try {
    const command = `ord --cookie-file "/home/ubuntu/.bitcoin/.cookie" --wallet ${collectionName} wallet receive`;
    let payAddress;
    const child = execSync(command).toString();
    payAddress = JSON.parse(child);
    return payAddress.address;
  } catch (e) {
    console.log(e.message);
  }
};

const getMultipleReceiveAddr = async (collectionName, addrCount) => {
  try {
    let addresses = [];
    for (let i = 0; i <= addrCount; i++) {
      const address = await getCollectionUtxo(collectionName);
      addresses.push(address);
    }
    console.log(addresses);
    return addresses;
  } catch (e) {
    console.log(e.message);
  }
};

const broadcastTransaction = async (txHex) => {
  try {
    const command = `bitcoin-cli -rpccookiefile="/home/ubuntu/.bitcoin/.cookie" sendrawtransaction ${txHex}`;
    const child = JSON.parse(execSync(command.toString()));
    console.log(child);
  } catch (e) {
    console.log(e.message);
  }
};

const getLatestBlock = async () => {
  try {
    const command = `bitcoin-cli -rpccookiefile="/home/ubuntu/.bitcoin/.cookie" getblockcount`;
    const child = JSON.parse(execSync(command.toString()));
    console.log(child);
    return child;
  } catch (e) {
    console.log(e.message);
  }
};

const downloadImg = async (cid, fileName) => {
    const img = await download(cid, fileName);
    
    fs.unlinkSync(`/home/ord_api/build/img/${fileName}`)
}

module.exports = { inscribe, sendInscription, inscriptionPaymentAddress };



//inscriptionPaymentAddress();
// getMultipleReceiveAddr("test1Collection", 20)
//   .then((res = {}))
//   .catch((r) => {
//     process.exit(1);
//   });

// broadcastTransaction("")
//   .then((res = {}))
//   .catch((r) => {
//     process.exit(1);
//   });

downloadImg("bafybeigzcckogpp4oeex77wn2465e5gqppbdwfyv3wqz32ia6gd3c2ylc4", "1680187724511.svg")
  .then((res = {}))
  .catch((r) => {
    process.exit(1);
  });


