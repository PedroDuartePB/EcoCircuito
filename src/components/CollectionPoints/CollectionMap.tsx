import React, { useEffect, useRef } from 'react';
import { CollectionPoint } from '../../types';
import L from 'leaflet';

interface CollectionMapProps {
  points: CollectionPoint[];
  selectedPoint: CollectionPoint | null;
  onSelectPoint: (point: CollectionPoint) => void;
  userCoords?: { latitude: number; longitude: number } | null;
}

export const CollectionMap: React.FC<CollectionMapProps> = ({
  points,
  selectedPoint,
  onSelectPoint,
  userCoords,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center on João Pessoa by default
    const initialLat = userCoords?.latitude ?? -7.14;
    const initialLon = userCoords?.longitude ?? -34.85;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLon],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
      });

      // Standard OpenStreetMap tiles with clean presentation
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Add zoom control at bottom right like Figma
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // Custom marker icon builder
    const createCustomIcon = (index: number, isSelected: boolean, status: string) => {
      let bgGrad = 'bg-eco-800 text-white';
      let ring = 'ring-2 ring-white shadow-md';

      if (status === 'near_limit') {
        bgGrad = 'bg-amber-600 text-white';
      } else if (status === 'full') {
        bgGrad = 'bg-rose-600 text-white';
      }

      if (isSelected) {
        ring = 'ring-4 ring-eco-400 scale-125 shadow-xl';
      }

      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="relative flex items-center justify-center transform transition-transform cursor-pointer">
            <div class="w-9 h-9 rounded-full ${bgGrad} ${ring} flex items-center justify-center font-extrabold text-xs">
              ${(index + 1).toString().padStart(2, '0')}
            </div>
            <div class="absolute -bottom-1 w-2 h-2 rotate-45 ${bgGrad}"></div>
          </div>
        `,
        iconSize: [36, 42],
        iconAnchor: [18, 42],
        popupAnchor: [0, -38],
      });
    };

    // User location marker
    if (userCoords) {
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-5 h-5 rounded-full bg-blue-600 ring-4 ring-blue-300 shadow-md"></div>
            <div class="absolute w-8 h-8 rounded-full bg-blue-400/30 animate-ping"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      L.marker([userCoords.latitude, userCoords.longitude], { icon: userIcon })
        .addTo(map)
        .bindPopup('<b>Você está aqui</b>');
    }

    // Add point markers
    const group = L.featureGroup();

    points.forEach((pt, idx) => {
      const isSelected = selectedPoint?.id === pt.id;
      const marker = L.marker([pt.latitude, pt.longitude], {
        icon: createCustomIcon(idx, isSelected, pt.capacityStatus),
      });

      marker.bindPopup(`
        <div class="p-2 text-slate-800">
          <strong class="text-sm font-bold block text-slate-900">${pt.name}</strong>
          <span class="text-xs text-slate-600 block mt-0.5">${pt.address}</span>
          <span class="text-xs font-semibold block mt-1.5 ${
            pt.capacityStatus === 'available'
              ? 'text-emerald-700'
              : pt.capacityStatus === 'near_limit'
              ? 'text-amber-700'
              : 'text-rose-700'
          }">
            ● ${
              pt.capacityStatus === 'available'
                ? 'Disponível'
                : pt.capacityStatus === 'near_limit'
                ? 'Próximo do Limite'
                : 'Ponto Lotado'
            }
          </span>
        </div>
      `);

      marker.on('click', () => {
        onSelectPoint(pt);
      });

      marker.addTo(map);
      markersRef.current[pt.id] = marker;
      group.addLayer(marker);
    });

    // Auto-fit bounds if points exist
    if (points.length > 0) {
      if (selectedPoint) {
        map.setView([selectedPoint.latitude, selectedPoint.longitude], 14, { animate: true });
        markersRef.current[selectedPoint.id]?.openPopup();
      } else {
        map.fitBounds(group.getBounds().pad(0.15));
      }
    }

    return () => {
      // Keep instance alive or clean up
    };
  }, [points, selectedPoint, userCoords]);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[580px] rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 bg-slate-100">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Map Legend matching Figma */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 pointer-events-none">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-700 shadow-sm border border-slate-200 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Disponível
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-700 shadow-sm border border-slate-200 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          Quase cheio
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-700 shadow-sm border border-slate-200 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          Lotado
        </span>
      </div>

      {/* Impartiality Footnote matching Figma bottom left */}
      <div className="absolute bottom-3 left-3 right-3 sm:right-auto z-20 pointer-events-none">
        <div className="bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl text-[10px] text-slate-500 border border-slate-200 shadow-xs max-w-sm">
          Busca imparcial PostGIS: sem patrocínio comercial ou destaque pago.
        </div>
      </div>
    </div>
  );
};
