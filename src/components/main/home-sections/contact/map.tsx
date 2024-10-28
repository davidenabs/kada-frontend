"use client"
import React, { useState } from "react";
import { Map, Marker} from "@vis.gl/react-google-maps";

const KadaMap = () => {
    // shows marker on London by default
    const [markerLocation,] = useState({
      lat: 10.49981,
      lng: 7.43250,
    });
  
    return (
      <div className="hidden md:block w-full rounded-lg overflow-hidden h-full ">
        <Map
          style={{ borderRadius: "20px" }}
          defaultZoom={13}
          defaultCenter={markerLocation}
          gestureHandling={"greedy"}
          disableDefaultUI
        >
          <Marker position={markerLocation} />
        </Map>
      </div>
    );
  }
  
  export default KadaMap;