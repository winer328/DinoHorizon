"use client";

import { useState } from "react";
import Image from "next/image";
import { avatar, boost, lightning, main_button } from "@/images";
import Rocket from "@/icons/Rocket";
import { useGameStore } from "@/utils/game-mechanics";
import TopInfoSection from "@/components/TopInfoSection";
import { LEVELS } from "@/utils/consts";

interface GameProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function Game({ currentView, setCurrentView }: GameProps) {
  const handleViewChange = (view: string) => {
    console.log("Attempting to change view to:", view);
    if (typeof setCurrentView === "function") {
      try {
        setCurrentView(view);
        console.log("View change successful");
      } catch (error) {
        console.error("Error occurred while changing view:", error);
      }
    } else {
      console.error("setCurrentView is not a function:", setCurrentView);
    }
  };

  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  const {
    points,
    pointsBalance,
    pointsPerClick,
    energy,
    maxEnergy,
    gameLevelIndex,
    clickTriggered,
    updateLastClickTimestamp,
  } = useGameStore();

  const calculateTimeLeft = (targetHour: number) => {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);

    if (now.getUTCHours() >= targetHour) {
      target.setUTCDate(target.getUTCDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");

    return `${paddedHours}:${paddedMinutes}`;
  };

  const handleInteraction = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    e.preventDefault(); // Prevent default behavior

    const processInteraction = (
      clientX: number,
      clientY: number,
      pageX: number,
      pageY: number
    ) => {
      if (energy - pointsPerClick < 0) return;

      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;

      // Apply tilt effect
      card.style.transform = `perspective(1000px) rotateX(${
        -y / 10
      }deg) rotateY(${x / 10}deg)`;
      setTimeout(() => {
        card.style.transform = "";
      }, 100);

      updateLastClickTimestamp();
      clickTriggered();
      setClicks((prevClicks) => [
        ...prevClicks,
        {
          id: Date.now(),
          x: pageX,
          y: pageY,
        },
      ]);
    };

    if (e.type === "touchend") {
      const touchEvent = e as React.TouchEvent<HTMLDivElement>;
      Array.from(touchEvent.changedTouches).forEach((touch) => {
        processInteraction(
          touch.clientX,
          touch.clientY,
          touch.pageX,
          touch.pageY
        );
      });
    } else {
      const mouseEvent = e as React.MouseEvent<HTMLDivElement>;
      processInteraction(
        mouseEvent.clientX,
        mouseEvent.clientY,
        mouseEvent.pageX,
        mouseEvent.pageY
      );
    }
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };

  const calculateProgress = () => {
    if (gameLevelIndex >= LEVELS.length - 1) {
      return 100;
    }
    const currentLevelMin = LEVELS[gameLevelIndex].minPoints;
    const nextLevelMin = LEVELS[gameLevelIndex + 1].minPoints;
    const progress =
      ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  return (
    <div className="bg-black flex justify-center min-h-screen">
      <div className="w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl ">
        <TopInfoSection />

        <div className="flex-grow mt-2 bg-[#D62125] rounded-t-[48px] relative top-glow z-0">
          <div className="mt-[2px] bg-[url('../images/background_red.jpg')] bg-center rounded-t-[46px] h-full overflow-y-auto no-scrollbar">
            <div className="px-4 pt-1 pb-24">
              <div className="px-4 mt-4 flex justify-center ">
                <div className="px-4 py-2 flex items-center space-x-2 bg-[#280101] opacity-80 rounded-full">
                  <Image src={avatar} alt="avatar" width={40} height={40} />
                  <p className="text-4xl text-red neon_text" suppressHydrationWarning>
                    {Math.floor(pointsBalance).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-2 text-[#D62024]   ">
                <p >{LEVELS[gameLevelIndex].name}</p>
                <p>&#8226;</p>
                <p>
                  {gameLevelIndex + 1}{" "}
                  <span>/ {LEVELS.length}</span>
                </p>
              </div>
              <div className="flex justify-center"></div>
              <div className="px-4 mt-12 flex justify-center  bg-center bg-no-repeat bg-cover rounded-full">
                <div
                  className="w-80 h-80 p-4 rounded-full circle-outer"
                  onClick={handleInteraction}
                  onTouchEnd={handleInteraction}
                >
                  <div className="w-full h-full rounded-full circle-inner overflow-hidden relative ">
                    <Image
                      src={LEVELS[gameLevelIndex].bigImage}
                      alt="Main Character"
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        transform: "scale(1.05) translateY(10%)",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between px-4 mt-4">
                <p className="flex justify-center items-center gap-1">
                  <Image
                  className=" mr-2"
                    src={lightning}
                    alt="Exchange"
                    width={20}
                    height={20}
                  />
                  <span className="flex flex-row text-[#D62024]">
                    <span className="text-xl font-bold">{energy}</span>
                    <span className="text-xl font-bold">/ {maxEnergy}</span>
                  </span>
                </p>
                <button
                  onClick={() => handleViewChange("boost")}
                  className="flex justify-center items-center gap-1"
                >
                  <Image
                    src={boost}
                    alt="Exchange"
                    width={40}
                    height={40}
                  />{" "}
                  <span className="text-xl text-[#D62024]">Boost</span>
                </button>
              </div>

              <div className="w-full px-4 text-sm mt-2">
                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                  <div className="w-full h-3 bg-[#ffff]/[0.2] rounded-full border border-[#F60000] ">
                    <div
                      className="progress-gradient h-3 rounded-full"
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {clicks.map((click) => (
        <div
          key={click.id}
          className="absolute text-5xl font-bold opacity-0 text-[#D62024] pointer-events-none flex justify-center"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          +{pointsPerClick}
        </div>
      ))}
    </div>
  );
}
