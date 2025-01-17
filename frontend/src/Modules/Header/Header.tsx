import React, { useState } from 'react';
import ConnectWallet from './ConnectWallet/ConnectWallet';
import { Connect_interface } from "../../global";
import './Header.css';



const Header: React.FC<Connect_interface> = ({signer,setSigner,provider,setProvider}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <a href="/">
        <div className="logo">
          <img src="/public/logo.jpg" alt="PoolLiq Logo" />
          <h1>LiqPool</h1>
        </div>
      </a>
      <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <nav className={`navigation ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <ConnectWallet signer={signer} setSigner={setSigner} provider={provider} setProvider={setProvider}/>
          <li><a href="/">Главная</a></li>
          <li><a href="/about">О Нас</a></li>
          {signer && <li><a href="/cabinet">Личный кабинет</a></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
