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

  // catalog
  CATALOG_GET_PRODUCTS: "/catalog/products",
  CATALOG_GET_PRODUCT: "/catalog/products/:productId",
  CATALOG_CREATE_PRODUCT: "/catalog/products",
  CATALOG_UPDATE_PRODUCT: "/catalog/products/:productId",
  CATALOG_DELETE_PRODUCT: "/catalog/products/:productId",

  CATALOG_GET_PRODUCT_CATEGORIES: "/catalog/categories",
  CATALOG_CREATE_PRODUCT_CATEGORIES: "/catalog/categories",
  CATALOG_UPDATE_PRODUCT_CATEGORIES: "/catalog/categories/:categoryId",
  CATALOG_DELETE_PRODUCT_CATEGORIES: "/catalog/categories/:categoryId",

  // requests
  GET_REQUESTS: "/requests",
  CREATE_REQUEST: "/requests",
  UPDATE_REQUEST: "/requests/:id",

  // market
  GET_MARKETS: "/market",
  GET_MARKET: "/market/:id",
  CREATE_MARKET: "/market",
  UPDATE_MARKET: "/market/:id",
  DELETE_MARKET: "/market/:id",
  GET_MARKET_PRODUCTS: "/market/:marketId/products",
  GET_PRODUCT_TEMPLATE: "/market/get-product-template",
  UPLOAD_PRODUCTS_FROM_SHEETS: "/market/upload-products-from-sheet",

  // farm products
  GET_FARM_PRODUCTS: "/farm-products",
  CREATE_FARM_PRODUCT: "/farm-products",
  UPDATE_FARM_PRODUCT: "/farm-products/:productId",
  DELETE_FARM_PRODUCT: "/farm-products/:productId",
};

export default API_ENDPOINTS;
