
const getWeb3 = () => {
  console.log("Iam here 1")
  return new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
          window.web3 = new Web3(ethereum);
          console.log("Iam here 2")
          try {
              // Request account access if needed
              await ethereum.enable();
              // Acccounts now exposed
              await window.ethereum.request({ method: "eth_requestAccounts" });
              console.log("Iam here 3")

              resolve(web3);
          } catch (error) {
              // User denied account access...
          }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        console.log("Iam here 3")

          window.web3 = new Web3(web3.currentProvider);
      }
      // Non-dapp browsers...
      else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
  });
};

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    return window.web3;
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    return window.web3;
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

const getTokenContract = async (web3) => {
  const data = await $.getJSON("./contracts/pliabi.json");
  console.log("Data is",data)
  const netId = await web3.eth.net.getId();
  console.log("Netid tokencontract",netId)
  const tokennetwork = new web3.eth.Contract(
    data,
    // "0xff7412ea7c8445c46a8254dfb557ac1e48094391" //-Mainnet
    "0xb3db178db835b4dfcb4149b2161644058393267d"
  );  
  console.log("tokennetwork",tokennetwork)
  return tokennetwork;
};

const getInternalContract = async (web3) => {
  const data = await $.getJSON("./contracts/InternalContract.json");
  const internal = new web3.eth.Contract(
    data,
    // "0x06892B4c9f612312E0981f0CA95CF06890708F74"   //- Mainnet
    "0xe7cFb01170d4f3cAd109273B395F495aBe7eC433" // Apothem
  );
  console.log("internal",internal)
  return internal;
};
