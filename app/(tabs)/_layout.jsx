import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomAppBar from '../../components/CustomAppBar';
import { createContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {mappingData} from '../resmap';

export const context = createContext();

export default function TabLayout() {

  const [mapdata, setMapData] = useState([]);
    const [homedata,setHomedata] = useState([]);

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
  
  useEffect(()=>{
       get();
  },[])  

  const contextValue = useMemo(() => ({ homedata, mapdata }), [mapdata, homedata]);

  return (
    <context.Provider value={{ homedata, mapdata }}>
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        // header: () => <CustomAppBar />,
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
        
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        headerShown:false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: 'HeatMap',
          headerShown:false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
       
    </Tabs>

     </context.Provider>
  );
}