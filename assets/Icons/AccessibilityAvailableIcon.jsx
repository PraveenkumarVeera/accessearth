import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon, MD3Colors } from 'react-native-paper';
import Svg, { Circle } from 'react-native-svg';
import { useSelector } from 'react-redux';

const AccessibilityAvailableIcon = ({
    size = "30px",
    fillColor = "#00B500",
    strokeColor = "grey",
    textColor = "black",
    text = "A",
  }) => {
    const { isStyle } = useSelector((state) => state.HomeReducer);
    const lollypop = (
        <Icon source="circle-medium" color='#00B500' size={20}/>
      );

      const circle = <Svg width="20" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx="8" cy="8" r="8" fill={fillColor} />
    </Svg>

  return isStyle ? lollypop : circle;
}

export default AccessibilityAvailableIcon

const styles = StyleSheet.create({})