const API_ENDPOINTS = {
  // auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  SEND_OTP: "/users/send-otp",
  VERIFY_OTP: "/users/verify-otp",
  // users
  GET_USERS: "/users",
  VERIFY_NIN: "/verification/nin",

  // farm
  GET_FARMS: "/farms",
  GET_FARM: "/farms/:id",
  CREATE_FARM: "/farms/:farmerId",
  UPDATE_FARM: "/farms/:farmId",
  DELETE_FARM: "/farms/:farmId",
  GET_FARM_GALLERY: "/farms/gallery/:farmId",
  CREATE_FARM_GALLERY: "/farms/gallery/:farmId",
};

export default API_ENDPOINTS;
