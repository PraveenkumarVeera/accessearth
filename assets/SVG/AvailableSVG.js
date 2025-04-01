import React from "react";
import Svg, {
  Circle,
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
} from "react-native-svg";

const AvailableSVG = () => {
  return (
    <Svg width="40" height="40" viewBox="0 0 100 80">
      {/* Define gradients */}
      <Defs>
        {/* Radial Gradient for the Fluorescent Green Sphere */}
        <RadialGradient
          id="fluorescentGreenSphereGradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <Stop offset="10%" stopColor="#00ff00" stopOpacity="1" />
          <Stop offset="100%" stopColor="#009900" stopOpacity="1" />
        </RadialGradient>

        {/* Gradient for the Protrusion */}
        <LinearGradient
          id="protrusionGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <Stop offset="0%" stopColor="#00ff00" stopOpacity="1" />
          <Stop offset="100%" stopColor="#009900" stopOpacity="1" />
        </LinearGradient>
      </Defs>

      {/* Fluorescent Green Sphere */}
      <Circle
        cx="50"
        cy="50"
        r="40"
        fill="url(#fluorescentGreenSphereGradient)"
      />

      {/* Protruding Inner Circle with border */}
      <Circle
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke="#FFFF00"
        strokeWidth="2"
        strokeOpacity="1" // This sets initial opacity
      />
    </Svg>
  );
};

export default AvailableSVG;
