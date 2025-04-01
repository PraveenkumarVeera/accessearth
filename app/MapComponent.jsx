import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MapView, { Heatmap, Marker, Polyline } from "react-native-maps";
import {
  Button,
  Dimensions,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AvailableSVG from "../assets/SVG/AvailableSVG";
import AvailableSVG1 from "../assets/SVG/AvailableSVG1";
import Ev_availableSVG from "../assets/SVG/Ev_availableSVG";
import Ev_availableSVG1 from "../assets/SVG/Ev_availableSVG1";
import OccupiedSvg from "../assets/SVG/OccupiedSvg";
import OccupiedSvg1 from "../assets/SVG/OccupiedSVG1";
import UnauthorizedSVG from "../assets/SVG/UnauthorizedSVG";
import UnauthorizedSVG1 from "../assets/SVG/UnauthorizedSVG1";
import NoDataSVG from "../assets/SVG/NoDataSVG";
import NoDataSVG1 from "../assets/SVG/NoDataSVG1";
import StreetViewIcon from "../assets/Icons/StreetViewIcon";
import LiveLocationIcon from "../assets/Icons/LiveLocationIcon";
import { useDispatch, useSelector } from "react-redux";
import { setLiveLocation, setStyle } from "@/redux/homeaction";
import Svg, { Circle, Line } from "react-native-svg";
import { context } from "./_layout";
import { setCenter, setDestination, setZoom } from "@/redux/mapaction";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
// import DrawerCom from "./(tabs)/DrawerCom";
import { WebView } from "react-native-webview";
import Sheet from "./Sheet";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import "react-native-get-random-values";
import * as Speech from "expo-speech";
import { IconButton } from "react-native-paper";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const {
    mapdata,
    homedata,
    centerLocation,
    routes,
    setRoutes,
    routeIndex,
    setRouteIndex,
    trafficEnabled,
    currentMapType,
    streetViewVisible
  } = useContext(context);
  const [markers, setMarkers] = useState([]);
  const [error, setError] = useState(null);
  const [watchSubscription, setWatchSubscription] = useState(null);
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [infoWindowContent, setInfoWindowContent] = useState("");
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [isLiveLocationEnabled, setIsLiveLocationEnabled] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isCamOpen,setIsCamOpen] = useState(false);

  const GOOGLE_MAPS_APIKEY = "AIzaSyCYfXie0s3YubY5WZr_DTwB6elE9ypFzKA";

  const switchRoute = (index) => {
    setSelectedRoute(index);
  };

  const speak = () => {
    Speech.speak("Hello! This is text-to-speech in Expo React Native.");
  };

  const dispatch = useDispatch();

  const { liveLocation, bayType, availability, isStyle } = useSelector(
    (state) => state.HomeReducer
  );
  const { center, zoom, dashvalue, dashcenter, destination } = useSelector(
    (state) => state.MapReducer
  );

  const [turnByTurnSteps, setTurnByTurnSteps] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  
  const fetchRoutes = async () => {
    if (!liveLocation || !destination) return;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${liveLocation.latitude},${liveLocation.longitude}&destination=${destination.latitude},${destination.longitude}&mode=driving&key=${GOOGLE_MAPS_APIKEY}&alternatives=true`
      );
      const data = await response.json();

      if (data.routes) {
        setRoutes(data.routes);
        setRouteIndex(0); // Default to the first route

        const steps = data.routes[0].legs[0].steps.map(step => ({
          instruction: step.html_instructions.replace(/<[^>]+>/g, ""), // Remove HTML tags
          distance: step.distance.text, // e.g., "200 m"
        }));
  
        setTurnByTurnSteps(steps);
      }
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  const speakTurnByTurnInstructions = async () => {
  if (turnByTurnSteps.length === 0) return;

  for (let i = 0; i < turnByTurnSteps.length; i++) {
    const { instruction, distance } = turnByTurnSteps[i];
    const message = `${instruction} in ${distance}.`; // e.g., "Turn left onto Main St in 200 meters."
    await Speech.speak(message, { language: 'en' });

    // Wait for a few seconds before speaking the next instruction
    await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay
  }
};
  
const handleSpeakTurnByTurn = async () => {
  if (isSpeaking) {
    // If already speaking, stop the TTS
    Speech.stop();
    setIsSpeaking(false);
  } else {
    // Start speaking the turn-by-turn instructions
    setIsSpeaking(true);
    await speakTurnByTurnInstructions();
    setIsSpeaking(false); // Reset speaking state when done
  }
};
  
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);
  

  const get = () => {
    try {
      const updatedData = {
        geometry: {
          type: "Point",
          coordinates: [-6.201365739707778, 53.28800133759479],
        },
        properties: {
          id: 1,
          name: "Unauthorized TestMarker",
          status: "occupied",
          num_spaces_occupied: 1,
          parking_bay_type: "",
          max_capacity: 1,
          authSts: "Occupied and not authorized",
          tokenBatSts: "ok",
        },
      };

      const updatedData1 = {
        geometry: {
          type: "Point",
          coordinates: [-6.18534693145752, 53.2945823669434],
        },
        properties: {
          id: 2,
          name: "NoSignal TestMarker",
          status: "noData",
          num_spaces_occupied: 0,
          parking_bay_type: "",
          max_capacity: 1,
          authSts: "",
          tokenBatSts: "",
        },
      };

      const newMapData = [...mapdata, updatedData, updatedData1];
      //   console.log("updatedData", newMapData);

      const newMarkers = newMapData?.map((feature) => {
        const coordinates = feature.geometry.coordinates;
        const props = feature.properties;

        return { lat: coordinates[1], lng: coordinates[0], ...props };
      });
      setMarkers(newMarkers);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const centerMap = () => {
    try {
      if (dashvalue) {
        dispatch(setZoom(19));
      } else if (centerLocation.latitude && centerLocation.longitude) {
        dispatch(
          setCenter({
            latitude: centerLocation.latitude,
            longitude: centerLocation.longitude,
            latitudeDelta: centerLocation.latitudeDelta,
            longitudeDelta: centerLocation.longitudeDelta,
          })
        );
        dispatch(setZoom(12));
      } else {
        console.log("Centering skipped due to missing location data.");
      }
    } catch (error) {
      console.log("centering Error", error);
    }
  };

  useEffect(() => {
    centerMap();
  }, [centerLocation]);

  useEffect(() => {
    get();
  }, [mapdata]);

  useEffect(() => {
    if (liveLocation && destination) {
      fetchRoutes();
    }
  }, [liveLocation, destination]);

  const handleMarkerClick = useCallback((marker) => {
    console.log("markerrrrrr", marker.lat);

    // setSelectedMarker(marker);

    dispatch(
      setDestination({
        latitude: marker.lat,
        longitude: marker.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
    );
    setInfoWindowShown((isShown) => !isShown);
    setInfoWindowContent({
      Name: marker.name,
    });
    setInfoWindowPosition({
      latitude: marker.lat,
      longitude: marker.lng,
      latitudeDelta: 0.2,
      longitudeDelta: 0.1,
    });
    dispatch(
      setCenter({
        latitude: marker.lat,
        longitude: marker.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
    );
    dispatch(setZoom(16));
  }, []);

  const startLiveLocation = async () => {
    try {
      // Request permissions to access location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      // Start watching location
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update location every 5 seconds
          distanceInterval: 10, // Update when the user moves by 10 meters
        },
        (location) => {
          dispatch(
            setLiveLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              // latitude: 53.28458236694336,
              // longitude: -6.1813469314575195,
              latitudeDelta: 0.0,
              longitudeDelta: 0.0,
            })
          );
          dispatch(setCenter({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            // latitude: 53.28458236694336,
            // longitude: -6.1813469314575195,
            latitudeDelta: 0.1,
            longitudeDelta: 0.01,
          }));
        }
      );  
      // Save the subscription to state for cleanup
      setWatchSubscription(subscription);
      setIsLiveLocationEnabled(true);
    } catch (err) {
      console.error("Error starting live location:", err);
      setError("Failed to start live location");
    }
  };

  // useEffect(() => {
  //   if (liveLocation) {
  //     dispatch(setCenter(liveLocation));
  //   }
  // }, [liveLocation]);

  const stopLiveLocation = () => {
    if (watchSubscription) {
      watchSubscription.remove(); // Stop watching location
      setWatchSubscription(null);
      setIsLiveLocationEnabled(false);
      dispatch(setLiveLocation(null));
      dispatch(setDestination(null));
      centerMap();
      //   dispatch(setCenter({latitude: 53.31958236694336,
      //     longitude: -6.2013469314575195,
      //     latitudeDelta: 0.2,
      //     longitudeDelta: 0.1,}));
    }
  };

  const handleLiveLocationToggle = () => {
    setSelectedLocation(null);
    if (isLiveLocationEnabled) {
      stopLiveLocation();
    } else {
      startLiveLocation();
    }
  };

  const onCamera = () => {
       
  }

  const EvavailableIcon = isStyle ? <Ev_availableSVG1 /> : <Ev_availableSVG />;

  const AvailableIcon = isStyle ? <AvailableSVG1 /> : <AvailableSVG />;

  const OccupiedIcon = isStyle ? <OccupiedSvg1 /> : <OccupiedSvg />;

  const UnauthorizedIcon = isStyle ? <UnauthorizedSVG1 /> : <UnauthorizedSVG />;

  const NodataIcon = isStyle ? <NoDataSVG1 /> : <NoDataSVG />;

  // const toggleTraffic = () => {
  //   setTrafficEnabled((prevState) => !prevState);
  // };

  // const [streetViewVisible, setStreetViewVisible] = useState(false);
  const [streetViewCoordinates, setStreetViewCoordinates] = useState({
    latitude: "37.7749",
    longitude: "-122.4194",
  });

  // const toggleStreetView = (coordinates) => {
  //   setStreetViewCoordinates(coordinates || streetViewCoordinates);
  //   setStreetViewVisible(!streetViewVisible);
  // };

  const placesRef = useRef(null);

  return (

    <View style={styles.container}>

      {mapdata?.length > 0 ? (
        streetViewVisible ? (
          <WebView
            style={styles.webview}
            source={{
              uri: `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${streetViewCoordinates.latitude},${streetViewCoordinates.longitude}`,
            }}           
          />
        ) : (
          <View style={styles.mapWrapper}>

     <GooglePlacesAutocomplete
        ref={placesRef}
        placeholder="Search for a location"
        minLength={2}
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details) {
            const { lat, lng } = details.geometry.location;
            setSelectedLocation({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            });
          }
        }}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.input,
          listView: styles.listView,
        }}
        // renderRightButton={() => (
        //   <TouchableOpacity onPress={() => placesRef.current?.setAddressText("")}>
        //     <Text style={{ fontSize: 18, marginRight: 10 }}>✖</Text>
        //   </TouchableOpacity>
        // )}
        
      />
             
            <MapView
              region={selectedLocation || center}
              style={styles.map}
              mapType={currentMapType}
              showsTraffic={trafficEnabled}
            >
              {liveLocation && (
                <Marker
                  coordinate={liveLocation}
                  title="You are here"
                  pinColor="red"
                />
              )}

{selectedLocation && (<Marker coordinate={selectedLocation} title="Selected Location"  onPress={() => handleMarkerClick({
      lat: selectedLocation.latitude,
      lng: selectedLocation.longitude,
      name: "Selected Location"
    })}/>)}
             
              {markers
                ?.filter((marker) => {
                  if (availability === "unathorized") {
                    return (
                      marker.status === "occupied" &&
                      marker.authSts === "Occupied and not authorized"
                    );
                  }

                  if (availability === "nosignal") {
                    return marker.status === "noData";
                  }

                  // Handle general availability conditions
                  if (availability === "all_available") {
                    return marker.num_spaces_occupied === 0;
                  }

                  if (availability === "all_occupied") {
                    return marker.num_spaces_occupied === 1;
                  }

                  // Check bay type compatibility
                  const isCorrectBayType =
                    bayType === null ||
                    bayType === "all" ||
                    marker.parking_bay_type === bayType;

                  // Check availability based on bay type
                  const isAvailableOrOccupied =
                    bayType === "ev_charging"
                      ? availability === "ev_available"
                        ? marker.num_spaces_occupied === 0
                        : availability === "ev_occupied"
                        ? marker.num_spaces_occupied === 1
                        : true
                      : bayType === "accessibility"
                      ? availability === "normal_available"
                        ? marker.num_spaces_occupied === 0
                        : availability === "normal_occupied"
                        ? marker.num_spaces_occupied === 1
                        : true
                      : true; // Default for "all" bay types

                  // Return true only if both conditions are met
                  return isCorrectBayType && isAvailableOrOccupied;
                })
                .map((marker, index) => {
                  let svgIcon;

                  if (
                    marker.status === "occupied" &&
                    marker.authSts === "Occupied and not authorized"
                  ) {
                    svgIcon = UnauthorizedIcon;
                  } else if (marker.parking_bay_type === "ev_charging") {
                    svgIcon =
                      marker.num_spaces_occupied === 0
                        ? EvavailableIcon
                        : OccupiedIcon;
                  } else if (marker.parking_bay_type === "accessibility") {
                    svgIcon =
                      marker.num_spaces_occupied === 0
                        ? AvailableIcon
                        : OccupiedIcon;
                  } else if (marker.status === "noData") {
                    svgIcon = NodataIcon;
                  } else {
                    svgIcon =
                      marker.num_spaces_occupied === 0 ? (
                        <Svg
                          width="30"
                          height="30"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <Circle
                            cx="8"
                            cy="8"
                            r="7"
                            stroke="#006425"
                            strokeWidth="1"
                            fill="green"
                          />
                          <Text
                            x="8"
                            y="12"
                            fill="red"
                            fontSize="10"
                            textAnchor="middle"
                            fontWeight="bold"
                          >
                            P
                          </Text>
                        </Svg>
                      ) : (
                        <Svg
                          width="30"
                          height="30"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <Circle
                            cx="8"
                            cy="8"
                            r="7"
                            stroke="black"
                            strokeWidth="1"
                            fill="black"
                          />
                          <Text
                            x="8"
                            y="12"
                            fill="red"
                            fontSize="10"
                            textAnchor="middle"
                            fontWeight="bold"
                          >
                            P
                          </Text>
                        </Svg>
                      );
                  }

                  return (
                    <Marker
                      key={index}
                      coordinate={{
                        latitude: marker.lat,
                        longitude: marker.lng,
                      }}
                      onPress={
                        marker.num_spaces_occupied === 0
                          ? () => handleMarkerClick(marker)
                          : null
                      }
                      title={`Id: ${marker.id}, Name: ${marker.name}, Status: ${marker.status}, Auth Status: ${marker.authSts}, Battery Status: ${marker.tokenBatSts}`}
                    >
                      {svgIcon}
                    </Marker>
                  );
                })}

              {liveLocation && destination && routes?.length > 0 && (
                <Polyline
                  coordinates={routes[routeIndex].legs[0].steps.map((step) => ({
                    latitude: step.start_location.lat,
                    longitude: step.start_location.lng,
                  }))}
                  strokeColor="blue"
                  strokeWidth={4}
                  tappable
                />
              )}
              
            </MapView>
          </View>
        )
      ) : null}

      {/* <View style={styles.toggleButton}>
        <TouchableOpacity
          onPress={() => setStreetViewVisible(!streetViewVisible)}
        >
          <Text style={styles.toggleButtonText}>
            {streetViewVisible ? "Back to Map" : <StreetViewIcon />}
          </Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.mapOptions}>
        <Sheet />
      </View>

      {liveLocation && destination && routes?.length > 1 && (
        <View style={styles.routeSwitcher}>
          {routes.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.routeButton,
                routeIndex === index && styles.selectedRouteButton,
              ]}
              onPress={() => setRouteIndex(index)}
            >
              <Text style={styles.routeButtonText}>Route {index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={styles.liveLocation}>
        <TouchableOpacity onPress={handleLiveLocationToggle}>
          <LiveLocationIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.camera}>
        {/* <TouchableOpacity onPress={handleLiveLocationToggle}>
          <LiveLocationIcon />
        </TouchableOpacity> */}
        <IconButton icon={'camera'} size={30} iconColor="#1976D2" onPress={() => router.push("/Camera")}/>
      </View>

      <Button
  title={isSpeaking ? "Stop Turn-by-Turn" : "Start Turn-by-Turn"}
  onPress={handleSpeakTurnByTurn}
/>

      {/* <View style={styles.maptype}>    
      <View style={{backgroundColor:'#FFFFFF',borderRadius:5}}>
        <TouchableOpacity onPress={()=> setCurrentMapType('standard')}>
          <Text style={{fontWeight:"500",color:'black',padding:5}}>Map</Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor:'#FFFFFF',borderRadius:5}}>
        <TouchableOpacity onPress={()=> setCurrentMapType('satellite')}>
          <Text style={{fontWeight:"500",color:'#575757',padding:5,borderRadius:10}}>Satellite</Text>
        </TouchableOpacity>
      </View>
    </View> */}

      {/* <View style={styles.switchContainer}>
        <TouchableOpacity onPress={toggleTraffic}>
          <Text style={{fontWeight:"500",color:'#575757',padding:5}}>Show Traffic</Text>
        </TouchableOpacity>   
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapWrapper: {
    flex: 1,
    overflow: "hidden", // Ensures the corners are clipped
    borderBottomLeftRadius: 30, // Adjust the radius as needed
    borderBottomRightRadius: 30, // Adjust the radius as needed
  },
  liveLocation: {
    position: "absolute",
    top: 150,
    right: -10,
    width: 64,
    height: 64,
  },
  camera: {
    position: "absolute",
    bottom: 50,
    right: 0,
    width: 64,
    height: 64,
  },
  maptype: {
    flexDirection: "row",
    position: "absolute",
    left: 6,
    top: 10,
    gap: 5,
  },
  routeSwitcher: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
  },
  routeButton: {
    marginHorizontal: 5,
    padding: 5,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  selectedRouteButton: {
    backgroundColor: "#1976D2",
  },
  routeButtonText: { color: "white" },
  switchContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  webview: {
    flex: 1,
    width: width,
    height: height,
  },
  toggleButton: {
    position: "absolute",
    bottom: 10,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  toggleButtonText: {
    color: "grey",
    fontWeight: "bold",
  },
  mapOptions: {
    position: "absolute",
    top: 80,
    right: 20,
    backgroundColor: "#575757",
    borderRadius: 20,
    padding: 1,
  },
  autocompleteContainer: {
    position: "absolute",
    top: 5,
    left: 10,
    right: 10,
    zIndex: 1,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  listView: {
    backgroundColor: "#fff",
  },
});
