import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { useRef, useState, useEffect } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  BackHandler,
} from "react-native";
import { Image } from "expo-image";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";

export default function Camera() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions(); 
  const ref = useRef(null);
  const [photouri, setphotoUri] = useState(null);
  const [videouri, setvideoUri] = useState(null);
  const [mode, setMode] = useState("picture");
  const [facing, setFacing] = useState("back");
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
   const handleBackPress = () => {
    if (photouri) {
      setphotoUri(null); // Go back to camera view
      return true; // Prevent default back action
    }
    return false; // Allow default back action if no image is captured
  };

  BackHandler.addEventListener("hardwareBackPress", handleBackPress);
  return () => BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
   
  }, [photouri]);

  if (!cameraPermission || !microphonePermission) {
    return null;
  }

  if (!cameraPermission.granted || !microphonePermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button onPress={async () => {
          await requestCameraPermission();
          await requestMicrophonePermission();
        }} 
        title="Grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    try {
      const photo = await ref.current?.takePictureAsync();
      console.log('photo captured :',photo);  
      setphotoUri(photo?.uri);
      await MediaLibrary.saveToLibraryAsync(photo.uri);
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };



  const recordVideo = async () => {    
    if (recording) {
      console.log('Stopping recording...');
      setRecording(false);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      ref.current?.stopRecording();
      return;
    }
  
    console.log('Starting recording...');
    setRecording(true);
    setTimer(0);

    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    if (!ref.current) {
      console.error("Camera not available!");
      return;
    }
  
    try {
      const video = await ref.current.recordAsync();
      console.log('Video recorded:', video);
      setvideoUri(video?.uri)
      await MediaLibrary.saveToLibraryAsync(video?.uri);
    } catch (error) {
      console.error("Error recording video:", error);
    }
    finally{
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  return (
    <View style={styles.container}>
      {photouri ? (
        <View>
          <Image
            source={{ photouri }}
            contentFit="contain"
            style={{ width: 300, aspectRatio: 1 }}
          />
        </View>
      ) : (
        <CameraView
          style={styles.camera}
          ref={ref}
          mode={mode}
          facing={facing}
          flash="auto"
          mute={false}
          responsiveOrientationWhenOrientationLocked
        >
          {recording && <Text style={styles.timer}>{timer} sec</Text>}
          <View style={styles.shutterContainer}>
            <Pressable onPress={toggleMode}>
              {mode === "picture" ? (
                <AntDesign name="picture" size={32} color="white" />
              ) : (
                <Feather name="video" size={32} color="white" />
              )}
            </Pressable>
            <Pressable onPress={mode === "picture" ? takePicture : recordVideo}>
              {({ pressed }) => (
                <View
                  style={[
                    styles.shutterBtn,
                    {
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.shutterBtnInner,
                      {
                        backgroundColor: mode === "picture" ? "white" : "red",
                      },
                    ]}
                  />
                </View>
              )}
            </Pressable>
            <Pressable onPress={toggleFacing}>
              <FontAwesome6 name="rotate-left" size={32} color="white" />
            </Pressable>
          </View>

        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  timer: {
    position: "absolute",
    top: 20,
    left: "50%",
    transform: [{ translateX: -30 }],
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
});
