export interface MarkerData {
  id: string;
  title: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  images: string[]; 
}

export interface ImageData {
  uri: string[];
}

export type RootStackParamList = {
  Map: undefined; 
  MarkerDetails: { id: string }; 
};
