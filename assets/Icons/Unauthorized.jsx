import React from "react";
import { useSelector } from "react-redux";
import { Icon } from "react-native-paper";
import Svg, { Circle, G, Path, Rect } from "react-native-svg";

const Unauthorized = ({
  size = "30px",
  fillColor = "#007433",
  strokeColor = "#fff",
  textColor = "#fff",
}) => {
  const { isStyle } = useSelector((state) => state.HomeReducer);

  const lollypop = (
    <Icon source="circle-medium" color='orange' size={20}/>
  );

  const exclamation =(
    
    <Svg width={'40'} height={'13'} viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
         <Path
           d="M11.9998 9.00023V13.0002M11.9998 17.0002H12.0098M10.6151 3.89195L2.39019 18.0986C1.93398 18.8866 1.70588 19.2806 1.73959 19.6039C1.769 19.886 1.91677 20.1423 2.14613 20.309C2.40908 20.5002 2.86435 20.5002 3.77487 20.5002H20.2246C21.1352 20.5002 21.5904 20.5002 21.8534 20.309C22.0827 20.1423 22.2305 19.886 22.2599 19.6039C22.2936 19.2806 22.0655 18.8866 21.6093 18.0986L13.3844 3.89195C12.9299 3.10679 12.7026 2.71421 12.4061 2.58235C12.1474 2.46734 11.8521 2.46734 11.5935 2.58235C11.2969 2.71421 11.0696 3.10679 10.6151 3.89195Z"
           stroke={'red'}
           strokeWidth="3"
           strokeLinecap="round"
           strokeLinejoin="round"
         />
       </Svg>
    
    );
        return isStyle ? lollypop : exclamation;
};

export default Unauthorized;