import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import '../App.css';
import { FaListUl,FaExclamationCircle, FaTimesCircle,FaCheckCircle, FaInfoCircle, FaChevronDown, FaAngleDown } from "react-icons/fa";
import Web3 from 'web3';
import { createClient } from '@supabase/supabase-js';
import { useCookies } from 'react-cookie';
import QRCode from 'qrcode.react';

const Header = () => {
  const [accountAddress, setAccountAddress] = useState('');
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [isWalletOpen, setWalletOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  // State to manage the visibility of the modal
  const [showModal, setShowModal] = useState(false);
  const [tokenAddress, setTokenAddress] = useState('');
  const [cookies, setCookie] = useCookies(['walletAddress']);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [coinData, setCoinData] = useState([]);
  
  const [walletAddress, setWalletAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [memberId, setMemberId] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');
  const [coinChainId, setCoinChainId] = useState('');

  const coinChainIds = {
    BTC: 0,
    ETH: 1,
    BNB: 56,
    USDT: 1024,
    BUSD: 56,
    BTSD: 0,
    TRX: 195,
    LTC: 2,
    USDC: 1,
    XRP: 144,
  };
  

  useEffect(() => {
    const checkMemberAddress = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        const connectedAddress = window.ethereum.selectedAddress.toLowerCase();

        // Check if the connected wallet address is present in the member table
        const { data: members, error } = await supabase
          .from('members')
          .select('id')
          .eq('wallet_address', connectedAddress);

        if (error) {
          console.error(error);
          return;
        }

        // If the connected wallet address is found, retrieve the member ID
        if (members && members.length > 0) {
          setMemberId(members[0].id);
        }
      }
    };

    checkMemberAddress();
  }, []);

 
  const fetchChainId = async (symbol) => {
    // Check if the symbol exists in coinChainIds
    if (coinChainIds.hasOwnProperty(symbol)) {
      // Retrieve the chain ID from coinChainIds object
      return coinChainIds[symbol];
    } else {
      // Handle the case when the symbol is not found in coinChainIds
      console.error(`Chain ID not found for symbol: ${symbol}`);
      return null; // Or any appropriate value indicating the absence of chain ID
    }
  };

  const handleCoinSelection = async (selectedCoinSymbol) => {
    setCoinSymbol(selectedCoinSymbol);

    // Fetch the chain ID for the selected coin
    const chainId = await fetchChainId(selectedCoinSymbol);
    setCoinChainId(chainId);

    // Generate a new wallet address if the member ID is present and a coin is selected
    if (memberId && selectedCoinSymbol) {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
  
          // Check if the user already has a stored Ethereum address
          const { data: existingAddressData, error: existingAddressError } = await supabase
            .from('my_wallets')
            .select('new_address')
            .eq('mem_id', memberId)
            .eq('symbol', selectedCoinSymbol);
  
          if (existingAddressError) {
            console.error(existingAddressError);
            return;
          }
  
          if (existingAddressData && existingAddressData.length > 0) {
            // If the user has an existing address, display it to the user
            setWalletAddress(existingAddressData[0].new_address);
            // You may also set the private key if needed
  
            return;
          }
  
          // If the user does not have an existing address, generate a new one
          const account = web3.eth.accounts.create();
          setWalletAddress(account.address);
          setPrivateKey(account.privateKey);
  
          // Store the data in the 'my_wallet' table
          await supabase.from('my_wallets').insert([
            {
              mem_id: memberId,
              symbol: selectedCoinSymbol,
              chain_id: chainId,
              new_address: account.address,
              private_key: account.privateKey,
            },
          ]);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('Web3 not found!');
      }
    }
  };

  
  
  useEffect(() => {
    if (isDropdownOpen) {
      fetchCoinData();
    }
  }, [isDropdownOpen]);
  
  
  const coinImages = {
    BTC: '/img/btc.png',
    ETH: '/img/eth.png',
    BNB: '/img/bnb.png',
    USDT: '/img/usdt.png',
    BUSD: '/img/busd.png',
    BTSD: '/img/btsd.png',
    TRON: '/img/tron.png',
    LTC: '/img/ltc.png',
    USDC: '/img/usdc.png',
    XRP: '/img/xrp.png',
  };
  
  
  const fetchCoinData = async () => {
    try {
      const { data, error } = await supabase.from('coins').select('*');
      if (error) {
        throw error;
      }
      setCoinData(data);
    } catch (error) {
      console.error('Error fetching coin data:', error.message);
    }
  };
  
  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  
  
  const cryptoCoins = [
    {  symbol: 'BTC', },
    {  symbol: 'ETH', },
    {  symbol: 'BNB',},
    {  symbol: 'USDT', },
    {  symbol: 'BUSD', },
    {  symbol: 'BTSD', },
    {  symbol: 'TRX', },
    {  symbol: 'LTC', },
    {  symbol: 'USDC', },
    {  symbol: 'XRP', },
  ];
  
  // Create Supabase client instance
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
  const supabaseURL = 'https://pvdwlvsbwghrvngjxvmw.supabase.co';
  const supabase = createClient(supabaseURL, supabaseKey);
  
  

  
  
  // const fetchBalance = async () => {
  //   try {
  //     if (typeof window.ethereum !== 'undefined') {
  //       await window.ethereum.request({ method: 'eth_requestAccounts' });
  //       const provider = new Web3(window.ethereum);
  //       const accounts = await provider.eth.getAccounts();
  //       if (accounts.length > 0) {
  //         const address = accounts[0];
  //         const balance = await provider.eth.getBalance(address);
  //         setBalance(balance);
  //       } else {
  //         console.error('No accounts found');
  //       }
  //     } else {
  //       console.error('Ethereum provider not available');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching balance:', error);
  //   }
  // };
  
  // useEffect(() => {
  //   fetchBalance();
  // }, []);
  
  
  const connectWallet = () => {
    // Logic to connect the wallet
    
    // Once connected, set isWalletOpen to true to open the wallet
    setWalletOpen(true);
  };
  
  const handleDisconnectWalletClick = () => {
    if (isWalletOpen) {
      disconnectWallet();
    }
  }
  
  const connectToWallet = async () => {
    if (window.ethereum) {
      try {
        // Request access to the user's MetaMask accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];
        
        // Check if the wallet address exists in Supabase
        const { data, error } = await supabase
        .from('members')
        .select('*')
        .or('wallet_address.eq.' + walletAddress, { wallet_address: 'NF' })
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
        
        if (error) {
          if (error.code === 'PGRST116') {
            console.log('Wallet not found'); // Handle the specific error code
            const { data: newWallet, error: createError } = await supabase
            .from('members')
            .insert([{ wallet_address: walletAddress, id_block: 'no' }]) // Set id_block to "no"
            .single();
            setWalletConnected(true);
            setAccountAddress(walletAddress);
            alert('You are logged in');
            
            // Set the wallet address as a cookie
            storeWalletAddress(walletAddress);
            
          } else {
            setWalletConnected(true);
            setAccountAddress(walletAddress);
            console.error('Error checking wallet:', error);
          }
        } else if (data && data.id_block === 'yes') {
          alert('Account suspended');
        } else {
          setWalletConnected(true);
          setAccountAddress(walletAddress);
          alert('You are logged in');
          
          // Set the wallet address as a cookie
          setCookie('walletAddress', walletAddress, { path: '/' });
        }
        
        const element = document.querySelector('.btn-close');
        if (element) {
          element.click();
        }
        
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.error('Metamask not detected');
    }
    
    const storeWalletAddress = (walletAddress) => {
      // Set the wallet address as a cookie
      setCookie('walletAddress', walletAddress, { path: '/' });
    };
  };
  
  
  
  // Check if wallet was previously connected
  useEffect(() => {
    const storedWalletConnected = localStorage.getItem('isWalletConnected');
    const initialWalletConnected = storedWalletConnected ? JSON.parse(storedWalletConnected) : false;
    setWalletConnected(initialWalletConnected);
  }, []);
  
  const updateWalletConnected = (connected) => {
    localStorage.setItem('isWalletConnected', JSON.stringify(connected));
    // Update the state or do other necessary actions
  };
  
  
  const handleDisconnect = () => {
    setAccountAddress('');
  };
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }
  
  const closeSidebar = () => {
    setShowSidebar(false);
  };
  
  
  // Function to toggle the modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  
  return (
    <>
    <header id="header" className="header fixed-top d-flex align-items-center">
    <div className="d-flex align-items-center justify-content-between">
    <a href="/" className="logo d-flex align-items-center">
    <img src="../img/PVP-Casino-Logo.svg" alt="Logo" />
    </a>
    <FaListUl className="toggle-sidebar-btn"/>
    </div>
    {/* End Logo */}
    
    <nav className="header-nav ms-auto d-flex">
    {!isWalletConnected ? (
      <div className="connect-wallet me-3">
      <ul>
      <li className="nav-item dropdown">
      <a
      className="nav-link nav-profile d-flex align-items-center pe-0"
      href="#"
      data-bs-toggle="dropdown">
      <img src="../img/wallet-icon.svg" alt="Profile" className="rounded-circle" />
      <span className="dropdown-toggle ps-2">Connect Wallet</span>
      </a>
      
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
      <li className="dropdown-header">Select a Network</li>
      <li>
      <hr className="dropdown-divider" />
      </li>
      <li>
      <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
      <img src="../img/binance-wallet.svg" alt="Binance" />
      <span>BNB Smart Chain</span>
      </a>
      </li>
      <li>
      <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
      <img src="../img/ethereum.svg" alt="Binance" />
      <span>Ethereum</span>
      </a>
      </li>
      </ul>
      </li>
      </ul>
      </div>
      
      ) : (
        
        /* After wallet connect*/ 
        
        
        <div className="after-login">
        <ul className="d-flex align-items-center m-0">
        <li className="nav-item dropdown">
        <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <img src="../img/chat-icon.svg" alt="" className="" />
        <span className="badge bg-warning badge-number">3</span>
        </a>
        
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
        <li className="dropdown-header">
        You have 3 new messages
        <a href="#">
        <span className="badge rounded-pill bg-primary p-2 ms-2">View all</span>
        </a>
        </li>
        <li>
        <hr className="dropdown-divider" />
        </li>
        
        <li className="message-item">
        <a href="#">
        <img src="../img/messages-1.jpg" alt="" className="rounded-circle" />
        <div>
        <h4>Maria Hudson</h4>
        <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
        <p>4 hrs. ago</p>
        </div>
        </a>
        </li>
        <li>
        <hr className="dropdown-divider" />
        </li>
        
        <li className="message-item">
        <a href="#">
        <img src="../img/messages-2.jpg" alt="" className="rounded-circle" />
        <div>
        <h4>Anna Nelson</h4>
        <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
        <p>6 hrs. ago</p>
        </div>
        </a>
        </li>
        <li>
        <hr className="dropdown-divider" />
        </li>
        
        <li className="message-item">
        <a href="#">
        <img src="../img/messages-3.jpg" alt="" className="rounded-circle" />
        <div>
        <h4>David Muldon</h4>
        <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
        <p>8 hrs. ago</p>
        </div>
        </a>
        </li>
        <li>
        <hr className="dropdown-divider" />
        </li>
        
        <li className="dropdown-footer">
        <a href="#">Show all messages</a>
        </li>
        </ul>
        </li>
        
        <li className="nav-item dropdown">
        <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <img src="../img/bell-icon.svg" alt="" className="" />
        <span className="badge bg-danger badge-number">4</span>
        </a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
        <li className="dropdown-header">
        You have 4 new notifications
        <a href="#">
        <span className="badge rounded-pill bg-dark p-2 ms-2">View all</span>
        </a>
        </li>
        <li>
        <hr className="dropdown-divider" />
        </li>
        
        <li className="notification-item">
        <FaExclamationCircle className=" bi text-warning" />
        
        <div>
        <h4>Lorem Ipsum</h4>
        <p>Quae dolorem earum veritatis oditseno</p>
        <p>30 min. ago</p>
        </div>
        </li>
        
        <li>
        <hr className="dropdown-divider" />
        </li>
        
        <li className="notification-item">
        <FaTimesCircle className=" bi text-danger" />
        <div>
        <h4>Atque rerum nesciunt</h4>
        <p>Quae dolorem earum veritatis oditseno</p>
        <p>1 hr. ago</p>
        </div>
        </li>
        
        <li>
        <hr className="dropdown-divider" />
        </li>
        
        <li className="notification-item">
        <FaCheckCircle className=" bi text-success" />
        <div>
        <h4>Sit rerum fuga</h4>
        <p>Quae dolorem earum veritatis oditseno</p>
        <p>2 hrs. ago</p>
        </div>
        </li>
        
        <li>
        <hr className="dropdown-divider" />
        </li>
        
        <li className="notification-item">
        <FaInfoCircle className=" bi text-primary" />
        <div>
        <h4>Dicta reprehenderit</h4>
        <p>Quae dolorem earum veritatis oditseno</p>
        <p>4 hrs. ago</p>
        </div>
        </li>
        
        <li>
        <hr className="dropdown-divider" />
        </li>
        <li className="dropdown-footer">
        <a href="#">Show all notifications</a>
        </li>
        </ul>
        </li>
        
        <li>
        <div className="wallets-balance">
        <img src="../img/p-simble.svg" alt="" className="simble" />
        <strong>0.0</strong>
        <div className="bw-icon">
        {/* <img src="../img/black-wallet-icon.svg" alt="" /> */}
        <FaChevronDown
        className="ms-auto"
        onClick={toggleDropdown}
        // Apply appropriate styles based on dropdown visibility
        style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
        </div>
        </div>
        
        {isDropdownOpen && (
          
          <div className="dropdown-content">
          {coinData.map((coin) => (
            <div key={coin.id}>
             <img src={coinImages[coin.symbol]} alt={coin.name} />
            {coin.name}
            </div>
            ))}
            </div>
            )}
            
            </li>
            
            
            <li className="nav-item dropdown pe-3">
            <a className="gamerProfile eps nav-link nav-profile d-flex align-items-center pe-0" href="#" onClick={toggleSidebar}>
            <img src="../img/profile-img.jpg" alt="Profile" className="rounded-circle" />
            </a>
            </li>
            </ul>
            {showSidebar && (
              <div className="sidebar-right">
              <a href="#" id="sideClose" onClick={closeSidebar}></a>
              <div>
              <div className="gprofile">
              <img src="../img/profile-img.jpg" alt="Profile" className="rounded-circle" />
              <div>
              <h3>Seevi kargwal</h3>
              <span>{accountAddress}</span>
              </div>
              </div>
              
              <ul className="sidebar-nav" id="sidebar-nav">
              <li className="nav-item">
              <a className="nav-link b collapsed" data-bs-target="#myaccount" data-bs-toggle="collapse" href="#">
              <span>My account</span><FaChevronDown className="ms-auto" />
              </a>
              <ul id="myaccount" className="nav-content collapse" data-bs-parent="#sidebar-nav">
              <li>
              <a href="#">
              <span>Lorem ipsum</span>
              </a>
              </li>
              <li>
              <a href="#">
              <span>Lorem ipsum</span>
              </a>
              </li>
              <li>
              <a href="#">
              <span>Lorem ipsum</span>
              </a>
              </li>
              </ul>
              </li>
              <li className="nav-item">
              <a className="nav-link b collapsed" data-bs-target="#myactivity" data-bs-toggle="collapse" href="#">
              <span>My activity</span><FaChevronDown className="ms-auto" />
              </a>
              <ul id="myactivity" className="nav-content collapse" data-bs-parent="#sidebar-nav">
              <li>
              <a href="#">
              <span>Lorem ipsum</span>
              </a>
              </li>
              <li>
              <a href="#">
              <span>Lorem ipsum</span>
              </a>
              </li>
              <li>
              <a href="#">
              <span>Lorem ipsum</span>
              </a>
              </li>
              </ul>
              </li>
              </ul>
              
              <div className="gchart px-4 py-3">
              <img src="../img/chart-1.png" alt="" className="img-fluid py-4" />
              <a href="#" className="big-yllw-btn2" data-bs-toggle="modal" data-bs-target="#manageFunds"  onClick={toggleModal}>
              Manage funds
              </a>
              </div>
              <hr />
              
              <div className="show-low p-4">
              <div className="sl-check">
              <input type="checkbox" className="css-checkbox" id="checkbox1" defaultChecked={true} />
              <label htmlFor="checkbox1" name="checkbox1_lbl" className="css-label lite-green-check">
              Show low balance:
              </label>
              </div>
              <ul>
              <li>
              <div className="sl-coin">
              <img src="../img/bitcoin.png" alt="" />
              <strong>BTC</strong>
              </div>
              <div className="sl-balance">
              <strong>0</strong>
              <a href="#">
              <img src="../img/add-circle.svg" alt="" />
              </a>
              <a href="#">
              <img src="../img/arrowRightPlain.svg" alt="" />
              </a>
              </div>
              </li>
              <li>
              <div className="sl-coin">
              <img src="../img/ethereum.png" alt="" />
              <strong>ETH</strong>
              </div>
              <div className="sl-balance">
              <strong>0</strong>
              <a href="#">
              <img src="../img/add-circle.svg" alt="" />
              </a>
              <a href="#">
              <img src="../img/arrowRightPlain.svg" alt="" />
              </a>
              </div>
              </li>
              <li>
              <div className="sl-coin">
              <img src="../img/solana.png" alt="" />
              <strong>SOL</strong>
              </div>
              <div className="sl-balance">
              <strong>0</strong>
              <a href="#">
              <img src="../img/add-circle.svg" alt="" />
              </a>
              <a href="#">
              <img src="../img/arrowRightPlain.svg" alt="" />
              </a>
              </div>
              </li>
              <li>
              <div className="sl-coin">
              <img src="../img/ripple.png" alt="" />
              <strong>SRP</strong>
              </div>
              <div className="sl-balance">
              <strong className="ps-2">0</strong>
              <a href="#">
              <img src="../img/add-circle.svg" alt="" />
              </a>
              <a href="#">
              <img src="../img/arrowRightPlain.svg" alt="" />
              </a>
              </div>
              </li>
              </ul>
              </div>
              
              <a href="#" className="disconnect-link"  onClick={handleDisconnectWalletClick}>
              <img src="../img/logout-icon.svg" alt="" />
              <span>Disconnect</span>
              </a>
              </div>
              </div>
              )}
              </div>
              
              
              
              
              )}
              
              {!isWalletConnected && (
                <a
                href="#"
                className="big-yllw-btn" 
                id='thebtn'
                data-bs-toggle="modal"
                data-bs-target="#connectWallet"
                onClick={connectWallet}
                >
                Connect Wallet
                </a>
                )}
                
                
                <div className="modal cw-popup fade" id="connectWallet" tabIndex="-1" aria-labelledby="connectWalletLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-body p-0">
                <div className="cw-sec">
                <div className="cw-content p-16">
                <h3 className="mb-2">Connect with Wallet</h3>
                <p>
                Start by connecting with one of the wallets below.
                </p>
                <ul>
                <li>
                <a href="#" onClick={connectToWallet}>
                <img src="../img/binance-wallet.png" alt="" />
                <span>Binance Wallet</span>
                </a>
                </li>
                <li>
                <a href="#" onClick={connectToWallet}>
                <img src="../img/trust-wallet.png" alt="" />
                <span>Trust Wallet</span>
                </a>
                </li>
                <li>
                <a href="#" onClick={connectToWallet}>
                <img src="../img/metaMask-wallet.png" alt="" />
                <span>Metamask</span>
                </a>
                </li>
                <li>
                <a href="#" onClick={connectToWallet}>
                <img src="../img/coinbase-wallet.png" alt="" />
                <span>Coinbase Wallet</span>
                </a>
                </li>
                <li>
                <a href="#" onClick={connectToWallet}>
                <img src="../img/wallet-connect.png" alt="" />
                <span>WalletConnect</span>
                </a>
                </li>
                </ul>
                </div>
                <div className="cw-code p-16">
                <h3 className="mb-4">Scan with Trust Wallet</h3>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                <div className="cwqr-code p-16 brdr-radius-16 mb-3">
                <img src="../img/qr-code.png" alt="" className="img-fluid" />
                </div>
                <div className="cw-get">
                <p className="mb-0">Get Trust wallet app</p>
                <a href="#" className="small-yllow-brdr-btn2">Get</a>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                
                {/* Mutual Fund */}
                
                <div className="modal cw-popup mfunds fade" id="manageFunds" tabIndex="-1" aria-labelledby="manageFundsLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                <h3 className="mb-2">Manage Funds</h3>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body p-0">
                <div className="mf-tabs">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                <button className="nav-link active" id="deposit-tab" data-bs-toggle="tab" data-bs-target="#deposit" type="button" role="tab" aria-controls="deposit" aria-selected="true">Deposit</button>
                </li>
                <li className="nav-item" role="presentation">
                <button className="nav-link" id="withdraw-tab" data-bs-toggle="tab" data-bs-target="#withdraw" type="button" role="tab" aria-controls="withdraw" aria-selected="false">Withdraw</button>
                </li>
                <li className="nav-item" role="presentation">
                <button className="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="false">History</button>
                </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="deposit" role="tabpanel" aria-labelledby="deposit-tab">
                <div>
                <div className="form-group">
                <label>Type token name or symbol or paste in address</label>
                <input type="text" className="form-control" value={tokenAddress} onChange={e => setTokenAddress(e.target.value)} />
                </div>
                <div className="form-group">
                <label>Select a crypto coin</label>
                <div className="custom-dropdown">
                <select className="form-control" value={coinSymbol} onChange={(e) => handleCoinSelection(e.target.value)}>
                {cryptoCoins.map((coin) => (
                  <option key={coin.symbol} value={coin.symbol}>
                  {coin.name} ({coin.symbol})
                  </option>
                  ))}
                  </select>
                  </div>
                  </div>
                  <div className="form-group">
                  <label>Enter Amount to Deposit</label>
                  <input type="number" className="form-control" />
                  <small>Available: 0.12 DW</small>
                  </div>
                  {walletAddress && (
                  <div className="form-group d-flex align-items-center">
                  <p>Wallet Address: {walletAddress}</p>
                  <QRCode value={walletAddress} style={{ border: '2px solid #fff' }}/>
                  </div>
                  )}
                  </div>
                  </div>
                  <div className="tab-pane fade" id="withdraw" role="tabpanel" aria-labelledby="withdraw-tab">
                  <div>
                  <div className="form-group">
                  <label>Type token name or symbol or paste in address</label>
                  <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                  <label>Select a crypto coin</label>
                  <div className="custom-dropdown">
                  <select className="form-control">
                  {cryptoCoins.map((coin) => (
                    <option key={coin.symbol} value={coin.symbol}>
                    {coin.name} ({coin.symbol})
                    </option>
                    ))}
                    </select>
                    </div>
                    </div>
                    <div className="form-group">
                    <label>Enter Amount to Withdraw</label>
                    <input type="number" className="form-control" />
                    <small>Available: 0.12 DW</small>
                    </div>
                    <div className="form-group d-flex align-items-center">
                    <button className="btn big-yllw-btn2 px-4">Withdraw</button>
                    <div className="gconnected">
                    <em className="gdot"></em>
                    <span>Connected</span>
                    </div>
                    </div>
                    </div>
                    </div>
                    <div className="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
                    <div>
                    <div className="form-group">
                    <label>Type token name or symbol or paste in address</label>
                    <input type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                    <label>Enter Amount to Deposit</label>
                    <input type="number" className="form-control" />
                    <small>Available: 0.12 DW</small>
                    </div>
                    <div className="form-group d-flex align-items-center">
                    <button className="btn big-yllw-btn2 px-4">Deposit</button>
                    <div className="gconnected">
                    <em className="gdot"></em>
                    <span>Connected</span>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </nav>
                    </header>
                    </>
                    );
                  };
                  
                  export default Header
                  