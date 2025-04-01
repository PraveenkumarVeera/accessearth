import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922; // Zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const App = () => {
  const [origin] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [destination] = useState({
    latitude: 37.759703,
    longitude: -122.428093,
  });

  const GOOGLE_MAPS_APIKEY = "AIzaSyAbOeGyZybiT4ZqNksnyg8guyxxgeNK9bE"; // Replace with your API key

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {/* Origin Marker */}
        <Marker coordinate={origin} title="Origin" />

        {/* Destination Marker */}
        <Marker coordinate={destination} title="Destination" />

        {/* Draw Route */}
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="blue"
          onError={(errorMessage) => {
            console.error("Error fetching directions:", errorMessage);
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
