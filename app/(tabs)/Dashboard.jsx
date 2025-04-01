import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import MapView, { Heatmap } from 'react-native-maps'
import { context } from '../_layout';

const Dashboard = () => {
    const { centerLocation} = useContext(context);

    const heatmapPoints = [
      { latitude: 53.34780279412074, longitude: -6.241880723838637, weight: 1 },
      { latitude: 53.30506366324072, longitude: -6.2298154452034515, weight: 1 },
      { latitude: 53.29534144709883, longitude: -6.162399935996529, weight: 1 },
      { latitude:  53.26938291918817, longitude: -6.108176120651206, weight: 1 },
    ];
  
  return (
    <View style={styles.container}>
      <View style={{flex:0.1,justifyContent:'center',alignItems:'center'}}>
         <Text style={{fontWeight:'800'}}>Heat Map</Text>
      </View>
      <MapView
        style={styles.map}
        region={{
          latitude: 53.31958236694336,
          longitude: -6.2013469314575195,
          latitudeDelta: 0.2,
          longitudeDelta: 0.1,
        }}
      >
        {/* Heatmap Component */}
        <Heatmap
          points={heatmapPoints}
          opacity={0.7}
          radius={50}
          maxIntensity={100}
          gradient={{
            colors: ['#00F', '#0FF', '#0F0', '#FF0', '#F00'],
            startPoints: [0.01, 0.25, 0.5, 0.75, 1],
            colorMapSize: 256,
          }}
        />
      </MapView>

    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the View take the full screen
  },
  map: {
    flex: 0.9, // Makes the MapView take the full space of the parent View
  },
})