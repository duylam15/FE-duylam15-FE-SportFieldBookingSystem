import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { accessTokenMap } from "../../../utils/thongTinChung";

mapboxgl.accessToken = accessTokenMap; 

const Map = ({ lng, lat, onLocationChange }) => {
  const mapContainerRef = useRef(null);
  console.log("Lng thay doi ", lng)
  console.log("Lat thay doi ", lat)

  useEffect(() => {
    // Tạo bản đồ
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 12,
    });

    // Thêm tìm kiếm địa điểm
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
    });
    map.addControl(geocoder);

    // Lắng nghe sự kiện khi người dùng chọn địa điểm
    geocoder.on("result", (event) => {
      const { center } = event.result;
      onLocationChange(center[0], center[1]); // Gửi tọa độ về parent
    });

    // Cleanup
    return () => map.remove();
  }, [lng, lat, onLocationChange]);

  return <div ref={mapContainerRef} className="map-container" />;
};

export default Map;