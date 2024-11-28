import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { accessTokenMap } from "../../../utils/thongTinChung";

mapboxgl.accessToken = accessTokenMap;

const Map = ({ lng, lat, onLocationChange }) => {
  const mapContainerRef = useRef(null);
  const markerRef = useRef(null); // Ref để lưu trữ marker
  const mapRef = useRef(null); // Ref để lưu trữ đối tượng map

  useEffect(() => {
    // Tạo bản đồ
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 15, // Zoom mặc định thấp hơn 20 để tránh phóng to quá mức
    });

    mapRef.current = map; // Lưu đối tượng map vào ref

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

    // Tạo và thêm marker khi bản đồ được tải
    const marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .addTo(map);
    
    // Lưu marker vào ref để có thể cập nhật sau
    markerRef.current = marker;

    // Tắt sự kiện zoom và pan ảnh hưởng đến marker
    map.on('zoom', () => {
      // Không làm gì khi người dùng zoom
    });

    map.on('move', () => {
      // Không làm gì khi người dùng di chuyển bản đồ
    });

    // Cleanup
    return () => map.remove();
  }, [lng, lat, onLocationChange]);

  useEffect(() => {
    if (markerRef.current) {
      // Cập nhật vị trí của marker khi tọa độ thay đổi
      markerRef.current.setLngLat([lng, lat]);
    }
  }, [lng, lat]);

  const handleReturnToMarker = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 22, // Giảm zoom để không bị quá phóng đại
        essential: true, // Điều này giúp đảm bảo chuyển động mượt mà
      });

      // Đảm bảo marker luôn hiện tại vị trí đúng sau khi zoom vào
      if (markerRef.current) {
        markerRef.current.setLngLat([lng, lat]);
      } else {
        // Nếu marker chưa tồn tại, tạo marker mới
        const marker = new mapboxgl.Marker({ color: "red" })
          .setLngLat([lng, lat])
          .addTo(mapRef.current);
        markerRef.current = marker;
      }
    }
  };

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
      <div onClick={handleReturnToMarker} className="return-btn">
        Quay lại dấu chấm đỏ
      </div>
    </div>
  );
};

export default Map;