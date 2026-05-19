'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MUSEUM_LOCATION } from '@/config/museum-location'

function fixLeafletDefaultIcon() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })
}

interface LocationMapProps {
  className?: string
}

export default function LocationMap({ className = 'h-96' }: LocationMapProps) {
  const position: [number, number] = [MUSEUM_LOCATION.lat, MUSEUM_LOCATION.lng]

  useEffect(() => {
    fixLeafletDefaultIcon()
  }, [])

  return (
    <div className={`${className} w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm [&_.leaflet-container]:z-0`}>
      <MapContainer
        center={position}
        zoom={MUSEUM_LOCATION.zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> colaboradores'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="text-sm">
              <p className="font-semibold text-gray-900">{MUSEUM_LOCATION.name}</p>
              {MUSEUM_LOCATION.addressLines.map((line) => (
                <p key={line} className="text-gray-700">
                  {line}
                </p>
              ))}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
