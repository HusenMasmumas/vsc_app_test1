import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Button,
  Image,
  Dimensions,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useCameraDevice, Camera} from 'react-native-vision-camera';
import FaceDetector from '@react-native-ml-kit/face-detection';

const FaceDetectionPage = () => {
  const [photoUri, setPhotoUri] = useState('');
  const device = useCameraDevice('front');
  const camera = useRef<Camera>(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  }, []);

  const takePhoto = async () => {
    const photo = await camera?.current?.takePhoto({
      // flash: 'on',
      enableShutterSound: false,
    });
    console.log('camera?.current', photo?.path);

    setPhotoUri(photo?.path || '');
  };

  const handleFaces = async (faces: any) => {
    if (faces.length > 0) {
      const face = faces[0];
      const isFacingLeft = face?.rotationY > 15; // องศาที่หันไปทางซ้าย
      console.log('Is facing left:', isFacingLeft);

      //   useRunOnJS(console.log)('Is facing left:', isFacingLeft);
    }
  };

  useEffect(() => {
    if (camera.current) {
      const processFrame = async () => {
        const photo = await camera?.current?.takeSnapshot();
        const faces = await FaceDetector?.detect('file://' + photo?.path, {
          performanceMode: 'accurate',
          landmarkMode: 'all',
        });
        console.log(JSON.stringify(faces));

        handleFaces(faces);
      };

      const interval = setInterval(processFrame, 5000); // ตรวจจับทุกๆ 1 วินาที

      return () => clearInterval(interval);
    }
  }, [camera]);

  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, {backgroundColor: '#fff'}]}>
      <View style={styles.container}>
        {photoUri ? (
          <View style={styles.previewContainer}>
            <Image
              source={{uri: 'file://' + photoUri}}
              style={styles.previewImage}
            />
            <Button title="Retake Photo" onPress={() => setPhotoUri('')} />
          </View>
        ) : (
          <>
            {!!device && (
              <View
                style={{
                  position: 'relative',
                  height: 300,
                  width: 300,
                  overflow: 'hidden',
                  borderRadius: 300,
                }}>
                <View
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}>
                  <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    photo={true}
                    ref={camera}
                    resizeMode="cover"
                  />
                </View>
              </View>
            )}
            {/* <View style={[StyleSheet.absoluteFill, {backgroundColor: '#fff'}]} /> */}
            {/* <View style={styles.mask} /> */}

            {/* <Button title="Take Photo" onPress={takePhoto} /> */}
          </>
        )}
        <View style={styles.instructionsContainer}>
          {/* <Text style={styles.instructions}>Instructions</Text> */}
          <TouchableOpacity onPress={takePhoto}>
            <Text style={styles.action}>Action to perform</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const {width: windowWidth} = Dimensions.get('window');

const PREVIEW_SIZE = 325;
const PREVIEW_RECT = {
  minX: (windowWidth - PREVIEW_SIZE) / 2,
  minY: 50,
  width: PREVIEW_SIZE,
  height: PREVIEW_SIZE,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  mask: {
    borderRadius: PREVIEW_SIZE / 2,
    height: PREVIEW_SIZE,
    width: PREVIEW_SIZE,
    marginTop: PREVIEW_RECT.minY,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  circularProgress: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    marginTop: PREVIEW_RECT.minY,
    marginLeft: PREVIEW_RECT.minX,
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    top: 25,
    position: 'absolute',
    color: '#000',
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: PREVIEW_RECT.minY + PREVIEW_SIZE,
  },
  action: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
});

export default FaceDetectionPage;
