import { useState } from "react";

export default function GameBanners() {
  const [buttonText, setButtonText] = useState("Tap now!");

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
      {/* Small Banner Above with Image Background and Overlay */}
      <div
        style={{
          width: "405px",
          height: "50px", // Set a fixed height for the small banner
          backgroundImage: "url('https://raw.githubusercontent.com/RollupRadar/project23/main/images/tappo2.svg')", // Background image for the small banner
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "15px", // Increased corner radius
          position: "relative",
          marginBottom: "0.5rem", // Space between small banner and upper banner
        }}
      >
        {/* Overlay */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.6)", // Black overlay
            width: "100%",
            height: "100%",
            borderRadius: "15px", // Match parent border radius
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Real Icon */}
          <img
            src="https://path/to/your/icon.png" // Replace with your icon URL
            alt="Dino Icon"
            style={{ width: "30px", height: "30px", marginRight: "10px" }} // Adjust size and margin as needed
          />
          <h2 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", margin: 0 }}>
            Welcome Dino Horizon
          </h2>
        </div>
      </div>

      {/* Upper Banner */}
      <div
        style={{
          width: "405px",
          height: "330px",
          backgroundImage: "url('https://raw.githubusercontent.com/RollupRadar/project23/main/images/tappo2.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "15px", // Increased corner radius
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
            background: "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6))", // Transparent to black gradient from right to left
            width: "100%", // Match the width of the banner
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Center contents vertically
            alignItems: "flex-start",
            borderRadius: "15px", // Match parent border radius
            padding: "10px", // Padding for upper banner
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              margin: "0 0 10px 20px", // Adjust margin for title
              fontFamily: "'ZCOOL KuaiLe', sans-serif",
            }}
          >
            TAP AND COLLECT DINO
          </h2>
          <button
            onClick={() => setButtonText("Loading...")}
            style={{
              padding: "8px 16px", // Reduced padding for button
              background: "linear-gradient(to bottom, #FCD113, #F6BA06)",
              color: "#ffffff",
              borderRadius: "12px",
              fontSize: "19px",
              fontWeight: "bold",
              border: "none",
              marginLeft: "20px", // Align button with heading
              fontFamily: "'ZCOOL KuaiLe', sans-serif", // Set button font
            }}
          >
            {buttonText}
          </button>
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
          borderRadius: "15px", // Increased corner radius
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          color: "#000",
        }}
      >
        {/* Overlay for Title and Button */}
        <div
          style={{
            background: "linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6))", // Transparent to black gradient from right to left
            width: "100%", // Match the width of the banner
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end", // Adjusted to align contents to the bottom
            alignItems: "flex-start",
            borderRadius: "15px", // Match parent border radius
            padding: "5px", // Reduced padding to lower height
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              margin: "0 0 5px 20px", // Adjust margin for title
              fontFamily: "'ZCOOL KuaiLe', sans-serif",
            }}
          >
            RUN, JUMP & EARN DINO
          </h2>
          <button
            style={{
              padding: "8px 16px", // Reduced padding for button
              background: "linear-gradient(to bottom, #FCD113, #F6BA06)",
              color: "#ffffff",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              marginLeft: "20px", // Align button with heading
              fontFamily: "'ZCOOL KuaiLe', sans-serif", // Set button font
            }}
          >
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}
