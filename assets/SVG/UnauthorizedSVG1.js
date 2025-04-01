import React from "react";
import Svg, {
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  Circle,
  Rect,
  Polygon,
} from "react-native-svg";

const UnauthorizedSVG1 = () => {
  return (
    <Svg width="60" height="60" viewBox="0 0 100 200">
      {/* Define gradients and filters */}
      <Defs>
        {/* Radial Gradient for the Metallic Red Sphere */}
        <RadialGradient
          id="metallicRedSphereGradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <Stop offset="10%" stopColor="#FFA500" stopOpacity="1" />
          <Stop offset="100%" stopColor="#FF9A00" stopOpacity="1" />
        </RadialGradient>

        {/* Linear Gradient for the Metallic Platinum Stick */}
        <LinearGradient
          id="metallicPlatinumStickGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <Stop offset="0%" stopColor="#e5e5e5" stopOpacity="1" />
          <Stop offset="50%" stopColor="#bfbfbf" stopOpacity="1" />
          <Stop offset="100%" stopColor="#8c8c8c" stopOpacity="1" />
        </LinearGradient>

        {/* Highlight for Extra Shine Effect */}
        <RadialGradient
          id="stickHighlightGradient"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <Stop offset="40%" stopColor="white" stopOpacity="0.6" />
          <Stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </RadialGradient>

        {/* Shadow Filter for Depth */}
        {/* <Filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <FeDropShadow dx="4" dy="4" stdDeviation="3" floodColor="#555" />
        </Filter> */}
      </Defs>

      {/* Metallic Red Sphere with shadow */}
      <Circle cx="50" cy="50" r="40" fill="url(#metallicRedSphereGradient)" filter="url(#shadow)" />
      
      {/* Shiny Metallic Platinum Stick with gradient and highlight */}
      <Rect x="45" y="90" width="10" height="110" fill="url(#metallicPlatinumStickGradient)" />
      <Rect
        x="45"
        y="90"
        width="10"
        height="110"
        fill="url(#stickHighlightGradient)"
        style={{ mixBlendMode: "screen" }}
      />
      
      {/* Sharp Pin at the bottom */}
      <Polygon points="45,200 55,200 50,180" fill="url(#metallicPlatinumStickGradient)" />
      
      {/* Optional: Add a small circle at the bottom of the pin for additional detail */}
      <Circle cx="50" cy="200" r="5" fill="#777" />
    </Svg>
  );
};

export default UnauthorizedSVG1;
