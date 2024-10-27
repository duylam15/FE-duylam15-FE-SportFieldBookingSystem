// jwtHelper.js
export const getUsernameFromToken = (token) => {
    if (!token) return null;
  
    // Tách token ra theo dấu chấm (header.payload.signature)
    const payload = token.split('.')[1];
  
    // Giải mã phần payload (nó được mã hóa theo base64)
    const decodedPayload = atob(payload);
  
    // Chuyển payload từ JSON string sang object
    const decodedObject = JSON.parse(decodedPayload);
  
    // Lấy ra username từ payload (giả sử payload có trường 'sub' chứa username)
    return decodedObject.sub || null;
  };
  