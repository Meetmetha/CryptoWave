import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";

// import { Web3Auth } from "@web3auth/web3auth";
import { web3AuthContext } from "./AuthContext";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import RPC from "./web3RPC";
import icons from './icons.svg'
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
    <div className="flex flex-col items-center">
      {/* <button onClick={getUserInfo} className="card" style={styles.button}>
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
      </button> */}
      <div className="flex flex-col items-center gap-2 p-2 text-black">
        <div className="text-2xl">
          <svg width="221" height="25" viewBox="0 0 221 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M220.278 25H202.431V0H220.278V3.57666H205.996V9.82666H218.496V13.4033H205.996V21.4355H220.278V25Z" fill="black" />
            <path d="M192.605 25H187.246V21.4355H185.451V16.0767H183.669V10.7178H181.887V5.35889H180.105V0H183.669V5.35889H185.451V10.7178H187.246V16.0767H189.028V19.6533H190.81V16.0767H192.605V10.7178H194.387V5.35889H196.169V0H199.746V5.35889H197.951V10.7178H196.169V16.0767H194.387V21.4355H192.605V25Z" fill="black" />
            <path d="M164.052 25H160.488V19.6533H162.27V14.2944H164.052V8.93555H165.834V3.57666H167.629V0H172.988V3.57666H174.77V8.93555H176.552V14.2944H178.334V19.6533H180.129V25H176.552V19.6533H164.052V25ZM165.834 16.0767H174.77V14.2944H172.988V8.93555H171.193V5.35889H169.411V8.93555H167.629V14.2944H165.834V16.0767Z" fill="black" />
            <path d="M140.859 25H135.5V21.4355H133.718V14.2944H131.936V7.15332H130.153V0H133.718V7.15332H135.5V14.2944H137.294V19.6533H139.077V14.2944H140.859V7.15332H142.653V0H148V7.15332H149.794V14.2944H151.577V19.6533H153.359V14.2944H155.153V7.15332H156.936V0H160.5V7.15332H158.718V14.2944H156.936V21.4355H155.153V25H149.794V21.4355H148V14.2944H146.218V7.15332H144.436V14.2944H142.653V21.4355H140.859V25Z" fill="black" />
            <path d="M122.109 25H111.391V23.2178H109.609V21.4355H107.827V19.6533H106.045V5.35889H107.827V3.57666H109.609V1.79443H111.391V0H122.109V1.79443H123.891V3.57666H125.686V5.35889H127.468V19.6533H125.686V21.4355H123.891V23.2178H122.109V25ZM113.186 21.4355H120.327V19.6533H122.109V17.8589H123.891V7.15332H122.109V5.35889H120.327V3.57666H113.186V5.35889H111.391V7.15332H109.609V17.8589H111.391V19.6533H113.186V21.4355Z" fill="black" />
            <path d="M97.1089 25H93.5444V3.57666H86.4033V0H104.25V3.57666H97.1089V25Z" fill="black" />
            <path d="M71.2299 25H67.6654V0H81.9476V1.79443H83.7299V3.57666H85.5121V12.5H83.7299V14.2944H81.9476V16.0767H71.2299V25ZM71.2299 12.5H80.1654V10.7178H81.9476V5.35889H80.1654V3.57666H71.2299V12.5Z" fill="black" />
            <path d="M57.8512 25H54.2867V14.2944H52.4923V10.7178H50.7101V7.15332H48.9279V3.57666H47.1456V0H50.7101V3.57666H52.4923V7.15332H54.2867V10.7178H57.8512V7.15332H59.6456V3.57666H61.4279V0H64.9923V3.57666H63.2101V7.15332H61.4279V10.7178H59.6456V14.2944H57.8512V25Z" fill="black" />
            <path d="M29.2867 25H25.7223V0H41.7867V1.79443H43.569V3.57666H45.3634V11.6089H43.569V13.4033H41.7867V15.1855H43.569V16.9678H45.3634V25H41.7867V18.75H40.0045V16.9678H38.2223V15.1855H29.2867V25ZM29.2867 11.6089H40.0045V9.82666H41.7867V5.35889H40.0045V3.57666H29.2867V11.6089Z" fill="black" />
            <path d="M16.7866 25H6.06885V23.2178H4.28662V21.4355H2.50439V19.6533H0.722168V5.35889H2.50439V3.57666H4.28662V1.79443H6.06885V0H16.7866V1.79443H18.5688V3.57666H20.3633V5.35889H22.1455V8.93555H18.5688V7.15332H16.7866V5.35889H15.0044V3.57666H7.86328V5.35889H6.06885V7.15332H4.28662V17.8589H6.06885V19.6533H7.86328V21.4355H15.0044V19.6533H16.7866V17.8589H18.5688V16.0767H22.1455V19.6533H20.3633V21.4355H18.5688V23.2178H16.7866V25Z" fill="black" />
          </svg>
        </div>
        <button onClick={logout} className=" bg-black text-white p-2 rounded-md" >
        Logout
      </button>
        <div className="text-lg text-left font-bold mt-6">We are supporting the following chains</div>
        <div className="text-sm text-left pb-2">The support for multi chains has enabled to reach the vast audience and help more people</div>
        <div className="flex flex-row flex-wrap py-2 items-center gap-4">
          <img src="/1.png" alt="" />
          <img src="/2.png" alt="" />
          <img src="/3.png" alt="" />
          <img src="/4.png" alt="" />
          <img src="/5.png" alt="" />
        </div>
        
        <div className="py-2 text-2xl text-center ">
          Built on Base
        </div>

      </div>



      
    </div>
  );

  const unloggedInView = (
    <button onClick={login} className=" bg-black text-white p-2 rounded-md" >
      Login
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
        </div>
      </div>
    </LoggedInLayout>

  );
}

export default App;
