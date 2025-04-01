import * as React from "react";
import Svg, { Circle, Line } from "react-native-svg";
const LiveLocationIcon = (props) => (
  <Svg height={35} width={35} viewBox="0 0 64 64" {...props}>
    <Circle cx={32} cy={32} r={30} stroke="none" strokeWidth={4} fill="none" />
    <Circle
      cx={32}
      cy={32}
      r={20}
      stroke="#1976D2"
      strokeWidth={4}
      fill="none"
    />
    <Circle
      cx={32}
      cy={32}
      r={10}
      stroke="#1976D2"
      strokeWidth={4}
      fill="#1976D2"
    />
    <Line x1={32} y1={0} x2={32} y2={12} stroke="#1976D2" strokeWidth={4} />
    <Line x1={32} y1={52} x2={32} y2={64} stroke="#1976D2" strokeWidth={4} />
    <Line x1={0} y1={32} x2={12} y2={32} stroke="#1976D2" strokeWidth={4} />
    <Line x1={52} y1={32} x2={64} y2={32} stroke="#1976D2" strokeWidth={4} />
  </Svg>
);
export default LiveLocationIcon;
