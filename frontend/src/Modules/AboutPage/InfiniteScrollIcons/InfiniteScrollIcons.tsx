import React, { useEffect, useState, useRef } from 'react';
import './InfiniteScrollIcons.css'; 



interface InfiniteScrollIconsProps {
    iconsData: IconData[];
}


const InfiniteScrollIcons:React.FC<InfiniteScrollIconsProps> = ({ iconsData }) => {
    const [iconWidth, setIconWidth] = useState(0);
    const iconsRef = useRef<HTMLDivElement | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    const updateIconWidth = () => {
        if (iconsRef.current) {
            const firstIcon = iconsRef.current.querySelector('.icon-item');
            if (firstIcon) {
                setIconWidth(firstIcon.clientWidth);
            }
        }
    };

    useEffect(() => {
        updateIconWidth(); // Начальная установка ширины
        window.addEventListener('resize', updateIconWidth); // Обновление при изменении размера окна

        return () => {
            window.removeEventListener('resize', updateIconWidth);
        };
    }, []);

    const generateIconComponents = () => {
        return [...iconsData, ...iconsData]; // Дублирование для эффекта бесконечной прокрутки
    };

    return (
        <div
            className="erc20-icons-wrapper"
            onMouseEnter={() => setIsPaused(true)} // Остановка анимации при наведении
            onMouseLeave={() => setIsPaused(false)} // Возобновление анимации при уходе курсора
        >
            <div
                className="erc20-icons"
                style={{
                    width: `${iconWidth * generateIconComponents().length}px`,
                    animation: `scroll ${iconWidth * generateIconComponents().length / 100}s linear infinite`,
                    animationPlayState: isPaused ? 'paused' : 'running',
                }}
                ref={iconsRef}
            >
                {generateIconComponents().map((icon, index) => (
                    <div className="icon-item" key={index}>
                        <img src={icon.src} alt={icon.alt} />
                        <p>{icon.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteScrollIcons;
