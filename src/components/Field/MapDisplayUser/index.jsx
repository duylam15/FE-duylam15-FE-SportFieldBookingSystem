import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { accessTokenMap } from "../../../utils/thongTinChung";

mapboxgl.accessToken = accessTokenMap;

const MapDisplayUser = ({ lng, lat }) => {
  const mapContainerRef = useRef(null); // Ref để lưu container của bản đồ

  useEffect(() => {
    // Tạo bản đồ
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11", // Kiểu bản đồ
      center: [lng, lat], // Tâm bản đồ
      zoom: 15, // Mức zoom mặc định
    });

    // Thêm marker vào vị trí được cung cấp
    new mapboxgl.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .addTo(map);

    // Cleanup
    return () => map.remove();
  }, [lng, lat]);

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" style={{ height: "400px", width: "100%" }} />
    </div>
  );
};

export default MapDisplayUser;