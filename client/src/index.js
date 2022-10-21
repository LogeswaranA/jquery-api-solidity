const convertTokens = async (n) => {
  b = new web3.utils.BN(web3.utils.toWei(n.toString(), 'ether'));
  return b;
}
///// Copy node_modules /////
/////. Newly added /////

const expectedBlockTime = 1000;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const getTxnStatus = async (txHash) => {
  let transactionReceipt = null
  while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
    transactionReceipt = await web3.eth.getTransactionReceipt(txHash);
    await sleep(expectedBlockTime)
  }
  console.log("Got the transaction receipt: ", transactionReceipt, transactionReceipt.status)
  if (transactionReceipt.status) {
    return [txHash, true];
  } else {
    return [txHash, false];
  }
}

const sampleStoreData = (sample, accounts) => {
  let _age;
  let _name;
  let _qual;
  $("#age").on("change", (e) => {
    _age = e.target.value;
    console.log("_age", _age)
  });
  $("#name").on("change", (e) => {
    _name = e.target.value;
    console.log("_name", _name)
  });
  $("#qual").on("change", (e) => {
    _qual = e.target.value;
    console.log("_qual", _qual)
  });
  $("#storedata").on("click", async (e) => {
    e.preventDefault();
    await sample.methods.storeData(_age,_name, _qual)
      .send({ from: accounts[0], gas: 2100000 })
      .on("transactionHash", async function (transactionHash) {
        const [txhash, status] = await getTxnStatus(transactionHash);
        console.log("txhashshshs", txhash, status)
      });
  });
};

const getListofUsers = (sample, accounts) => {
  $("#listofusers").on("click", async (e) => {
    e.preventDefault();
    const rate = await sample.methods.listOfUsers(accounts[0],0).call().then(res => {
      console.log("res",res);
    });
  });
}

async function nodeOperatorApp() {
  const web3 = await loadWeb3();
  console.log("Web3", web3);
  const accounts = await web3.eth.getAccounts();
  console.log("accounts", accounts);
  const sample = await getSampleContract(web3); //token Contract
  console.log("sample", sample);
  sampleStoreData(sample,accounts);
  getListofUsers(sample,accounts);
}

nodeOperatorApp();