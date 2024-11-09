"use client";

import { Fragment, useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { parseGeoLocation } from "@/utils/utils";

interface MapProps {
  coordinates: [number, number][] | string;
}

export function Map({ coordinates }: MapProps) {
  const [loaded, setLoaded] = useState(false);
  const [position, setPosition] = useState<[number, number][]>([]);

  useEffect(() => {
    if (typeof coordinates === "string") {
      setPosition(parseGeoLocation(coordinates));
    } else {
      setPosition(coordinates);
    }
  }, [coordinates]);

  const center = position.reduce(
    (acc, coord) => [
      acc[0] + coord[0] / position.length,
      acc[1] + coord[1] / position.length,
    ],
    [0, 0]
  );

  useEffect(() => {
    if (position.length || typeof window !== "undefined") {
      setLoaded(true);
    }
  }, [position]);

  if (!loaded) return null;

  return (
    <Fragment>
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polygon
          positions={position}
          pathOptions={{
            color: "blue",
            fillColor: "blue",
            fillOpacity: 0.2,
          }}
        />
      </MapContainer>
    </Fragment>
  );
}
