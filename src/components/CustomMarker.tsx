import React from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import mark from '../assets/placeholder.png'; // Replace with your custom icon URL
import { addCustomMarker } from '../features/location/locationSlice';

const MyComponent: React.FC = () => {
const dispatch = useAppDispatch();
const markersList = useAppSelector(state=>state.location.customMarkers);

  const customIcon = new Icon({
    iconUrl: mark,
    iconSize: [30, 30],
  });

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      // setMarkers([...markers, { lat, lng }]);
      dispatch(addCustomMarker({lat,lng}))
    },
  });

  return (
    <>
      {markersList.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]} icon={customIcon}>
          <Popup>Your New location</Popup>
        </Marker>
      ))}
    </>
  );
};

export default MyComponent;
