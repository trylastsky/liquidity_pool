import React from 'react';
import InfiniteScrollIcons from './InfiniteScrollIcons/InfiniteScrollIcons';
import iconsData from "./IconsData.json";
import "./AboutPage.css";


import aboutText from "./AboutText.json";

const AboutPage: React.FC = () => {
    return (
        <div className='container'>
            <h1>{aboutText.title}</h1>
            <div className='textBlock'>
                <p>
                    {aboutText.welcomeMessage}
                </p>
                <p>
                    {aboutText.mission}
                </p>
                <InfiniteScrollIcons iconsData={iconsData}/>
                <p>
                    В LiqPool мы предлагаем:
                </p>
                <ul>
                    {aboutText.offerings.map((offering, index) => (
                        <li key={index}>
                            <strong>{offering.strong}</strong> {offering.description}
                        </li>
                    ))}
                </ul>
                <p>
                    {aboutText.team}
                </p>
                <p>
                    {aboutText.thankYou}
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
