import React from 'react'
import { Web3Auth } from "@web3auth/modal";


const AuthWrapper = () => {
    useEffect(() => {
        const init = async () => {
          try {
            const web3auth = new Web3Auth({
              clientId,
              chainConfig: {
                chainNamespace: CHAIN_NAMESPACES.EIP155,
                chainId: "0x13881",
                rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
              }
            });
            setWeb3auth(web3auth);
            await web3auth.initModal();
    
            if (web3auth.connected) {
              setLoggedIn(true);
            }
    
            setProvider(web3auth.provider);
          } catch (error) {
            console.error(error);
          }
        };
    
        init();
      }, []);
  return (
    <div>AuthWrapper</div>
  )
}

export default AuthWrapper