import { ImageData } from '@/types';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ImageListProps = {
  imagesData: ImageData; 
  onDeleteImage: (uri: string) => void;
};

export default function ImageList({ imagesData, onDeleteImage }: ImageListProps) {
  const { uri: images } = imagesData; 

  if (images.length === 0) {
    return <Text style={styles.emptyText}>Фотографий нет</Text>;
  }

  return (
    <FlatList
      horizontal
      data={images}
      keyExtractor={item => item}
      style={styles.list}
      renderItem={({ item }) => (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item }} style={styles.image} />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDeleteImage(item)}
          >
            <Text style={styles.deleteButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  list: {
    marginVertical: 10,
  },
  imageContainer: {
    marginRight: 10,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
  },
  deleteButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'blue',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#999',
    marginVertical: 10,
  },
});
