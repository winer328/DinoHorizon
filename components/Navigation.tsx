
'use client'

import Image, { StaticImageData } from 'next/image';
import { avatar, earn_nav, friends_nav, main_button, mine_nav } from '@/images';


type NavItem = {
    name: string;
    image?: StaticImageData | null;
    view: string;
};

const navItems: NavItem[] = [
    { name: 'Mine', image: mine_nav, view: 'mine' },
    { name: 'Friends', image: friends_nav, view: 'friends' },
    { name: 'OWL', image: main_button, view: 'game' },
    { name: 'Earn', image: earn_nav, view: 'earn' },
    { name: 'Airdrop', image: avatar, view: 'airdrop' },
];

interface NavigationProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function Navigation({ currentView, setCurrentView }: NavigationProps) {
    console.log('Navigation props:', { 
        currentView, 
        setCurrentView, 
        isSetCurrentViewFunction: typeof setCurrentView === 'function' 
    });

    const handleViewChange = (view: string) => {
        console.log('Attempting to change view to:', view);
        if (typeof setCurrentView === 'function') {
            try {
                setCurrentView(view);
                console.log('View change successful');
            } catch (error) {
                console.error('Error occurred while changing view:', error);
            }
        } else {
            console.error('setCurrentView is not a function:', setCurrentView);
        }
    };

    if (typeof setCurrentView !== 'function') {
        console.error('setCurrentView is not a function. Navigation cannot be rendered properly.');
        return null; // or return some fallback UI
    }

    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] w-full max-w-xl bg-black  flex justify-around items-center z-40 text-xs border-t border-[#D62024] max-h-24">
            {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleViewChange(item.view)}
                  className="flex-1"
                >
                    <div className={`flex flex-col items-center justify-center ${currentView === item.view ? 'text-black bg-[#D62024] ' : 'text-[#85827d]'} h-16 m-1 p-2 rounded-md`}>
                        <div className="w-8 h-8 relative">
                            {item.image && (
                                <div className="w-full h-full relative">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={32}
                                        height={32}
                                    />
                                </div>
                            )}
                        </div>
                        <p className="mt-1">{item.name}</p>
                    </div>
                </button>
            ))}
        </div>
    );
}