"use client";

import { useState } from "react";
import {
  calculateMineUpgradeCost,
  calculateProfitPerHour,
  useGameStore,
} from "@/utils/game-mechanics";
import Image from "next/image";
import {
  MAXIMUM_INACTIVE_TIME_FOR_MINE,
} from "@/utils/consts";
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

  const upgradeCost = calculateMineUpgradeCost(mineLevelIndex);
  const upgradeIncrease =
    calculateProfitPerHour(mineLevelIndex + 1) -
    calculateProfitPerHour(mineLevelIndex);

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

        if (!response.ok) {
          throw new Error("Failed to upgrade mine");
        }

        const result = await response.json();

        console.log("Result from server:", result);

        // Update local state with the new values
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
    <div className="bg-black flex justify-center min-h-screen">
      <div className="w-full bg-black text-[#D62125]font-bold flex flex-col max-w-xl">
        <div className="flex-grow mt-4 bg-[#D62125] rounded-t-[48px] relative top-glow z-0">
          <div className="mt-[2px] bg-[#000000] rounded-t-[46px] h-full overflow-y-auto no-scrollbar">
            <div className="px-4 pt-1 pb-24">
              <h1 className="text-2xl text-center mt-4 text-[#D62125] ">Upgrade</h1>

              <div className="px-4 mt-4 flex justify-center">
                <div className="px-4 py-2 flex items-center space-x-2 space-x-2 bg-[#280101] opacity-80 rounded-full">
                  <Image
                    src={avatar}
                    alt="Exchange"
                    width={40}
                    height={40}
                  />
                  <p className="text-4xl text-[#D62125]" suppressHydrationWarning>
                    {Math.floor(pointsBalance).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-900 to-neutral-900 rounded-lg p-4 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <p>Current profit per hour:</p>
                  <p className="text-[#D62024]">
                    {formatNumber(profitPerHour)}
                  </p>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <p>Upgrade cost:</p>
                  <p className="text-[#D62024]">{formatNumber(upgradeCost)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p>profit per hour increase:</p>
                  <p className="text-[#D62024]">
                    +{formatNumber(upgradeIncrease)}
                  </p>
                </div>
              </div>

              <button
                onClick={handleUpgrade}
                disabled={pointsBalance < upgradeCost || isLoading}
                className={`w-full mt-6 py-3 rounded-lg text-center text-[#D62125] font-bold ${
                  pointsBalance >= upgradeCost && !isLoading
                    ? "bg-[#280101]"
                    : "bg-[#6B7280] cursor-not-allowed"
                } relative`}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                ) : (
                  "Upgrade"
                )}
              </button>

              <div className="bg-[#280101] rounded-lg p-4 mt-6 flex items-center justify-between">
                <Info className="w-6 h-6 text-[#D62024] mr-3 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-300 items-center text-center">
                  Your mine will continue to produce coins for up to<span className="text-[#D62125] font-bold"> 
                  {" "}{maxInactiveHours} hours
                  </span>
                  {" "}after your last interaction. Remember to check in often to
                  optimize your production!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
