/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */


import React, {Component, useEffect, useState} from 'react';
import { RNCamera } from 'react-native-camera'
import { widthPercentageToDP as vw, heightPercentageToDP as vh} from 'react-native-responsive-screen'
import {Platform, StyleSheet, Text, View, Alert, Vibration, ToastAndroid, Permission, PermissionsAndroid} from 'react-native';
import Slider from '@react-native-community/slider'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props {}
export default function App() {

  const [scanning,setScanning] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [zoom, setZoom] = useState(0)

  useEffect(() => {
    Platform.select({
      android: async () => {
        const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: "To use QR code we need this camera permission",
          message: 'To get the camera to work in this app' +
          'you need to grant a permission for the use of your' +
          'camera.',
          buttonPositive: "Permission Granted Sir",
          buttonNegative: "Nah, just get me outta here"
        })

        if(permission === PermissionsAndroid.RESULTS.GRANTED) {
          setAuthorized(true)
        } else {
          setAuthorized(false)
        }
      }
    })()
  })

  return (
      <RNCamera
          style={styles.preview}
          type='back'
          zoom={zoom}
          onBarCodeRead={(e) => {
            if(e.type.toLowerCase() === 'qr_code') {
              if(scanning) {
                setScanning(false)
                Alert.alert('QR CODE LIDO COM SUCESSO', `QR DATA: ${e.data}`,[],{
                  onDismiss: () => {
                    setScanning(true)
                  }
                })
              }
            }
          }}
          captureAudio={false}
        >
          <View style={styles.headerCard}>
            <Text style={styles.title}>
              QR CODE READER
            </Text>
          </View>

          <View style={styles.marker}>
          </View>
          <View style={styles.zoomContainer}>
            <Text style={styles.zoomTitle}> ZOOM </Text>
            <Slider style={styles.zoom} maximumValue={1} minimumValue={0} onValueChange={setZoom}/>
          </View>
        </RNCamera>
  );
}

const styles = StyleSheet.create({

  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  marker: {
    borderBottomWidth: 5,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderColor: '#ffffff',
    width: vw(90),
    height: vw(90),
     elevation: 5
  },
  zoomContainer: {
    position: 'absolute',
    height: vh(10),
    backgroundColor: '#fff',
    width: vw(100),
    bottom: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  zoomTitle: {
    fontSize: 16
  },
  zoom: {
    width: '90%'
  },
  headerCard: {
    position: 'absolute',
    height: vh(10),
    backgroundColor: '#fff',
    width: vw(100),
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  }
});