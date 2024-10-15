import React, { useState } from 'react';
import ConnectWallet from './ConnectWallet/ConnectWallet';
import './Header.css';

const Header: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
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
          <ConnectWallet setAccount={setAccount}/>
          <li><a href="/">Главная</a></li>
          <li><a href="/about">О Нас</a></li>
          {account && <li><a href="/cabinet">Личный кабинет</a></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
