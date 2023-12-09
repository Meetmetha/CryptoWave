import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";

// import { Web3Auth } from "@web3auth/web3auth";
import { web3AuthContext } from "./AuthContext";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import RPC from "./web3RPC";
import "./App.css";
import { useContext } from "react";
import LoggedInLayout from "./pages/LoggedInLayout";

const clientId =
  "BMrrbJU8DbyV7FKnGrvovVqozQOOvFpP3Dkab63myF4wL7gZdTynfQaDNGi9b0lIgMlAgnfjUu6kAGp7CBbtvjk"; // get from https://dashboard.web3auth.io

function App() {
  const object = useContext(web3AuthContext);
  // const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [chainId, setChainId] = useState("");
  const [userData, setUserData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(object);

  let styles = {
    button: {
      width: "100%",
      maxWidth: 200,
      cursor: "pointer",
      background: "#8347E5",
      border: "1px solid #8347E5",
      boxSizing: "border-box",
      borderRadius: "15px",
      fontSize: 16,
      color: "#000000",
      fontWeight: 700,
      padding: "12px 30px 12px 30px",
      marginTop: 15,
      display: "flex",
      justifyContent: "center",
    },
  };
  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x5",
            rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
          }
        });
        object.setWeb3Auth(web3auth);
        await web3auth.initModal();

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!object.web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await object.web3Auth.connect();
    console.log(web3authProvider);
    // console.log(JSON.stringify(object.web3Auth));
    object.setWeb3Auth(web3authProvider);

    // setProvider(web3authProvider);
    if (object.web3Auth.connected) {
      setLoggedIn(true);
    }
  };
  const logout = async () => {
    if (!object.web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    console.log(object.web3Auth.provider);
    await object.web3Auth.logout();
    localStorage.removeItem('web3auth')
    object.setWeb3Auth(null)
    setLoggedIn(false);
    setBalance("");
    setAddress("");
    setUserData({});
    setChainId("");
  };

  const getUserInfo = async () => {
    if (!object.web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await object.web3Auth.getUserInfo();
    setUserData(user);
    console.log(user);
  };

  const getChainId = async () => {
    if (!object.web3Auth.provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(object.web3Auth.provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
    setChainId(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    setAddress(address);
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    setBalance(balance);
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!object.web3Auth.provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(object.web3Auth.provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };
  const sendContractTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendContractTransaction();
    console.log(receipt);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };

  const loggedInView = (
    <>
      <button onClick={getUserInfo} className="card" style={styles.button}>
        Get User Info
      </button>
      <button onClick={getChainId} className="card" style={styles.button}>
        Get Chain ID
      </button>
      <button onClick={getAccounts} className="card" style={styles.button}>
        Get Accounts
      </button>
      <button onClick={getBalance} className="card" style={styles.button}>
        Get Balance
      </button>
      <button onClick={sendTransaction} className="card" style={styles.button}>
        Send Transaction
      </button>
      <button
        onClick={sendContractTransaction}
        className="card"
        style={styles.button}
      >
        Send Approve Transaction
      </button>

      <button onClick={getPrivateKey} className="card" style={styles.button}>
        Get Private Key
      </button>
      <button onClick={logout} className="card" style={styles.button}>
        Logout
      </button>

      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <button onClick={login} className="card" style={styles.button}>
      Log
    </button>
  );

  console.log(loggedIn);

  return (
    <LoggedInLayout>

    <div
      className="container"
      style={{
        textAlign: "center",
        color: "white",
        paddingLeft: "5%",
        paddingRight: "5%",
      }}
    >
      <div className="row">
        <div className="col-md-3">
          {" "}
          <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
        </div>
        <div className="col-md-9">
          <div style={{ marginTop: 20, textAlign: "left" }}>
            address: {address}
            <br />
            <br />
            chainId: {chainId}
            <br />
            <br />
            balance: {balance}
            <br />
            <br />
            user:{" "}
            <span style={{ fontSize: 12 }}>{JSON.stringify(userData)}</span>
          </div>
        </div>
      </div>
    </div>
    </LoggedInLayout>

  );
}

export default App;
