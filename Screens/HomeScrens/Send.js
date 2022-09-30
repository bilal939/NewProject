import {StyleSheet, Text, View, TouchableOpacity, Image, Pressable} from 'react-native';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import MapView, {Circle, Overlay, PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker,Polygon} from 'react-native-maps';
import Entype from 'react-native-vector-icons/Entypo';
const Latitude = 30.0;
const Longitude = 70.0;
const latitudeDelta = 0.01;
const longitudeDelta = 0.04;

const Mapstyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];

const Send = () => {
  const [region, setRegion] = useState({
    latitude: '',
    longitude: '',
  });
  const[darkmode,setdarkmode]=useState(false);
  const[ViewdarkMode,setdarkmodeView]=useState('View Dark Mode')
  

  const PolygonCoordinates = [
    {
      name:1,
      Latitude:37.8025259,
      Longitude:-122.4351431
    },
    {
      name:2,
      Latitude:37.7896386,
      Longitude:-122.421646
    }
    ,
    {
      name:3,
      Latitude:37.7665248,
      Longitude:-122.4161628
    }
    ,
    {
      name:4,
      Latitude:37.7734153,
      Longitude:-122.4577787
    },
    {
      name:5,
      Latitude:37.7948605,
      Longitude:-122.4596065
    },
    {
      name:6,
      Latitude:37.8025259,
      Longitude:-122.4351431
    }
  ]

  const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const ChangeReign = reign =>{ 
    setRegion(reign)
  }
  const mapRef = useRef(null);

  const goToTokyo = () => {
    mapRef.current.animateToRegion(tokyoRegion,3*1000);
  };
  return (
    <View style={styles.container}>
      <MapView
        maxZoomLevel={14}
        minZoomLevel={10}
        zoomEnabled={true}
        zoomControlEnabled={true}
        zoomTapEnabled={true}
        ref={mapRef}
        customMapStyle={darkmode?Mapstyle:''}
        provider={PROVIDER_GOOGLE}
        showsCompass={true}
        showsMyLocationButton={true}
        showsTraffic={true}
        showsBuildings={true}
        showsUserLocation={true}
        style={styles.map}
        initialRegion={{
          latitude:  Latitude,
          longitude: Longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        onRegionChangeComplete={(item)=>ChangeReign(item)}
       >
    {/* <Circle
    center={{Latitude:37.8025259,Longitude:-122.4351431}}
    radius={1000}
    strokeWidth={10}
    /> */}
    <Marker
     coordinate={tokyoRegion}
     pinColor='orange'
     title='Tokyo'
     >
    <Entype name='location-pin' size={50} color={'red'} />   
     </Marker>
    </MapView>
    <View style={{position:'absolute',top:0,backgroundColor:'black',left:60}}>  
    <Text style={styles.text}>Current latitude: {region.latitude!=''?region.latitude:Latitude}</Text>
    <Text style={styles.text}>Current longitude: {region.longitude!=''?region.longitude:Longitude}</Text>
    </View>
    <View style={{flexDirection:'row',position:'absolute',bottom:0,left:50,right:50}}>
    <View style={{justifyContent:'center',alignItems:'center',marginRight:10}}>
    <Pressable style={{backgroundColor:'black',padding:10,marginBottom:20,borderRadius:10}} onPress={() => goToTokyo()}><Text style={{color:'white'}}>Go To Tokyo</Text></Pressable>
    </View>
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Pressable style={{backgroundColor:'black',padding:10,marginBottom:20,borderRadius:10}} onPress={() => {
      setdarkmode(!darkmode)
      console.log("darkmode",darkmode)
      }}><Text style={{color:'white'}}>{ViewdarkMode}</Text></Pressable>
    </View>
    </View>
   
    </View>
  );
};

export default Send;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
      flex:1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    
  },
  text: {
    fontSize: 20,
    color: "white",
  },
  
});
