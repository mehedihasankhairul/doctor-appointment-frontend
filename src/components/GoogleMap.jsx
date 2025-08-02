import React, { useEffect, useRef, useState } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const MapComponent = ({ center, zoom, markers, className }) => {
  const ref = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'on' }]
          },
          {
            featureType: 'poi.medical',
            stylers: [{ visibility: 'on' }]
          }
        ],
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  useEffect(() => {
    if (map && markers) {
      markers.forEach((markerData) => {
        const marker = new window.google.maps.Marker({
          position: markerData.position,
          map,
          title: markerData.title,
          icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new window.google.maps.Size(32, 32),
          },
        });

        if (markerData.infoWindow) {
          const infoWindow = new window.google.maps.InfoWindow({
            content: markerData.infoWindow,
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          // Show info window by default
          infoWindow.open(map, marker);
        }
      });
    }
  }, [map, markers]);

  return <div ref={ref} className={className} />;
};

const GoogleMap = ({
  center = { lat: 23.249436, lng: 90.957644 },
  zoom = 15,
  markers = [],
  className = "w-full h-64 rounded-lg",
  showDirectionsButton = true,
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-600">
          <span className="text-2xl block mb-2">🗺️</span>
          <p>Google Maps API key not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Wrapper apiKey={apiKey} libraries={["places"]}>
        <MapComponent center={center} zoom={zoom} markers={markers} className={className} />
      </Wrapper>

      {showDirectionsButton && (
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-800 font-semibold">📍 Popular Diagnostic Centre Ltd.</p>
              <p className="text-blue-600 text-sm">House # 57, Laksam Road, Ramghat, Kandirpar, Cumilla</p>
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
            >
              Get Directions
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;
