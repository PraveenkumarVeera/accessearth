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
  ScrollView,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { Video } from "expo-av";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";

export default function Camera() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const ref = useRef(null);
  const [photoList, setPhotoList] = useState([]);
  const [currentPhotoUri, setCurrentPhotoUri] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [currentVideoUri, setCurrentVideoUri] = useState(null);
  const [mode, setMode] = useState("picture");
  const [facing, setFacing] = useState("back");
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleBackPress = () => {
      if (currentPhotoUri || currentVideoUri) {
        setCurrentPhotoUri(null);
        setCurrentVideoUri(null);
        return true;
      }
      return false;
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, [currentPhotoUri, currentVideoUri]);

  if (!cameraPermission || !microphonePermission) return null;

  if (!cameraPermission.granted || !microphonePermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button
          title="Grant permission"
          onPress={async () => {
            await requestCameraPermission();
            await requestMicrophonePermission();
          }}
        />
      </View>
    );
  }

  const takePicture = async () => {
    if (photoList.length >= 10) {
      Alert.alert("Limit reached", "You can only take up to 10 photos.");
      return;
    }

    try {
      const photo = await ref.current?.takePictureAsync();
      if (photo?.uri) {
        setCurrentPhotoUri(photo.uri);
        await MediaLibrary.saveToLibraryAsync(photo.uri);
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  const confirmPhoto = () => {
    setPhotoList((prev) => [...prev, currentPhotoUri]);
    setCurrentPhotoUri(null);
  };

  const getFileNameFromUri = (uri) => {
    return uri?.split("/").pop();
  };

  const sendAllPhotos = async () => {
    if (photoList.length === 0) {
      Alert.alert("No photos", "Please take at least one photo before sending.");
      return;
    }

    const formData = new FormData();
    photoList.forEach((uri, index) => {
      formData.append("files", {
        uri,
        type: "image/jpeg",
        name: getFileNameFromUri(uri) || `photo_${index}.jpg`,
      });
    });

    try {
      const response = await axios.post(
        "https://testapiappcore-g8g4apd7gdcfeybz.ukwest-01.azurewebsites.net/api/Image/uploadImages/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Photos uploaded successfully:", response.data);
      Alert.alert("Success", "Photos uploaded successfully.");
      setPhotoList([]);
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Failed to upload photos.");
    }
  };

  const takeVideo = async () => {
    if (recording) {
      // Stop recording
      try {
        const video = await ref.current?.stopRecording();
        clearInterval(intervalRef.current);
        setRecording(false);
        setTimer(0);
        if (video?.uri) {
          setCurrentVideoUri(video.uri);
          await MediaLibrary.saveToLibraryAsync(video.uri);
        }
      } catch (error) {
        console.error("Error stopping video:", error);
      }
    } else {
      // Start recording
      try {
        setRecording(true);
        const startTimer = () => {
          intervalRef.current = setInterval(() => {
            setTimer((prev) => prev + 1);
          }, 1000);
        };
        startTimer();
        await ref.current?.recordAsync({
          maxDuration: 60,
          quality: "1080p",
          mute: false,
        }).then(async (video) => {
          clearInterval(intervalRef.current);
          setRecording(false);
          setTimer(0);
          if (video?.uri) {
            setCurrentVideoUri(video.uri);
            await MediaLibrary.saveToLibraryAsync(video.uri);
          }
        });
      } catch (error) {
        console.error("Error recording video:", error);
        setRecording(false);
        clearInterval(intervalRef.current);
        setTimer(0);
      }
    }
  };
  
  const confirmVideo = () => {
    setVideoList((prev)=>[...prev,currentVideoUri]);
    setCurrentVideoUri(null);
  }

  const sentAllVideos = async() => {
    if(videoList.length === 0){
      Alert.alert("No videos", "Please record at least one video before sending.");
    return;
    }

    const formData = new FormData();
    videoList.forEach((uri,index)=> {
      formData.append('files',{
        uri,
        type:"video/mp4",
        name:getFileNameFromUri(uri) || `video_${index}.mp4`,
      })
    })
    try {
      const response = await axios.post(
        "https://testapiappcore-g8g4apd7gdcfeybz.ukwest-01.azurewebsites.net/api/Video/uploadVideos/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Videos uploaded successfully:", response.data);
      Alert.alert("Success", "Videos uploaded successfully.");
      setVideoList([]);
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Failed to upload videos.");
    }
  }

  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  return (
    <View style={styles.container}>
      {currentPhotoUri ? (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: currentPhotoUri }}
            contentFit="contain"
            style={styles.preview}
          />
          <View style={styles.buttonRow}>
            <Button title="Retake" onPress={() => setCurrentPhotoUri(null)} />
            <Button title="Keep" onPress={confirmPhoto} />
          </View>
        </View>
      ) : currentVideoUri ? (
        <View style={styles.previewContainer}>
          <Video
            source={{ uri: currentVideoUri }}
            style={styles.preview}
            useNativeControls
            resizeMode="contain"
            isLooping           
          />
          <View style={styles.buttonRow}>
          <Button title="Retake" onPress={() => setCurrentVideoUri(null)} />
          <Button title="Keep" onPress={confirmVideo} />
          </View>
        </View>
      ) : (
        <CameraView
          style={styles.camera}
          ref={ref}
          mode={mode}
          facing={facing}
          flash="auto"
          mute={false}
        >
          {recording && <Text style={styles.timer}>{timer}s</Text>}
          <View style={styles.shutterContainer}>
            <Pressable onPress={toggleMode}>
              {mode === "picture" ? (
                <AntDesign name="picture" size={32} color="white" />
              ) : (
                <Feather name="video" size={32} color="white" />
              )}
            </Pressable>
            <Pressable onPress={mode === "picture" ? takePicture : takeVideo}>

              {({ pressed }) => (
                <View style={[styles.shutterBtn, { opacity: pressed ? 0.5 : 1 }]}>
                  <View
                    style={[
                      styles.shutterBtnInner,
                      { backgroundColor: mode === "picture" ? "white" : "red" },
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

      {photoList.length > 0 && !currentPhotoUri && (
        <View style={{ padding: 10 }}>
          <ScrollView horizontal style={{ marginBottom: 10 }}>
            {photoList.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={{ width: 60, height: 60, borderRadius: 4, marginRight: 6 }}
              />
            ))}
          </ScrollView>
          <Button title="Send Photos" onPress={sendAllPhotos} />
        </View>
      )}

{videoList.length > 0 && !currentVideoUri && (
        <View style={{ padding: 10 }}>
          <ScrollView horizontal style={{ marginBottom: 10 }}>
            {videoList.map((uri, index) => (
              <Video
                key={index}
                source={{ uri }}
                style={{ width: 60, height: 60, borderRadius: 4, marginRight: 6 }}
              />
            ))}
          </ScrollView>
          <Button title="Send Videos" onPress={sentAllVideos} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center" },
  camera: { flex: 1, width: "100%" },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  preview: { width: "90%", height: "80%", borderRadius: 10 },
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
  shutterBtnInner: { width: 70, height: 70, borderRadius: 50 },
  timer: {
    position: "absolute",
    top: 20,
    left: "50%",
    transform: [{ translateX: -30 }],
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});
