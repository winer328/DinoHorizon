"use client";

import { useEffect, useState } from "react";
import {
  calculateMineUpgradeCost,
  calculateProfitPerHour,
  useGameStore,
} from "@/utils/game-mechanics";
import Image from "next/image";
import { MAXIMUM_INACTIVE_TIME_FOR_MINE } from "@/utils/consts";
import { formatNumber } from "@/utils/ui";
import { useToast } from "@/contexts/ToastContext";
import Info from "@/icons/Info";
import { avatar } from "@/images";

export default function Mine() {
  const showToast = useToast();
  const {
    userTelegramInitData,
    pointsBalance,
    profitPerHour,
    mineLevelIndex,
    upgradeMineLevelIndex,
  } = useGameStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const upgradeCost = calculateMineUpgradeCost(mineLevelIndex);
  const upgradeIncrease =
    calculateProfitPerHour(mineLevelIndex + 1) - calculateProfitPerHour(mineLevelIndex);

  const maxInactiveHours = MAXIMUM_INACTIVE_TIME_FOR_MINE / (60 * 60 * 1000);

  const handleUpgrade = async () => {
    if (pointsBalance >= upgradeCost && !isLoading) {
      setIsLoading(true);
      try {
        const response = await fetch("/api/upgrade/mine", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            initData: userTelegramInitData,
          }),
        });

        if (!response.ok) throw new Error("Failed to upgrade mine");

        const result = await response.json();
        console.log("Result from server:", result);
        upgradeMineLevelIndex();
        showToast("Mine Upgrade Successful!", "success");
      } catch (error) {
        console.error("Error upgrading mine:", error);
        showToast("Failed to upgrade mine. Please try again.", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      className="flex justify-center min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #575EFF, #0ECBFF 94%)",
        fontFamily: "'ZCOOL KuaiLe', sans-serif",
        paddingBottom: '2rem' // Add padding to prevent clipping
      }}
    >
      <div className="w-full text-[#150707] font-bold flex flex-col max-w-xl">
        <div className="flex-grow mt-4 rounded-t-[48px] relative top-glow z-0 overflow-y-auto no-scrollbar">
          <div className="mt-[2px] rounded-t-[46px] h-full bg-opacity-0 px-4 pt-1 pb-24">
            <h1
              style={{
                fontFamily: "'ZCOOL KuaiLe', sans-serif",
                fontSize: '1.5rem',
                textAlign: 'center',
                marginTop: '1rem',
                color: '#ffffff',
              }}
            >
              Upgrade
            </h1>

            <div className="px-4 mt-4 flex justify-center">
              <div className="px-4 py-2 flex items-center space-x-2 bg-[#ff47f3] opacity-80 rounded-full">
                <Image src={avatar} alt="Exchange" width={40} height={40} />
                <p className="text-4xl text-[#ffffff]" suppressHydrationWarning>
                  {Math.floor(pointsBalance).toLocaleString()}
                </p>
              </div>
            </div>

            <div style={{
              position: 'relative',
              borderRadius: '25px',
              padding: '16px',
              marginTop: '24px',
              overflow: 'hidden',
            }} className="max-w-[400px] w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="402" height="112" viewBox="0 0 402 112" style={{
                position: 'absolute',
                top: '0',
                left: '0',
                zIndex: '-1',
              }}>
                <rect x="1" y="1" width="400" height="110" rx="19" fill="#AC36A0"/>
                <path d="M1 20C1 9.50659 9.50659 1 20 1H382C392.493 1 401 9.50659 401 20V89C401 99.4934 392.493 108 382 108H20C9.5066 108 1 99.4934 1 89V20Z" fill="white"/>
              </svg>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <p>Current Dinoh per hour:</p>
                <p style={{ color: '#D62024' }}>{formatNumber(profitPerHour)}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <p>Upgrade cost:</p>
                <p style={{ color: '#D62024' }}>{formatNumber(upgradeCost)}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>Dinoh per hour increase:</p>
                <p style={{ color: '#D62024' }}>+{formatNumber(upgradeIncrease)}</p>
              </div>
            </div>

            <button
              onClick={handleUpgrade}
              disabled={pointsBalance < upgradeCost || isLoading}
              className="w-full mt-6 py-2.5 px-4 rounded-lg text-lg border-2 transition-all duration-300 max-w-[400px]"
              style={{
                fontFamily: "'ZCOOL KuaiLe', sans-serif",
                background: pointsBalance >= upgradeCost && !isLoading
                  ? "linear-gradient(to bottom, #FCD113, #F6BA06)"
                  : "linear-gradient(to bottom, #FCD113, #F6BA06)",
                color: pointsBalance >= upgradeCost && !isLoading ? "#ffff" : "gray",
                border: pointsBalance >= upgradeCost && !isLoading ? "2px solid #FCD113" : "2px solid gray",
              }}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto" />
              ) : (
                "UPGRADE"
              )}
            </button>

            {/* Info Section */}
            <div className="relative p-4 mt-6 flex items-center justify-between max-w-[400px] w-full" style={{ height: '112px', zIndex: 10 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="402" height="112" viewBox="0 0 402 112" fill="none" className="absolute inset-0">
                <rect x="1" y="1" width="400" height="110" rx="19" fill="#AC36A0"/>
                <path d="M1 20C1 9.50659 9.50659 1 20 1H382C392.493 1 401 9.50659 401 20V89C401 99.4934 392.493 108 382 108H20C9.5066 108 1 99.4934 1 89V20Z" fill="white"/>
              </svg>
              
              <div className="relative z-10 flex items-center justify-between w-full px-4">
                <Info className="w-6 h-6 text-[#35abff] mr-3 flex-shrink-0 mt-1" />
                <p className="text-sm text-[#000] text-center">
                  Your mine will continue to produce Dinoh coins for up to
                  <span className="text-[#000] font-bold"> {maxInactiveHours} hours</span> after your last interaction. Remember to check in often to optimize your production!
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
