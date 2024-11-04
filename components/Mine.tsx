
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
      buttonText: "Explore Now",
      backgroundImage: "url('https://raw.githubusercontent.com/RollupRadar/project23/main/images/tappo2.svg')",
    },
    {
      title: "CHALLENGE YOUR FRIENDS",
      buttonText: "Get Started",
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
      className="flex flex-col items-center min-h-screen justify-center"
      style={{
        background: "linear-gradient(to bottom, #575EFF, #0ECBFF 94%)",
        fontFamily: "'ZCOOL KuaiLe', sans-serif",
        padding: "1rem",
        position: "relative",
        top: "-30px",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-center"
        style={{
          width: "100%",
          padding: "1rem",
          fontFamily: "'ZCOOL KuaiLe', sans-serif",
        }}
      >
        <img
          src="https://raw.githubusercontent.com/thedefidude18/dinohorizon/main/images/dinomario.svg"
          alt="Dino Horizon Logo"
          style={{ width: "50px", height: "50px", marginRight: "1rem" }}
        />
        <h1
          style={{
            fontSize: "24px",
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
          width: "405px",
          height: "310px",
          backgroundImage: slides[currentSlide].backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          color: "#ffffff",
          position: "relative",
          marginBottom: "0.5rem",
        }}
      >
        {/* Overlay for Title and Button */}
        <div
          style={{
            background: "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6))",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            borderRadius: "15px",
            padding: "10px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              margin: "0 0 10px 20px",
              fontFamily: "'ZCOOL KuaiLe', sans-serif",
            }}
          >
            {slides[currentSlide].title}
          </h2>
          <button
            onClick={() => setButtonText("Loading...")}
            style={{
              padding: "8px 16px",
              background: "linear-gradient(to bottom, #FCD113, #F6BA06)",
              color: "#ffffff",
              borderRadius: "12px",
              fontSize: "19px",
              fontWeight: "bold",
              border: "none",
              marginLeft: "20px",
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
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
          }}
        >
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)} // Allow clicking dots to change slide
              style={{
                width: index === currentSlide ? "12px" : "8px",
                height: index === currentSlide ? "12px" : "8px",
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
          width: "405px",
          height: "240px",
          backgroundImage: "url('https://raw.githubusercontent.com/RollupRadar/project23/main/images/tappo2.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          color: "#000",
        }}
      >
        {/* Static Content for Lower Banner */}
        <div
          style={{
            background: "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6))",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            borderRadius: "15px",
            padding: "5px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              margin: "0 0 5px 20px",
              fontFamily: "'ZCOOL KuaiLe', sans-serif",
            }}
          >
            Jump over obstacles.
          </h2>
          <button
            style={{
              padding: "8px 16px",
              background: "linear-gradient(to bottom, #FCD113, #F6BA06)",
              color: "#ffffff",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              marginLeft: "20px",
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
