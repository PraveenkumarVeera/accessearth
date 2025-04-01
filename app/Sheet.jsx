import React, { useContext, useRef, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
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
import DefaultView from '../assets/Icons/Default';
import Satellite from '../assets/Icons/Satellite';
import TrafficView from '../assets/Icons/Traffic';
import Street from '../assets/Icons/Street';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Sheet() {
  const refRBSheet = useRef();
  const {centerLocation,setTrafficEnabled,setCurrentMapType,setStreetViewVisible,streetViewVisible} = useContext(context);
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
        dispatch(setZoom(12))
        dispatch(setCenter({latitude: centerLocation.latitude, 
          longitude: centerLocation.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.1, }))
      }
  
      if (value === "all") {
        setSelectedAvailability("all-avail");
        dispatch(setBayType(null));
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

    const toggleTraffic = () => {
      setTrafficEnabled((prevState) => !prevState);
    };

    const defaultMap = () => {
      setCurrentMapType('standard')
    }

    const satelliteMap = () => {
      setCurrentMapType('satellite')
    }

    const toggleStreet = () => {
            setStreetViewVisible(!streetViewVisible)
    }

  return (
    <View style={styles.container}>
     <MaterialCommunityIcons
      name="layers-outline"
      size={30}
      color="#fff"
      onPress={() => refRBSheet.current.open()}
    />

      {/* Bottom Sheet Component */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true} // Allow swipe down to close
        closeOnPressMask={true} // Close when pressing outside the sheet
        height={200} // Height of the drawer
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
        <View style={{flex:1}}>
       
       
  <Text style={{color:'#fff',fontWeight:'bold',marginBottom:10}}>Map type</Text>
  <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
  <TouchableOpacity onPress={defaultMap} style={{ }}>
    <DefaultView />
    <Text style={{textAlign:'center',color:'#fff'}}>Default</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={satelliteMap} style={{ }}>
    <Satellite/>
    <Text style={{textAlign:'center',color:'#fff'}}>Satellite</Text>
  </TouchableOpacity> 
  <TouchableOpacity onPress={toggleTraffic} style={{}}>
    <TrafficView />
    <Text style={{textAlign:'center',color:'#fff'}}>Traffic</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={toggleStreet} style={{ }}>
    <Street/>
    <Text style={{textAlign:'center',color:'#fff'}}>Street</Text>
  </TouchableOpacity> 

</View>
{/* <View style={{ flexDirection: 'row'}}>
  
  <TouchableOpacity onPress={toggleStreet} style={{ }}>
    <Street/>
    <Text style={{textAlign:'center',color:'#fff'}}>Street</Text>
  </TouchableOpacity> 
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
    backgroundColor: "#3B3B3B",
  },
});
