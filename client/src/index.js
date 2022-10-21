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

const approveInternalToTransfer = (internal, tokencontract, accounts) => {
  let _tokens;
  $("#approvepli").on("change", (e) => {
    _tokens = e.target.value;
    console.log("approveval", _tokens)
  });
  $("#approveInternalPLI").on("click", async (e) => {
    console.log("Iam at approveInternalToTransfer", internal._address)
    e.preventDefault();
    const tokens = await convertTokens(_tokens);
    console.log("tokkens are ", tokens)
    await tokencontract.methods.approve(internal._address, tokens)
      .send({ from: accounts[0], gas: 2100000 })
      .on("transactionHash", async function (transactionHash) {
        const [txhash, status] = await getTxnStatus(transactionHash);
        console.log("txhashshshs", txhash, status)
      });
    /////NEWLY ADDED ////
  });
};

const depositPLIInternalContract = (internal, accounts) => {
  let _amount;
  $("#depositpli").on("change", (e) => {
    _amount = e.target.value;
    console.log("PLIAmountToDeposit", _amount)
  });
  $("#depositInternalPLI").on("click", async (e) => {
    console.log("Iam at depositPLIInternalContract Into internal", internal._address, accounts[0])
    e.preventDefault();
    const tokens = await convertTokens(_amount);
    console.log("tokens are", tokens)
    await internal.methods.depositPLI(tokens)
      .send({ from: accounts[0], gas: 21000000 })
      .on("transactionHash", async function (transactionHash) {
        const [txhash, status] = await getTxnStatus(transactionHash);
        console.log("txhashshshs", txhash, status)
      });
  });
}

const getContractBalanceforuser = (internal, accounts) => {
  $("#getContractBalforUser").on("click", async (e) => {
    console.log("Iam at getContractBalanceforuser Into internal", internal._address, accounts[0])
    e.preventDefault();
    const rate = await internal.methods.plidbs(accounts[0]).call().then(res => {
      console.log("res",res.totalcredits);
      var pli = web3.utils.fromWei(res.totalcredits.toString(), 'ether');
      console.log("Total PLI in Contract Deposited by User",pli);

    });
  });
}

const getContractBalanceTotalPLI = (internal, tokencontract,accounts) => {
  $("#getContractBalforContract").on("click", async (e) => {
    console.log("Iam at getContractBalanceTotalPLI Into internal", internal._address, accounts[0])
    e.preventDefault();
    const rate = await tokencontract.methods.balanceOf(internal._address).call().then(res => {
      const tokens = web3.utils.fromWei(res.toString(), 'ether');
      console.log("taotal Balance",tokens);
    });
  });
}

const getLatestAnswer = (internal,accounts) => {
  $("#getlatestvalue").on("click", async (e) => {
    console.log("Iam at getLatestAnswer Into internal", internal._address, accounts[0])
    e.preventDefault();
    const rate = await internal.methods.showPrice().call().then(res => {
      console.log("Latest value is",res);
    });
  });
}




async function nodeOperatorApp() {
  const web3 = await loadWeb3();
  console.log("Web3", web3);
  const accounts = await web3.eth.getAccounts();
  console.log("accounts", accounts);

  const tokencontract = await getTokenContract(web3); //token Contract
  console.log("tokencontract", tokencontract);
  const internalCont = await getInternalContract(web3);
  console.log("internalCont", internalCont);

  // getTokenBalance(tokencontract);
  getContractBalanceforuser(internalCont, accounts);
  getContractBalanceTotalPLI(internalCont,tokencontract, accounts);
  approveInternalToTransfer(internalCont, tokencontract, accounts);
  depositPLIInternalContract(internalCont, accounts);
  getLatestAnswer(internalCont, accounts);
}

nodeOperatorApp();