import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ConnectWallet from './ConnectWallet';
import DisconnectWallet from './DisconnectWallet';

const Content = () => {
  const [isWalletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      setWalletConnected(accounts.length > 0);
    } else {
      setWalletConnected(false);
    }
  };

  return (
    <div>
      {isWalletConnected ? <ConnectWallet /> : <DisconnectWallet />}
    </div>
  );
};

export default Content;