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


const getSampleContract = async (web3) => {
  const data = await $.getJSON("./contracts/samples.json");
  console.log("Data is",data)
  const samplecontract = new web3.eth.Contract(
    data,
    // "0xff7412ea7c8445c46a8254dfb557ac1e48094391" //-Mainnet
    "0x8DBebc7685F669f1DBBC0837C04775A308b8223D"   // -Apothem
  );  
  console.log("samplecontract",samplecontract)
  return samplecontract;
};

// const getInternalContract = async (web3) => {
//   const data = await $.getJSON("./contracts/InternalContract.json");
//   const internal = new web3.eth.Contract(
//     data,
//     // "0x06892B4c9f612312E0981f0CA95CF06890708F74"   //- Mainnet
//     "0xe7cFb01170d4f3cAd109273B395F495aBe7eC433" // Apothem
//   );
//   console.log("internal",internal)
//   return internal;
// };
