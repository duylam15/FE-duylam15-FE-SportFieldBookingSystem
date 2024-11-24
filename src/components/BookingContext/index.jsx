import React, { createContext, useState, useContext } from "react";

// Tạo Context
const BookingContext = createContext();

// Provider
export const BookingProvider = ({ children }) => {
  const [dataBooking, setDataBooking] = useState(null); // Chỉ lưu dataBooking

  return (
    <BookingContext.Provider value={{ dataBooking, setDataBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook để sử dụng BookingContext
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking phải được sử dụng trong BookingProvider");
  }
  return context;
};
