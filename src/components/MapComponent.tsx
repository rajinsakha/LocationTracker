import React,{useState, useRef, useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import mark from '../assets/placeholder.png';
import { addCustomMarker, clearCustomMarker } from '../features/location/locationSlice';
import "leaflet/dist/leaflet.css";
import { Icon,LatLngTuple } from 'leaflet';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import CustomMarker from './CustomMarker';



const MapComponent: React.FC = () => {
  const [center, setCenter] = useState({lat: 27.7172, lng: 85.3240 });
  const ZOOM_LEVEL = 13;
  const mapRef = useRef<any>();


  const [currentLocation, setCurrentLocation] = useState<any>(null);

  const dispatch = useAppDispatch();
  const customMarkers = useAppSelector((state: any) => state.customMarkers);
  console.log(customMarkers)

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    dispatch(addCustomMarker({ lat, lng }));
  };

  const handleMarkCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ lat: latitude, lng: longitude });
      dispatch(addCustomMarker({ lat: latitude, lng: longitude }));
    });
  };


  const handleClearMarkers = () => {
    dispatch(clearCustomMarker());
  };


  const customIcon = new Icon({
    iconUrl:mark,
    iconSize:[30, 30]
  })



return (
<div className='p-4'>

<div className='flex gap-4'>
      <button className='bg-green-600 text-white px-4 py-2 mb-4' onClick={handleMarkCurrentLocation}>Mark Current Location</button>
      <button className='bg-red-600 text-white px-4 py-2 mb-4' onClick={handleClearMarkers}>Clear Markers</button>
  </div>

<MapContainer className='h-[600px] w-full' center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={false} ref={mapRef} >
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  {currentLocation && (
          <Marker position={[currentLocation.lat, currentLocation.lng]} icon={customIcon}>
            <Popup>Your current location</Popup>
          </Marker>
  )}

  <CustomMarker/>    


</MapContainer>


  </div>

  )
}

export default MapComponent