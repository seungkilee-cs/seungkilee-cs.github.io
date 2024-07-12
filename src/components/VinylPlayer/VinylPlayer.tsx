import {FC, useState } from 'react';
import './VinylPlayer.css';

const VinylPlayer: FC = () => {
    const [currentTab, setCurrentTab] = useState<string | null>(null);

    const handleTabClick = (tab: string) => {
        setCurrentTab(tab);
    };

    return (
        <div className="vinyl-player-container">
            <div className={`vinyl ${currentTab ? 'spin' : ''}`}></div>
            <nav className="navbar">
                <button onClick={() => handleTabClick('home')}>Home</button>
                <button onClick={() => handleTabClick('about')}>About Me</button>
            </nav>
            <div className="content">
                {currentTab === 'home' && <div>Home Content</div>}
                {currentTab === 'about' && <div>About Me Content</div>}
            </div>
        </div>
    );
};

export default VinylPlayer;