// import React, {useCallback, useMemo, useRef} from 'react';
// import {View, Text, StyleSheet, Button} from 'react-native';
// import {
//   BottomSheetModal,
//   BottomSheetView,
//   BottomSheetModalProvider,
// } from '@gorhom/bottom-sheet';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';

// const AppSupVsc = () => {
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

//   // variables
//   const snapPoints = useMemo(() => ['25%', '50%'], []);

//   // callbacks
//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetModalRef.current?.present();
//   }, []);
//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index);
//   }, []);
//   return (
//     <GestureHandlerRootView style={{width: '100%', height: '100%'}}>
//       <BottomSheetModalProvider>
//         <View style={styles.container}>
//           <Button
//             onPress={handlePresentModalPress}
//             title="Present Modal"
//             color="black"
//           />
//           <BottomSheetModal
//             ref={bottomSheetModalRef}
//             index={1}
//             snapPoints={snapPoints}
//             onChange={handleSheetChanges}>
//             <BottomSheetView style={styles.contentContainer}>
//               <Text>Awesome 🎉</Text>
//             </BottomSheetView>
//           </BottomSheetModal>
//         </View>
//       </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
//     backgroundColor: 'grey',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });

// export default AppSupVsc;

// import React, {useState} from 'react';
// import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import {DraggableGrid} from './src/component/dist/index';

// const AppSupVsc = () => {
//   const [data, setData] = useState([
//     {name: '1', key: 'one'},
//     {name: '2', key: 'two'},
//     {name: '3', key: 'three'},
//     {name: '4', key: 'four'},
//     {name: '5', key: 'five'},
//     {name: '6', key: 'six'},
//     {name: '7', key: 'seven'},
//     {name: '8', key: 'eight'},
//     {name: '9', key: 'night'},
//     {name: '0', key: 'zero'},
//     {name: '11', key: '1one'},
//     {name: '12', key: '1two'},
//     {name: '13', key: '1three'},
//     {name: '14', key: '1four'},
//     {name: '15', key: '1five'},
//     {name: '16', key: '1six'},
//     {name: '17', key: '1seven'},
//     {name: '18', key: '1eight'},
//     {name: '19', key: '1night'},
//     {name: '10', key: '1zero'},
//     {name: '11', key: '2one'},
//     {name: '12', key: '2two'},
//     {name: '13', key: '2three'},
//     {name: '14', key: '2four'},
//     {name: '15', key: '2five'},
//     {name: '16', key: '2six'},
//     {name: '17', key: '2seven'},
//     {name: '18', key: '2eight'},
//     {name: '19', key: '2night'},
//     {name: '10', key: '2zero'},
//     {name: '11', key: '3one'},
//     {name: '12', key: '3two'},
//     {name: '13', key: '3three'},
//     {name: '14', key: '3four'},
//     {name: '15', key: '3five'},
//     {name: '16', key: '3six'},
//     {name: '17', key: '3seven'},
//     {name: '18', key: '3eight'},
//     {name: '19', key: '3night'},
//     {name: '10', key: '3zero'},
//   ]);

//   const render_item = (item: {name: string; key: string}) => {
//     return (
//       <View style={styles.item} key={item.key}>
//         <Text style={styles.item_text}>{item.name}</Text>
//       </View>
//     );
//   };

//   return (
//     // <GestureHandlerRootView style={{flex: 1}}>
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         <DraggableGrid
//           numColumns={4}
//           renderItem={render_item}
//           data={data}
//           onDragRelease={data => {
//             setData(data);
//           }}
//         />
//       </View>
//     </SafeAreaView>
//     // </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   button: {
//     width: 150,
//     height: 100,
//     backgroundColor: 'blue',
//   },
//   wrapper: {
//     paddingTop: 100,
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//   },
//   item: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     backgroundColor: 'red',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   item_text: {
//     fontSize: 40,
//     color: '#FFFFFF',
//   },
// });

// export default AppSupVsc;

// import React, {useState} from 'react';
// import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import Draggable from 'react-native-draggable';

// const App = () => {
//   const [iconPositions, setIconPositions] = useState([
//     {x: 0, y: 0},
//     {x: 83.33332824707031, y: 296.3333435058594},
//     {x: 218, y: 191.6666717529297},
//     {x: 178.66665649414062, y: 275.6666564941406},
//   ]);

//   const handleDrag = (
//     event: {left: number; top: number; right: number; bottom: number},
//     index: any,
//   ) => {
//     // const {x, y} = event.nativeEvent.location;
//     console.log(event);

//     const newIconPositions = iconPositions?.map((item, i) => {
//       if (i === index) {
//         return {
//           x: event.left,
//           y: event.top,
//         };
//       }
//       return item;
//     });
//     console.log(newIconPositions);

//     // newIconPositions[index] = {x: 50, y: 0};
//     // setIconPositions(newIconPositions);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         {iconPositions.map((iconPosition, index) => (
//           <Draggable
//             key={index}
//             x={iconPosition.x}
//             y={iconPosition.y}
//             onDragRelease={(event, gestureState, bounds) => {
//               console.log(gestureState);
//               handleDrag(bounds, index);
//             }}
//             // onDragMove={event => handleDrag(event, index)}
//           >
//             <View style={styles.icon}>
//               <Text>{index + 1}</Text>
//             </View>
//           </Draggable>
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   icon: {
//     width: 50,
//     height: 50,
//     backgroundColor: 'red',
//   },
// });

// export default App;

// import React, {useRef, useState} from 'react';
// import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
// import AutoDragSortableView from './src/component/auto';

// const numColumns = 5;
// const initialData = Array.from({length: 95}, (_, i) => ({
//   key: `${i}`,
//   label: `${i + 1}`,
// }));

// const App = () => {
//   const [data, setData] = useState(initialData);
//   const ref = useRef<any>(null);
//   const [enable, setEnable] = useState(true);

//   const renderItem = (item: any, index: number) => (
//     <View style={styles.item}>
//       <Text style={styles.label}>{item.label}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <ScrollView horizontal ref={ref} scrollEnabled={enable}>
//         <AutoDragSortableView
//           dataSource={data}
//           parentWidth={500}
//           childrenWidth={Dimensions.get('window').width / numColumns - 10}
//           childrenHeight={Dimensions.get('window').width / numColumns - 10}
//           marginChildrenBottom={10}
//           marginChildrenRight={10}
//           renderItem={renderItem}
//           onDataChange={(data: any) => setData(data)}
//           keyExtractor={(item: any) => item.key}
//           onDragStart={() => {
//             setEnable(false);
//           }}
//           onDragEnd={() => {
//             setEnable(true);
//           }}
//           onDragging={e => {
//             if (Dimensions.get('window').width < e?.moveY) {
//               ref?.current?.scrollTo({y: e?.moveY});
//             }

//             // ref?.current?.scrollTo({y: e?.moveY});
//             // console.log(Dimensions.get('window').width, e?.moveY);
//             // ref?.current?.scrollTo({y: e?.moveY});
//             // console.log(e?.moveY);
//           }}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 50,
//     paddingHorizontal: 5,
//   },
//   item: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'red',
//     borderRadius: 5,
//     width: 50,
//     height: 50,
//   },
//   label: {
//     color: 'white',
//     fontSize: 24,
//   },
// });

// export default App;

import React from 'react';
import {SafeAreaView} from 'react-native';
// import FaceDetectionPage from './src/component/face_detection';
// import {MyComponent as VSC_Connect} from 'vsc_connect';
// import {MyComponent as VSC_Shop} from 'vsc_connect';

const App = () => {
  return (
    <></>
    // <FaceDetectionPage />
    // <SafeAreaView>
    //   <VSC_Connect />
    //   <VSC_Shop />
    // </SafeAreaView>
  );
};

export default App;

// import React, {useEffect, useRef, useState} from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   Platform,
//   PermissionsAndroid,
//   Button,
//   Image,
// } from 'react-native';
// import {useCameraDevice, Camera} from 'react-native-vision-camera';
// // import {Camera} from 'react-native-vision-camera-text-recognition';

// const App = () => {
//   const [photoUri, setPhotoUri] = useState('');
//   const device = useCameraDevice('back');
//   const camera = useRef<Camera>(null);

//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
//       PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       );
//     }
//   }, []);

//   const takePhoto = async () => {
//     const photo = await camera?.current?.takePhoto({
//       flash: 'on',
//     });
//     console.log('camera?.current', photo?.path);

//     setPhotoUri(photo?.path || '');
//   };

//   return (
//     <View style={styles.container}>
//       {photoUri ? (
//         <View style={styles.previewContainer}>
//           <Image
//             source={{uri: 'file://' + photoUri}}
//             style={styles.previewImage}
//           />
//           <Button title="Retake Photo" onPress={() => setPhotoUri('')} />
//         </View>
//       ) : (
//         <>
//           {!!device && (
//             <Camera
//               style={StyleSheet.absoluteFill}
//               device={device}
//               isActive={true}
//               photo={true}
//               ref={camera}
//             />
//           )}
//           <Button title="Take Photo" onPress={takePhoto} />
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   previewContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   previewImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
// });

// export default App;

// import React from 'react';
// import {View} from 'react-native';
// import {NativeModules} from 'react-native';

// const {MyModule} = NativeModules;

// const App = () => {
//   console.log('MyModule', MyModule);

//   MyModule.myFunction((error, result) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log(result);
//     }
//   });
//   return <View></View>;
// };

// export default App;

// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   Platform,
//   PermissionsAndroid,
//   Button,
//   Image,
//   Dimensions,
//   Text,
//   SafeAreaView,
//   TouchableOpacity,
// } from 'react-native';
// import {
//   useCameraDevice,
//   Camera,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import {Worklets} from 'react-native-worklets-core';
// import {
//   Face,
//   FaceDetectionOptions,
//   useFaceDetector,
// } from 'react-native-vision-camera-face-detector';
// // import {Camera} from 'react-native-vision-camera-text-recognition';

// const App = () => {
//   const [photoUri, setPhotoUri] = useState('');
//   const device = useCameraDevice('front');
//   const camera = useRef<Camera>(null);

//   const [photo, setPhoto] = useState<string>('');
//   const faceDetectionOptions = useRef<FaceDetectionOptions>({
//     // landmarkMode: 'all',
//     performanceMode: 'accurate',
//     // detection options
//   }).current;
//   const {detectFaces} = useFaceDetector(faceDetectionOptions);

//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
//       PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       );
//     }
//   }, []);

//   const takePhoto = async () => {
//     const photo = await camera?.current?.takePhoto({
//       // flash: 'on',
//       enableShutterSound: false,
//     });
//     console.log('camera?.current', photo?.path);

//     setPhotoUri(photo?.path || '');
//   };

//   const handleDetectedFaces = Worklets.createRunOnJS((faces: Face[]) => {
//     try {
//       if (faces.length > 0) {
//         const face = faces[0];

//         if (
//           face?.bounds?.x > 120 &&
//           face?.bounds?.x < 200 &&
//           face?.bounds?.y > 200 &&
//           face?.bounds?.y < 300
//         ) {
//           console.log(face);
//         }

//         // ตรวจสอบค่าต่างๆ ของใบหน้า เช่น ตำแหน่งของดวงตา
//         // const landmarks = face.landmarks;
//         // console.log('leftEye', landmarks);

//         // คำนวณอัตราส่วนและเปรียบเทียบกับเกณฑ์
//         // ...

//         // const threshold = -30;
//         // const angle = face.yawAngle;

//         // if (angle < threshold) {
//         //   console.log('ใบหน้าหันไปทางซ้าย');
//         // } else {
//         //   console.log('ใบหน้าไม่ได้หันไปทางซ้าย');
//         // }
//       }
//     } catch (error) {
//       console.error('Error processing frame:', error);
//     }
//   });

//   const frameProcessor = useFrameProcessor(
//     frame => {
//       'worklet';
//       try {
//         const faces = detectFaces(frame);
//         handleDetectedFaces(faces);

//         // const imageData = frame.decrementRefCount();
//         // console.log(imageData);
//         // console.log(frame);
//         // const scannedFaces = scanFaces(frame, {});
//         // if (Object.keys(scannedFaces).length > 0) {
//         //   handleFaceDetection(scannedFaces);
//         // }
//       } catch (error) {}
//     },
//     [handleDetectedFaces],
//   );

//   return (
//     <SafeAreaView style={[StyleSheet.absoluteFill, {backgroundColor: '#fff'}]}>
//       <View style={styles.container}>
//         {photoUri ? (
//           <View style={styles.previewContainer}>
//             <Image
//               source={{uri: 'file://' + photoUri}}
//               style={styles.previewImage}
//             />
//             <Button title="Retake Photo" onPress={() => setPhotoUri('')} />
//           </View>
//         ) : (
//           <>
//             {!!device && (
//               <View
//                 style={{
//                   position: 'relative',
//                   height: 300,
//                   width: 300,
//                   overflow: 'hidden',
//                   borderRadius: 300,
//                 }}>
//                 <View
//                   style={{
//                     position: 'absolute',
//                     width: '100%',
//                     height: '100%',
//                   }}>
//                   <Camera
//                     style={StyleSheet.absoluteFill}
//                     device={device}
//                     isActive={true}
//                     photo={true}
//                     ref={camera}
//                     resizeMode="cover"

//                     // fps={5}

//                     // frameProcessor={frameProcessor}
//                   />
//                 </View>
//               </View>
//             )}
//             {/* <View style={[StyleSheet.absoluteFill, {backgroundColor: '#fff'}]} /> */}
//             {/* <View style={styles.mask} /> */}

//             {/* <Button title="Take Photo" onPress={takePhoto} /> */}
//           </>
//         )}
//         <View style={styles.instructionsContainer}>
//           {/* <Text style={styles.instructions}>Instructions</Text> */}
//           <TouchableOpacity onPress={takePhoto}>
//             <Text style={styles.action}>Action to perform</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const {width: windowWidth} = Dimensions.get('window');

// const PREVIEW_SIZE = 325;
// const PREVIEW_RECT = {
//   minX: (windowWidth - PREVIEW_SIZE) / 2,
//   minY: 50,
//   width: PREVIEW_SIZE,
//   height: PREVIEW_SIZE,
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   previewContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
//   previewImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },

//   mask: {
//     borderRadius: PREVIEW_SIZE / 2,
//     height: PREVIEW_SIZE,
//     width: PREVIEW_SIZE,
//     marginTop: PREVIEW_RECT.minY,
//     alignSelf: 'center',
//     backgroundColor: 'white',
//   },
//   circularProgress: {
//     width: PREVIEW_SIZE,
//     height: PREVIEW_SIZE,
//     marginTop: PREVIEW_RECT.minY,
//     marginLeft: PREVIEW_RECT.minX,
//   },
//   instructions: {
//     fontSize: 20,
//     textAlign: 'center',
//     top: 25,
//     position: 'absolute',
//     color: '#000',
//   },
//   instructionsContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: PREVIEW_RECT.minY + PREVIEW_SIZE,
//   },
//   action: {
//     fontSize: 24,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#000',
//   },
// });

// export default App;

// import React from 'react';
// import {View} from 'react-native';
// // import FaceDetection from './src/component/face_detection';

// const App = () => {
//   return <View></View>;
// };

// export default App;
