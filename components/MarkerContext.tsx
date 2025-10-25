import React, { createContext, ReactNode, useContext, useState } from 'react';
import { MarkerData } from '../types';

type MarkerContextType = {
  markers: MarkerData[];
  setMarkers: React.Dispatch<React.SetStateAction<MarkerData[]>>;
};

const MarkerContext = createContext<MarkerContextType | undefined>(undefined);

export const MarkerProvider = ({ children }: { children: ReactNode }) => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  return (
    <MarkerContext.Provider value={{ markers, setMarkers }}>
      {children}
    </MarkerContext.Provider>
  );
};

export const useMarkers = () => {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error('useMarkers must be used within MarkerProvider');
  }
  return context;
};
