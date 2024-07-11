import React from "react";
import Compass from "../assets/compass.svg";
import Needle from "../assets/needle.svg";

const WindDirectionIcon = ({ direction }: { direction: string }) => {
  const getRotation = (direction: string) => {
    switch (direction) {
      case "N":
        return 0;
      case "NW":
        return 45;
      case "W":
        return 90;
      case "SW":
        return 135;
      case "S":
        return 180;
      case "SE":
        return 225;
      case "E":
        return 270;
      case "NE":
        return 315;
      default:
        return 0;
    }
  };

  const rotation = getRotation(direction);

  return (
    <div style={{ position: "relative", width: "50px", height: "50px" }}>
      <img src={Compass} alt="Compass" style={{ position: "absolute", top: 0, left: 0 }} />
      <img
        src={Needle}
        alt="Needle"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: `rotate(${rotation}deg)`,
          transformOrigin: "center",
        }}
      />
    </div>
  );
};

export default WindDirectionIcon;
