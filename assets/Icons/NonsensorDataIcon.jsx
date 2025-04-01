import React from "react";
import { useSelector } from "react-redux";
import { Icon } from "react-native-paper";
import Svg, { G, Polygon } from "react-native-svg";


const NonsensorDataIcon = ({
  size = "30px",
  fillColor = "#90DAEE",
  strokeColor = "grey",
}) => {

  const { isStyle } = useSelector((state) => state.HomeReducer);

  const lollypop = (
    <Icon source="circle-medium" color='#D92638' size={20}/>

   );

const diamond = (
<Svg
    height="15px"
    width="20px"
    fill="#D92638"
    version="1.1"
    id="_x32_"
    viewBox="0 0 512 512"
  >
    <G>
      <Polygon points="256,0 72.115,256 256,512 439.885,256" />
    </G>
  </Svg>
);

   return isStyle ? lollypop : diamond;
}

export default NonsensorDataIcon;