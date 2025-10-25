import React from 'react';
import { Marker } from 'react-native-maps';
import { MarkerData } from '../types';

type MarkerListProps = {
  markers: MarkerData[];
  onMarkerPress: (marker: MarkerData) => void;
};

export default function MarkerList({ markers, onMarkerPress }: MarkerListProps) {
  return (
    <>
      {markers.map(marker => (
        <Marker
          key={marker.id}
          coordinate={marker.coordinate}
          onPress={() => onMarkerPress(marker)}
          title={marker.title || "Без названия"}
          description={marker.description}
        />
      ))}
    </>
  );
}