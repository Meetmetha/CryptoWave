import React, { useState, useEffect } from 'react';
import { web3AuthContext } from "../AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import RPC from "./web3RPC";

const LoggedInLayout = ({ children }) => {
  const [web3Auth, setWeb3Auth] = useState(null)

  // useEffect(() => {
  //     const init = async () => {
  //       try {
  //         const web3auth = new Web3Auth({
  //           clientId,
  //           chainConfig: {
  //             chainNamespace: CHAIN_NAMESPACES.EIP155,
  //             chainId: "0x13881",
  //             rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
  //           }
  //         });
  //         setWeb3Auth(web3auth);
  //         await web3auth.initModal();
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     init();
  //   }, []);

  return (
    <web3AuthContext.Provider value={{ web3Auth, setWeb3Auth }}>
      <div className=' h-[100vh] bg-slate-200 '>
        <div className=" max-w-sm mx-auto h-full bg-white p-2 overflow-y-scroll">
          <main>{children}</main>
        </div><ToastContainer />
      </div>
    </web3AuthContext.Provider>
  );
};

export default LoggedInLayout;
