import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import MapComponent from '../MapComponent'
import SideBar from '../SideBar';
import Ionicons from '@expo/vector-icons/Ionicons'
import { Divider, Menu, PaperProvider, Provider } from 'react-native-paper'
import { useRouter } from 'expo-router'
import Bottom from '../BottomSheet';
import { useDispatch } from 'react-redux';
import { setStyle } from '@/redux/homeaction';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const index = () => {
  const router = useRouter();
    const refRBSheet = useRef(); 
  const [visible, setVisible] = useState(false);
  const [iconStyle, setIconStyle] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // Simulate a refresh (replace with your actual logic)
    setTimeout(() => {
      setRefreshing(false);
      console.log("Screen Refreshed!"); // You can reload map or location data here
    }, 1500);
  };

  const dispatch = useDispatch();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleToggle = () => {
      setIconStyle((prev) => !prev);
      dispatch(setStyle(!iconStyle));
    };

 const logout = () => {
  
 }

  return (
    
    <Provider>
    <View style={{flex:1}}>
    {/* <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    > */}
       <View style={styles.appBar}>
      <Image
        source={require("../../assets/images/Access_Earth_Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
        
      <View style={{ flex: 1,justifyContent: "center",alignItems: "flex-end",}}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style ={{position:'absolute',top:50,left:280}}
          anchor={ <TouchableOpacity onPress={openMenu}>
            <Ionicons name="menu" size={24} color="#25292e" />
          </TouchableOpacity>}>
          <Menu.Item onPress={()=>{closeMenu();handleToggle()}} title="Change Icon" />
          <Divider />
          <Menu.Item onPress={() => {logout()}} title="LogOut" />
        </Menu>
        </View>
       </View>
       <View style={{flex:1}}>
       <View style={{flex:0.9}}>
      <MapComponent />
      </View>
      <View style={{flex:0.2}}>
      <SideBar/>
      </View>
      <View style={{flex:0.06}}>
      <Bottom value={refRBSheet.current}/>
      </View>
      </View>
      {/* </ScrollView> */}
    </View>
    </Provider>
  )
}

export default index

const styles = StyleSheet.create({
  appBar: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  logo: {
    width: "40%",
    height: 40,
  },
})

