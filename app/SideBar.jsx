import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import AccessibilityAvailableIcon from "../assets/Icons/AccessibilityAvailableIcon";
import AccessibilityOccupiedIcon from "../assets/Icons/AccessibilityOccupiedIcon";
import Unauthorized from "../assets/Icons/Unauthorized";
import NonsensorDataIcon from "../assets/Icons/NonsensorDataIcon";
import { context } from "./_layout";
import { useDispatch, useSelector } from "react-redux";
import {
  setAvailability,
  setBayType,
  setError,
  setLiveLocation,
  setStyle,
} from ".././redux/homeaction";
import {
  setCenter,
  setDashCenter,
  setDestination,
  setZoom,
} from ".././redux/mapaction";
import { Button, RadioButton } from "react-native-paper";
// import DrawerCom from "./DrawerCom";

const SideBar = () => {
  const { availableCount, occupiedCount, unauthorizedCount,noDataCount,allCount,centerLocation, toggleDrawer,setSelected,selected } =useContext(context);
  const [selectedBayType, setSelectedBayType] = useState("all");
  const [iconStyle, setIconStyle] = useState(false);

  // const [selectedAvailability, setSelectedAvailability] = useState("all-avail");
  const [selectedButton, setSelectedButton] = useState(null);

  const dispatch = useDispatch();

  const { liveLocation,bayType } = useSelector((state) => state.HomeReducer);
  const { destination } = useSelector((state) => state.MapReducer);

  const handleBayTypeChange = (value) => {
    console.log("value", value);

    setSelectedBayType(value);

    dispatch(setBayType(value));

    dispatch(setDashCenter(null));
    dispatch(setLiveLocation(null));

    if (value === "ev_charging") {
      setSelectedAvailability("all-avail");
      dispatch(setAvailability(null));
      dispatch(setZoom(16));
      dispatch(
        setCenter({
          latitude: centerLocation.latitude,
          longitude: centerLocation.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.1,
        })
      );
    }

    if (value == "accessibility") {
      setSelectedAvailability("all-avail");
      dispatch(setAvailability(null));
      // dispatch(setZoom(15));
      // dispatch(
      //   setCenter({
      //     lat: 53.29258236694336,
      //     lng: -6.1413469314575195,
      //   })
      // );
      dispatch(setZoom(12));
      dispatch(
        setCenter({
          latitude: centerLocation.latitude,
          longitude: centerLocation.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.1,
        })
      );
    }

    if (value === "all") {
      setSelectedAvailability("all-avail");
      dispatch(setBayType(null));
      // dispatch(setZoom(13.1));
      dispatch(setZoom(12));
      dispatch(setAvailability(null));
      dispatch(
        setCenter({
          latitude: centerLocation.latitude,
          longitude: centerLocation.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.1,
        })
      );
    }
  };

  const handleAvailabilityChange = (value) => {
    console.log("valueee", value, bayType);
    // setSelectedAvailability(value);
    setSelected(value);

    if (value === "available" && bayType === "ev_charging") {
      dispatch(setAvailability("ev_available"));
    } else if (value === "unathorized") {
      dispatch(setAvailability("unathorized"));
    } else if (value === "occupied" && bayType === "ev_charging") {
      dispatch(setAvailability("ev_occupied"));
    } else if (value === "available" && bayType === "accessibility") {
      dispatch(setAvailability("normal_available"));
    } else if (value === "occupied" && bayType === "accessibility") {
      dispatch(setAvailability("normal_occupied"));
    } else if (value === "available" && bayType === "all") {
      dispatch(setAvailability("all_available"));
    } else if (value === "occupied" && bayType === "all") {
      dispatch(setAvailability("all_occupied"));
    } else if (value === "all-avail" && bayType === "all") {
      dispatch(setBayType(null));
      // dispatch(setZoom(13.1));
      dispatch(setZoom(12));
      dispatch(setAvailability(null));
      dispatch(
        setCenter({
          latitude: centerLocation.latitude,
          longitude: centerLocation.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.1,
        })
      );
    } else if (value === "all-avail" && bayType === "ev_charging") {
      dispatch(setAvailability(null));
    } else if (value === "all-avail" && bayType === "accessibility") {
      dispatch(setAvailability(null));
    } else if (value === "nosignal") {
      dispatch(setAvailability("nosignal"));
    }
  };

  const handleToggle = () => {
    setIconStyle((prev) => !prev);
    dispatch(setStyle(!iconStyle));
  };

 
  return (
    <View style={styles.container}>
      {/* Count */}
      <View style={styles.box}>
        <View style={styles.row}>
         <Pressable style={{alignItems:'center',justifyContent:'center',padding:8,gap:1,borderRadius:15,backgroundColor:selected==='available'?'#D9EAFD':'#fff'}} onPress={()=>handleAvailabilityChange('available')}>
            <AccessibilityAvailableIcon size="10px"/>
            <Text style={styles.countText}>{availableCount}</Text>
            <Text style={styles.labelText}>AVAILABLE</Text>
         </Pressable>
         
         <Pressable style={{alignItems:'center',justifyContent:'center',padding:8,gap:1,borderRadius:15,backgroundColor:selected==='occupied'?'#D9EAFD':'#fff'}} onPress={()=>handleAvailabilityChange('occupied')}>
            <AccessibilityOccupiedIcon size="10px" />
            <Text style={styles.countText}>{occupiedCount}</Text>
            <Text style={styles.labelText}>OCCUPIED</Text>
         </Pressable>
          
          <Pressable style={{alignItems:'center',justifyContent:'center',padding:8,gap:1,borderRadius:15,backgroundColor:selected==='unathorized'?'#D9EAFD':'#fff'}} onPress={()=>handleAvailabilityChange('unathorized')}>
            <Unauthorized size="10px" />
            <Text style={styles.countText}>{unauthorizedCount}</Text>
            <Text style={styles.labelText}>UNAUTHORIZED</Text>
          </Pressable>
         
          <Pressable style={{alignItems:'center',justifyContent:'center',padding:8,gap:1,borderRadius:15,backgroundColor:selected==='nosignal'?'#D9EAFD':'#fff'}} onPress={()=>handleAvailabilityChange('nosignal')}>
            <NonsensorDataIcon size="10px" />
            <Text style={styles.countText}>{noDataCount}</Text>
            <Text style={styles.labelText}>NO SIGNAL</Text>
          </Pressable>

          <Pressable style={{alignItems:'center',justifyContent:'center',padding:8,gap:1,borderRadius:15,backgroundColor:selected==='all-avail'?'#D9EAFD':'#fff'}} onPress={()=>handleAvailabilityChange('all-avail')}>
            <AccessibilityAvailableIcon size="10px" fillColor="grey"/>
            <Text style={styles.countText}>{allCount}</Text>
            <Text style={styles.labelText}>ALL LOTS</Text>
          </Pressable>

        </View>

        {/* <View style={styles.row}>
          <View style={styles.item}>
            <Unauthorized size="10px" />
            <Text style={styles.countText}>{1}</Text>
            <Text style={styles.labelText}>Unautho</Text>
          </View>
          <View style={styles.item}>
            <NonsensorDataIcon size="10px" />
            <Text style={styles.countText}>{1}</Text>
            <Text style={styles.labelText}>No Data</Text>
          </View>
        </View> */}
      </View>

      {/* Filter */}
       {/* <View style={{flex:1,gap:2}}>
        
      <View style={styles.box1}>
      <RadioButton.Group 
       onValueChange={(newValue) => {
        handleBayTypeChange(newValue);
        filterCount(newValue);
        setSelectedButton(null);
      }} 
      value={selectedBayType}>
        <View style={styles.row1}>
      <View style={styles.item1}>
        <RadioButton
          value="ev_charging"
        />
        <Text style={styles.labelText}>EV</Text>
      </View>
      <View style={styles.item1}>
        <RadioButton
          value="accessibility"
        />
        <Text style={styles.labelText}>Accessibility</Text>
      </View>
      </View>

       <View style={styles.row1}>
      <View style={styles.item1}>
        <RadioButton
          value="all"
        />
        <Text style={styles.labelText}>ALL BAY</Text>
      </View>      
      </View>
      </RadioButton.Group>
      </View>
      
      <View style={styles.box2}>
      <RadioButton.Group onValueChange={handleAvailabilityChange} value={selectedAvailability}>
       
        <View style={styles.row1}>
      <View style={styles.item1}>
        <RadioButton
          value="available"
        />
        <Text style={styles.labelText}>Available</Text>
      </View>
      <View style={styles.item1}>
        <RadioButton
          value="unathorized"
        />
        <Text style={styles.labelText}>UNAUTHORIZED</Text>
      </View>
      </View>

       <View style={styles.row1}>
      <View style={styles.item1}>
        <RadioButton
          value="occupied"
        />
        <Text style={styles.labelText}>OCCUPIED</Text>
      </View>
      <View style={styles.item1}>
        <RadioButton
          value="nosignal"
        />
        <Text style={styles.labelText}>NO SIGNAL</Text>
      </View>    
      </View>

      <View style={styles.row1}>
      <View style={{ flexDirection: 'row',alignItems:'center'}}>
        <RadioButton
          value="all-avail"
        />
        <Text style={styles.labelText}>ALL PARKING LOTS</Text>
      </View>
      
      </View>

      </RadioButton.Group>
      </View>

      </View>  */}

      {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          mode="outlined"
          onPress={handleToggle}
          textColor="black"
          style={styles.customButton}
        >
          Change Icon
        </Button>
        <Button
          mode="outlined"
          onPress={toggleDrawer}
          textColor="black"
          style={styles.customButton}
        >
          Routes
        </Button>
      </View> */}
    </View>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Space between the boxes
    padding: 5,
    gap: 5,
  },
  box: {
    flex: 1, // Equal space for each box
    justifyContent: "center",
    padding: 8, // Space inside the box
    borderWidth: 1, // Border for the box
    borderColor: "#ccc", // Border color
    borderRadius: 10, // Rounded corners
    backgroundColor: "#fff", // Background color
  },
  box1: {
    flex: 1, // Equal space for each box
    padding: 10, // Space inside the box
    justifyContent: "center",
    borderWidth: 1, // Border for the box
    borderColor: "#ccc", // Border color
    borderRadius: 10, // Rounded corners
    backgroundColor: "#fff", // Background color
  },
  box2: {
    flex: 3, // Equal space for each box
    padding: 10, // Space inside the box
    justifyContent: "center",
    borderWidth: 1, // Border for the box
    borderColor: "#ccc", // Border color
    borderRadius: 10, // Rounded corners
    backgroundColor: "#fff", // Background color
  },
  row: {
    flexDirection: "row",
    paddingVertical: 20,
    gap:2,
    justifyContent:'space-around'
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    alignItems: "center", // Center-align each item
    justifyContent: "center",
    gap:1,
    
  },

  item1: {
    // flex:1,
    flexDirection: "row",
    alignItems: "center",
  },
  countText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  labelText: {
    fontSize: 8,
    fontWeight:'bold',
    color: "#555",
  },
  customButton: {
    borderRadius: 10,
  },
});
