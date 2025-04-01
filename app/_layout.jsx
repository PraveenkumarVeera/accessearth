import { Stack } from "expo-router";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import {mappingData} from './resmap';
import CustomAppBar from '../components/CustomAppBar';
import axios from "axios";

export const context = createContext();

export default function RootLayout() {
  const [mapdata, setMapData] = useState([]);
  const [homedata, setHomedata] = useState([]);
  const [routes, setRoutes] = useState([]);
 const [routeIndex, setRouteIndex] = useState(0);
 const [availableCount, setAvailableCount] = useState(0);
 const [occupiedCount,setOccupiedCount] = useState(0);
 const [unauthorizedCount, setUnauthorizedCount] = useState(0);
 const [noDataCount, setNoDataCOunt] = useState(0);
 const [allCount, setAllCount] = useState(0);
 const [count, setCount] = useState([]);
 const [open, setOpen] = useState(false);
 const [centerLocation, setCenterLocation] = useState({
  latitude: 53.31958236694336,
  longitude: -6.2013469314575195,
  latitudeDelta: 0.2,
  longitudeDelta: 0.1,
});
const [trafficEnabled, setTrafficEnabled] = useState(false);
const [currentMapType, setCurrentMapType] = useState("standard");
const [streetViewVisible, setStreetViewVisible] = useState(false);
const [selected,setSelected] = useState('all-avail');


  const get = async () => {
    try {
      const response = await axios.get(
        "https://api-gateway.smartbrain.cellnextelecom.com/t/smartbrain.cellnextelecom/ngsi/v3/entities?type=ParkingSpot",
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer 0382f85c-ee60-351e-bf6b-6e3e69fbb1be",
          },
        }
      );

      if (response && Array.isArray(response.data)) {
        // console.log("New data:", response.data);
        const mappedDataArray = response.data.map((item) => {
          const mappedItem = mappingData(item);
          // console.log("Mapped Item:", mappedItem);
          return mappedItem;
        });
        // console.log("Mapped Data Array:", mappedDataArray);

        setMapData((prevData) => {
          if (JSON.stringify(prevData) !== JSON.stringify(mappedDataArray)) {
            return mappedDataArray;
          }
          return prevData; // Nochange, return the same state
        });
        setMapData(mappedDataArray);

        setHomedata(mappedDataArray);
      } else {
        console.error("Response data is not an array or response is undefined");
      }
    } catch (error) {
      console.log("Error in Response:", error);
    }
  };

  const getCenter = (data) => {
    try {
      let totalLongitude = 0;
      let totalLatitude = 0;
      let coordinateCount = 0;

      data.forEach((element) => {
        const [longitude, latitude] = element.geometry.coordinates;

        totalLongitude += longitude;
        totalLatitude += latitude;
        coordinateCount += 1;
      });

      const centerLongitude = totalLongitude / coordinateCount;
      const centerLatitude = totalLatitude / coordinateCount;

      // setCenterLocation({
      //   latitude: centerLatitude,
      //   longitude: centerLongitude,
      //   latitudeDelta: 0.2, 
      //   longitudeDelta: 0.1,
      // });
      setCenterLocation({latitude: 53.31958236694336,longitude: -6.2013469314575195,latitudeDelta: 0.2,longitudeDelta: 0.1,});
    } catch (error) {
      console.log(error);
    }   
  };

  useEffect(() => {
    get();
    getCenter(mapdata);
  }, []);

  const totalCount = () => {
    let availableCount = 0;
    let occupiedCount = 0;
    let unathorized =0;
    let noData =0;

    mapdata?.forEach((element) => {
      const { max_capacity, num_spaces_occupied,authSts,status } = element.properties;

      if (max_capacity > num_spaces_occupied) {
        availableCount += max_capacity - num_spaces_occupied;
      }

      if (num_spaces_occupied > 0) {
        occupiedCount += num_spaces_occupied;
      }

      if (status === 'occupied' &&  authSts === "Occupied and not authorized"){
        unathorized += 1;
      }

    });

    setAvailableCount(availableCount);
    setOccupiedCount(occupiedCount);
    setUnauthorizedCount(unathorized);
    setNoDataCOunt(noData);
    setAllCount(availableCount+occupiedCount+unathorized+noData)
  };

  const filterCount = (value) => {    
    
    console.log("valueee", value);

    let availableCount = 0;
    let occupiedCount = 0;

    if (value === "all") {
      // Call totalCount and exit early to avoid resetting counts later
      totalCount();
      return;
    }

    mapdata?.forEach((element) => {
      const { max_capacity, num_spaces_occupied, parking_bay_type } =
        element.properties;

      // Check if the parking bay type is 'ev_charging'
      if (parking_bay_type === value) {
        // Calculate available spaces
        if (max_capacity > num_spaces_occupied) {
          availableCount += max_capacity - num_spaces_occupied;
        }

        // Calculate occupied spaces
        if (num_spaces_occupied > 0) {
          occupiedCount += num_spaces_occupied;
        }
      }
    });

    console.log("Available EV Spaces:", availableCount);
    console.log("Occupied EV Spaces:", occupiedCount);

    setAvailableCount(availableCount);
    setOccupiedCount(occupiedCount);
  };

  useEffect(() => {  
      totalCount();
  }, [mapdata]);

   const toggleDrawer = () => {
      setOpen(!open);
    };
  
console.log(open);

  return (
    <Provider store={store}>
      <context.Provider value={{ homedata, mapdata , setAvailableCount,setOccupiedCount,availableCount,occupiedCount,unauthorizedCount,noDataCount,allCount, filterCount,centerLocation,routes,setRoutes,routeIndex,setRouteIndex,open,setOpen,toggleDrawer,setTrafficEnabled,trafficEnabled,setCurrentMapType,currentMapType,streetViewVisible,setStreetViewVisible,setSelected,selected }}>
        <Stack
          // screenOptions={{
          //   header : () => <CustomAppBar/>
          // }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="Camera" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </context.Provider>
    </Provider>
  );
}
