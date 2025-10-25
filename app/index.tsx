import { useMarkers } from '@/components/MarkerContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Map from '../components/Map';
import { MarkerData } from '../types';

export default function Index() {
  const { markers, setMarkers } = useMarkers();
  const router = useRouter();

  const onMarkerPress = (marker: MarkerData) => {
    router.push({
      pathname: '/marker/[id]',
      params: { id: marker.id },
    });
  };

  const onMapPress = (e: any) => {
    const coordinate = e.nativeEvent.coordinate;
    const newMarker: MarkerData = {
      id: Date.now().toString(),
      title: '',
      description: '',
      coordinate,
      images: [],
    };
    setMarkers(prev => [...prev, newMarker]);
  };

  return (
    <View style={styles.container}>
      <Map
        markers={markers}
        onMarkerPress={onMarkerPress}
        onMapPress={onMapPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});