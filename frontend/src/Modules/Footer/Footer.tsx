import React from 'react';
import './Footer.css'; 

const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <p className='footer-text'> Молодые Профессионалы Блокчейн </p>
                <p className='footer-text'> Михайлов Илья "ГАПОУ СГК"</p>
                <p className='footer-text'>{new Date().getFullYear()} &copy;</p>
                <div className="social-links">
                    <a href="https://t.me/trylastsky" target="_blank" rel="noopener noreferrer"><img className='icon' src="/public/telegram.png" alt="" /></a>
                    <a href="https://pro.firpo.ru/" target="_blank" rel="noopener noreferrer"><img className='icon' src="/public/WSR.png" alt="" /></a>
                    <a href="https://github.com/trylastsky" target="_blank" rel="noopener noreferrer"><img className='icon' src="/public/github.png" alt="" /></a>
              
                </div>
                <div className="scroll-top" onClick={scrollToTop}>
                    <span>&#8593;</span> 
                </div>
            </div>
        </footer>
    );
};

export default Footer;
