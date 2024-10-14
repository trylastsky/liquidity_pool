import React from 'react';
import ConnectWallet from './ConnectWallet/ConnectWallet';
import './Header.css'; 

const Header: React.FC = () => {
  return (
    <header className="header">
        <a href="/">
      <div className="logo">
        <img src="/public/logo.jpg" alt="PoolLiq Logo" />
        <h1>LiqPool</h1>
      </div>

        </a>
        <ConnectWallet /> 
      <nav className="navigation">
        <ul>
          <li><a href="/">Главная</a></li>
          <li><a href="/about">О Нас</a></li>
          <li><a href="/contact">Личный кабинет</a></li>
        </ul>
      </nav>
     
    </header>
  );
};

export default Header;
