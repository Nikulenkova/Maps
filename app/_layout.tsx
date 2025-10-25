import { MarkerProvider } from '@/components/MarkerContext';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <MarkerProvider>
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Карта' }} />
      <Stack.Screen name="marker/[id]" options={{ title: 'Детали маркера' }}/>
    </Stack>
    </MarkerProvider>
  );
}