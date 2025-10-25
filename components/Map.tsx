import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { MarkerData } from '../types';
import MarkerList from './MarkerList';

type MapProps = {
  markers: MarkerData[];
  onMarkerPress: (marker: MarkerData) => void;
  onMapPress: (e: any) => void;
};

export default function Map({ markers, onMarkerPress, onMapPress}: MapProps) {
  return (
    <MapView style={styles.map}
      initialRegion={{
        latitude: 58.010259,
        longitude: 56.234195,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onLongPress={onMapPress}
    >
    <MarkerList markers={markers} onMarkerPress={onMarkerPress} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
