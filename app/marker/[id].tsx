import { useMarkers } from '@/components/MarkerContext';
import { RouteProp, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ImageList from '../../components/ImageList';
import { MarkerData, RootStackParamList } from '../../types';

type MarkerDetailsRouteProp = RouteProp<RootStackParamList, 'MarkerDetails'>;

export default function MarkerDetails() {
  const { markers, setMarkers } = useMarkers();
  const route = useRoute<MarkerDetailsRouteProp>();
  const { id } = route.params;

  const [marker, setMarker] = useState<MarkerData | null>(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    const found = markers.find(m => m.id === id) || null;
    setMarker(found);
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, [id, markers, permissionResponse]);

  const pickImageAsync = async () => {
    try {
      if (!permissionResponse?.granted) {
        Alert.alert('Необходимо разрешение на доступ к галерее');
        const perm = await requestPermission();
        if (!perm.granted) return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, 
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) {
        Alert.alert('Изображение не выбрано');
        return;
      }

      if (marker && result.assets.length > 0) {
        setMarker({
          ...marker,
          images: [...marker.images, result.assets[0].uri],
        });
      }
    } catch (error) {
      console.error('Ошибка при выборе изображения:', error);
      Alert.alert('Ошибка', 'Произошла ошибка при выборе изображения. Попробуйте еще раз.');
    }
  };

  const onDeleteImage = (uri: string) => {
    if (!marker) return;
    Alert.alert(
      'Удалить изображение?',
      '',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            setMarker({
              ...marker,
              images: (marker.images).filter(imgUri => imgUri !== uri),
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const onChangeTitle = (text: string) => {
    if (marker) setMarker({ ...marker, title: text });
  };

  const onChangeDescription = (text: string) => {
    if (marker) setMarker({ ...marker, description: text });
  };

  const onSave = () => {
    if (!marker) return;
    const updatedMarkers = markers.map(m => (m.id === marker.id ? marker : m));
    setMarkers(updatedMarkers);
    Alert.alert('Сохранено', 'Изменения маркера сохранены.');
  };

  if (!marker) {
    return (
      <View style={styles.center}>
        <Text>Загрузка данных маркера...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.infoContainer}>
        <TextInput
          style={styles.titleInput}
          value={marker.title}
          onChangeText={onChangeTitle}
          placeholder="Название"
        />
        <TextInput
          style={styles.descriptionInput}
          value={marker.description}
          onChangeText={onChangeDescription}
          placeholder="Описание"
          multiline
        />
        <Text>Широта: {marker.coordinate.latitude.toFixed(6)}</Text>
        <Text>Долгота: {marker.coordinate.longitude.toFixed(6)}</Text>
        <ImageList imagesData={{ uri: marker.images}} onDeleteImage={onDeleteImage} />
        <Button title="Добавить изображение" onPress={pickImageAsync} />
        <View style={{ marginTop: 10 }}>
          <Button title="Сохранить изменения" onPress={onSave} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 25,
  },
  infoContainer: {
    padding: 16,
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleInput: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  descriptionInput: {
    marginBottom: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    minHeight: 60,
    textAlignVertical: 'top',
  },
});
