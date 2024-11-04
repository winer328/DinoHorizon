import { useState, useEffect } from "react";

export default function GameBanners() {
  const [buttonText, setButtonText] = useState("Tap now!");
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "RUN, JUMP & EARN DINO",
      buttonText: "Tap now 🦕",
      backgroundImage: "url('https://raw.githubusercontent.com/RollupRadar/project23/main/images/tappo2.svg')",
    },
    {
      title: "Play and Win a ps5",
      buttonText: "Invite",
      backgroundImage: "url('https://raw.githubusercontent.com/RollupRadar/project23/main/images/tappo2.svg')",
    },
    {
      title: "CHALLENGE YOUR FRIENDS",
      buttonText: "Explore",
      backgroundImage: "url('https://raw.githubusercontent.com/RollupRadar/project23/main/images/tappo2.svg')",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #575EFF, #0ECBFF 94%)",
        fontFamily: "'ZCOOL KuaiLe', sans-serif",
        padding: "2vw",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-center"
        style={{
          width: "100%",
          padding: "2vw",
          textAlign: "center",
        }}
      >
        <img
          src="https://raw.githubusercontent.com/thedefidude18/dinohorizon/main/images/dinomario.svg"
          alt="Dino Horizon Logo"
          style={{ width: "12vw", height: "12vw", marginRight: "2vw" }}
        />
        <h1
          style={{
            fontSize: "6vw",
            fontWeight: "bold",
            margin: 0,
            color: "#ffffff",
            fontFamily: "'ZCOOL KuaiLe', sans-serif",
          }}
        >
          Welcome Dino Horizon.
        </h1>
      </div>

      {/* Upper Banner with Slider */}
      <div
        style={{
          width: "92vw",
          height: "46vh",
          backgroundImage: slides[currentSlide].backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "5vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          color: "#ffffff",
          position: "relative",
          marginBottom: "1vh", // Reduced space between banners
          padding: "4vw",
        }}
      >
        {/* Overlay for Title and Button */}
        <div
          style={{
            background: "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6))",
            width: "100%",
            borderRadius: "5vw",
            padding: "3vw",
          }}
        >
          <h2
            style={{
              fontSize: "5vw",
              fontWeight: "bold",
              margin: "0 0 2vw 2vw",
              fontFamily: "'ZCOOL KuaiLe', sans-serif",
            }}
          >
            {slides[currentSlide].title}
          </h2>
          <button
            onClick={() => setButtonText("Loading...")}
            style={{
              padding: "2vw 5vw",
              background: "linear-gradient(to bottom, #FCD113, #F6BA06)",
              color: "#ffffff",
              borderRadius: "2vw",
              fontSize: "4vw",
              fontWeight: "bold",
              border: "none",
              marginLeft: "2vw",
              fontFamily: "'ZCOOL KuaiLe', sans-serif",
            }}
          >
            {slides[currentSlide].buttonText}
          </button>
        </div>

        {/* Dots for Slide Indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2vw",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "2vw",
          }}
        >
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)} // Allow clicking dots to change slide
              style={{
                width: index === currentSlide ? "3vw" : "2vw",
                height: index === currentSlide ? "3vw" : "2vw",
                backgroundColor: index === currentSlide ? "#ffffff" : "#cccccc",
                borderRadius: "50%",
                transition: "width 0.3s, height 0.3s, background-color 0.3s",
                cursor: "pointer",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Lower Banner */}
      <div
        style={{
          width: "92vw",
          height: "32vh",
          backgroundImage: "url('https://raw.githubusercontent.com/RollupRadar/project23/main/images/tappo2.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "5vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          color: "#fff",
          padding: "4vw",
          marginTop: "1vh", // Reduced space between banners
        }}
      >
        {/* Static Content for Lower Banner */}
        <div
          style={{
            background: "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6))",
            width: "100%",
            borderRadius: "5vw",
            padding: "3vw",
          }}
        >
          <h2
            style={{
              fontSize: "5vw",
              fontWeight: "bold",
              margin: "0 0 1vw 2vw",
              fontFamily: "'ZCOOL KuaiLe', sans-serif",
            }}
          >
            Jump over obstacles.
          </h2>
          <button
            style={{
              padding: "2vw 5vw",
              background: "linear-gradient(to bottom, #FCD113, #F6BA06)",
              color: "#ffffff",
              borderRadius: "2vw",
              fontSize: "4vw",
              fontWeight: "bold",
              border: "none",
              marginLeft: "2vw",
              fontFamily: "'ZCOOL KuaiLe', sans-serif",
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
