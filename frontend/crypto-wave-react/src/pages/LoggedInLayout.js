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
      <div className=' h-[100vh] overflow-y-hidden bg-slate-200 '>
        <div className=" max-w-sm mx-auto h-full bg-white p-2 overflow-y-scroll">
          <main>{children}</main>
          <footer className='fixed bottom-0 w-[23rem] bg-white z-10'>
            <nav className='w-full p-4 border-t'>
              <ul className='flex justify-between items-center w-full'>
                <li><a href="/">Home</a></li>
                <li><a href="/bond">Bond</a></li>
                <li><a href="/nfc">NFC</a></li>
              </ul>
            </nav>
          </footer>
        </div><ToastContainer />
      </div>
    </web3AuthContext.Provider>
  );
};

export default LoggedInLayout;
