import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon, MD3Colors } from 'react-native-paper';
import Svg, { Rect } from 'react-native-svg';
import { useSelector } from 'react-redux';

const AccessibilityOccupiedIcon  = ({
    size = "30px",
    fillColor = "#37F713",
    strokeColor = "grey",
    textColor = "black",
    text = "A",
  }) => {
    const { isStyle } = useSelector((state) => state.HomeReducer);
    const lollypop = (
        <Icon source="circle-medium" color='#024CAA' size={20}/>
      );

      const square = <Svg
      width="20"
      height="10"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect x="1" y="1" width="14" height="14" fill="#024CAA" />
    </Svg>

  return isStyle ? lollypop : square;
}

export default AccessibilityOccupiedIcon;

const styles = StyleSheet.create({})