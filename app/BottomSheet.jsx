import React, { useContext, useRef, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { context } from "./_layout";
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setAvailability,
  setBayType,
  setError,
  setLiveLocation,
  setStyle, } from '.././redux/homeaction';
import {
  setCenter,
  setDashCenter,
  setDestination,
  setZoom,
} from ".././redux/mapaction";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Bottom() {
  const refRBSheet = useRef();
  const { filterCount,centerLocation,setSelected} = useContext(context);
  const [selectedBayType, setSelectedBayType] = useState("all");
    const [selectedAvailability, setSelectedAvailability] = useState("all-avail");
    const [selectedButton,setSelectedButton] = useState(null);

     const dispatch = useDispatch();

  const handleBayTypeChange = (value) => {
        console.log('value',value);
        
      setSelectedBayType(value);
  
      dispatch(setBayType(value));
  
      dispatch(setDashCenter(null));
      dispatch(setLiveLocation(null));
  
      if (value === "ev_charging") {
        // setSelectedAvailability("all-avail");
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
        // setSelectedAvailability("all-avail");
        dispatch(setAvailability(null));
        // dispatch(setZoom(15));
        // dispatch(
        //   setCenter({
        //     lat: 53.29258236694336,
        //     lng: -6.1413469314575195,
        //   })
        // );
        dispatch(setZoom(12))
        dispatch(setCenter({latitude: centerLocation.latitude, 
          longitude: centerLocation.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.1, }))
      }
  
      if (value === "all") {
        // setSelectedAvailability("all-avail");
        setSelected('all-avail')
        dispatch(setBayType('all'));
        // dispatch(setZoom(13.1));
        dispatch(setZoom(12));
        dispatch(setAvailability(null));
        dispatch(setCenter({latitude: centerLocation.latitude, 
          longitude: centerLocation.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.1, }))
      }
    }; 
  
    const handleAvailabilityChange = (value) => {
  
      console.log("valueee", value, selectedBayType);
      setSelectedAvailability(value);
  
      if (value === "available" && selectedBayType === "ev_charging") {
        dispatch(setAvailability("ev_available"));
      } else if (value === "unathorized") {
        dispatch(setAvailability("unathorized"));
      }    
      else if (value === "occupied" && selectedBayType === "ev_charging") {
        dispatch(setAvailability("ev_occupied"));
      } else if (value === "available" && selectedBayType === "accessibility") {
        dispatch(setAvailability("normal_available"));
      } else if (value === "occupied" && selectedBayType === "accessibility") {
        dispatch(setAvailability("normal_occupied"));
      } else if (value === "available" && selectedBayType === "all") {
        dispatch(setAvailability("all_available"));
      } else if (value === "occupied" && selectedBayType === "all") {
        dispatch(setAvailability("all_occupied"));
      } else if (value === "all-avail" && selectedBayType === "all" ) {
        dispatch(setBayType(null));
        // dispatch(setZoom(13.1));
        dispatch(setZoom(12))
        dispatch(setAvailability(null));
        dispatch(setCenter({latitude: centerLocation.latitude, 
          longitude: centerLocation.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.1, }));
      } 
      else if (value === "all-avail" && selectedBayType === "ev_charging") {
        dispatch(setAvailability(null));
      } else if (value === "all-avail" && selectedBayType === "accessibility") {
        dispatch(setAvailability(null));
      }  else if (value === "nosignal") {
        dispatch(setAvailability("nosignal"));
      }
    };

  return (
    <View style={styles.container}>
      <MaterialIcons
        name="drag-handle"
        size={50}
        color="#000"
        onPress={() => refRBSheet.current.open()}
      />

      {/* Bottom Sheet Component */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true} // Allow swipe down to close
        closeOnPressMask={true} // Close when pressing outside the sheet
        height={150} // Height of the drawer
        openDuration={250} // Animation duration
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)", // Overlay color
          },
          draggableIcon: {
            backgroundColor: "#000", // Color of the drag icon
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        {/* Content of the Bottom Drawer */}
        <View style={styles.drawerContent}>
        <View style={{flex:1,gap:2}}>
        
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
        
       
        {/* <View style={styles.box2}>
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
        </View> */}
  
        </View>
        </View>
       
      </RBSheet>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
  },
  drawerContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  box1: {
    flex: 2, // Equal space for each box
    padding: 10, // Space inside the box
    justifyContent:'center',
    borderWidth: 1, // Border for the box
    borderColor: '#ccc', // Border color
    borderRadius: 10, // Rounded corners
    backgroundColor: '#fff', // Background color
  },
  box2: {
    flex: 3, // Equal space for each box
    padding: 10, // Space inside the box
    justifyContent:'center',
    borderWidth: 1, // Border for the box
    borderColor: '#ccc', // Border color
    borderRadius: 10, // Rounded corners
    backgroundColor: '#fff', // Background color
  },
  row1: {
    flexDirection: 'row', 
    justifyContent:'space-between', 
  },item1:{
    // flex:1, 
    flexDirection: 'row',
    alignItems:'center',      
},
labelText: {
    fontSize: 12,
    color: '#555',
  },
});
