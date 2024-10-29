export const fieldTypes = [
    {
      fieldTypeId: 1,
      fieldTypeName: "Soccer Field",
      fieldTypeDesc: "Standard soccer field for 11 players per team",
      fields: [],
    },
    {
      fieldTypeId: 2,
      fieldTypeName: "Basketball Court",
      fieldTypeDesc: "Indoor court suitable for basketball games",
      fields: [],
    },
];

export const districts = [
  {
    districtId: 1,
    districtName: "District 1",
    streetList: [], // sẽ điền thêm sau khi khai báo street
  },
  {
    districtId: 2,
    districtName: "District 2",
    streetList: [],
  },
];

export const streets = [
  {
    streetId: 1,
    streetName: "273 An Duong Vuong, District 5, Ho Chi Minh City, Vietnam",
    district: districts[0], // Liên kết với District 1
    locationList: [], // sẽ điền sau khi khai báo location
  },
  {
    streetId: 2,
    streetName: "Le Loi Street",
    district: districts[0],
    locationList: [],
  },
  {
    streetId: 3,
    streetName: "Tran Nao Street",
    district: districts[1], // Liên kết với District 2
    locationList: [],
  },
];
districts[0].streetList.push(streets[0], streets[1]);
districts[1].streetList.push(streets[2]);

export const locations = [
  {
    locationId: 1,
    locationNumber: "54/32/4D",
    street: streets[0], // Liên kết với Nguyen Hue Street
  },
  {
    locationId: 2,
    locationNumber: "123/1A",
    street: streets[1], // Liên kết với Le Loi Street
  },
];
streets[0].locationList.push(locations[0]);
streets[1].locationList.push(locations[1]);

export const fieldType = [
  {
    fieldTypeId: 1,
    fieldTypeName: "Soccer Field",
    fieldTypeDesc: "Standard soccer field for 11 players per team",
    fields: [],
  },
  {
    fieldTypeId: 2,
    fieldTypeName: "Basketball Court",
    fieldTypeDesc: "Indoor court suitable for basketball games",
    fields: [],
  },
];


export const timeSlots = [
    {
      timeslotId: 1,
      title: "1",
      date: new Date("2024-10-30"), // Ngày
      start: new Date("2024-10-30T08:00:00"), // Thời gian bắt đầu
      end: new Date("2024-10-30T10:00:00"), // Thời gian kết thúc
  },
  {
      timeslotId: 2,
      title: "2",
      date: new Date("2024-10-29"),
      start: new Date("2024-10-29T10:00:00"), // Thời gian bắt đầu
      end: new Date("2024-10-29T14:00:00"), // Thời gian kết thúc
  },
  {
    timeslotId: 3,
    title: "3",
    date: new Date("2024-10-31"),
    start: new Date("2024-10-31T10:00:00"), // Thời gian bắt đầu
    end: new Date("2024-10-31T12:00:00"), // Thời gian kết thúc
},
  ];
  
export const fields = [
  {
    fieldId: 1,
    fieldCode: "SF001",
    fieldName: "Main Soccer Field",
    capacity: 22,
    pricePerHour: 50.0,
    fieldType: fieldTypes[0], // Liên kết với Soccer Field trong FieldType
    location: locations[0], // Liên kết với Location 1
    user: { userId: 1, userName: "admin" }, // Dữ liệu mẫu User (cần khai báo trong thực tế)
    status: "AVAILABLE",
    bookingList: [], // Danh sách Booking, để trống cho dữ liệu mẫu
    reviewList: [], // Danh sách Review, để trống cho dữ liệu mẫu
    timeSlotList: [timeSlots[0], timeSlots[1], timeSlots[2]], // Liên kết với timeSlots
    fieldImageList: [], // Danh sách ảnh sân (FieldImage), để trống cho dữ liệu mẫu
    favoriteList: [], // Danh sách yêu thích (Favorite), để trống cho dữ liệu mẫu
    fieldFacilityList: [], // Danh sách tiện ích sân (FieldFacility), để trống cho dữ liệu mẫu
    fieldMaintenanceList: [], // Danh sách bảo trì sân (FieldMaintenance), để trống cho dữ liệu mẫu
  },
  {
    fieldId: 2,
    fieldCode: "BC001",
    fieldName: "Indoor Basketball Court",
    capacity: 10,
    pricePerHour: 30.0,
    fieldType: fieldTypes[1], // Liên kết với Basketball Court trong FieldType
    location: locations[1], // Liên kết với Location 2
    user: { userId: 2, userName: "manager" },
    status: "MAINTENANCE",
    // bookingList: [],
    // reviewList: [],
    timeSlotList: [timeSlots[1]],
    // fieldImageList: [],
    // favoriteList: [],
    // fieldFacilityList: [],
    // fieldMaintenanceList: [],
  },
];

export default fields;