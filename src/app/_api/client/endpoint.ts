const API_ENDPOINTS = {
  // auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  RESET_PASSWORD: "/auth/reset-password",
  SEND_OTP: "/users/send-otp",
  VERIFY_OTP: "/users/verify-otp",
  VERIFY_ONBOARDING_TOKEN: "/auth/verify-onboarding-token",
  // users
  GET_USERS: "/users",
  GET_USER: "/users/get-user/:id",
  GET_COOPERATIVE_FARMERS: "/users/cooperative-farmers",
  VERIFY_NIN: "/verification/nin",
  UPDATE_USER: "/users",
  FORCE_UPDATE: "/users/force-update",
  GET_PROFILE: "/users/get-user",
  GET_VENDORS: "/users/vendors",
  GET_FARMERS: "/users/farmers",
  GET_COOPERATIVES: "/users/cooperatives",
  SEDN_CONTACT_MAIL: "/contact/send",
  INVITE_USER: "/contact/invite",

  // farm
  GET_FARMS: "/farms",
  GET_FARM: "/farms/:id",
  CREATE_FARM: "/farms/:farmerId",
  UPDATE_FARM: "/farms/:farmId",
  DELETE_FARM: "/farms/:farmId",
  GET_FARM_GALLERY: "/farms/gallery/:farmId",
  CREATE_FARM_GALLERY: "/farms/gallery/:farmId",
  CREATE_FARM_CROPPING: "/farm-cropping",
  GET_FARM_CROPPING_NOTIFICATION: "/farm-cropping/farm/notification/:farmId",
  UPDATE_FARM_ACTIVITY_LOG: "/farms/update-farm-activity-log",
  VERIFY_FARM: "/farms/verify/:farmId/:farmerId",
  PERSONALIZED_CROPPING_CALENDAR: "/farm-personalized-cropping-calendar",
  PERSONALIZED_CROPPING_CALENDAR_STAGE_APP:
    "/farm-personalized-cropping-calendar/stage-application",

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
  GET_REQUESTS_BY_USER: "/requests/by-user",

  // market
  GET_MARKETS: "/market",
  GET_MARKET: "/market/:id",
  CREATE_MARKET: "/market",
  UPDATE_MARKET: "/market/:id",
  DELETE_MARKET: "/market/:id",
  GET_MARKET_PRODUCTS: "/market/:marketId/products",
  GET_PRODUCT_TEMPLATE: "/market/get-product-template",
  GET_PRODUCTS: "/market/products",
  UPLOAD_PRODUCTS_FROM_SHEETS: "/market/upload-products-from-sheet",

  // farm products
  GET_FARM_PRODUCTS: "/farm-crops",
  CREATE_FARM_PRODUCT: "/farm-crops",
  UPDATE_FARM_PRODUCT: "/farm-crops/:productId",
  DELETE_FARM_PRODUCT: "/farm-crops/:productId",

  // overview
  GET_COOPERATIVE_OVERVIEW: "/overview/cooperative",
  GET_VENDOR_OVERVIEW: "/overview/vendor",
  GET_ADMIN_OVERVIEW: "/overview/admin",
  GET_ENUMERATOR_OVERVIEW: "/overview/enumerator",

  // cms
  CMS_GET_POSTS: "/cms/posts",
  CMS_CREATE_POST: "/cms/posts",
  CMS_USER_POST_OVERVIEW: "/cms/my-stats",
  CMS_UPDATE_POST: "/cms/posts/:postId",

  // payment
  PAYMENT_INITIATE: "/payments",
  ADD_FARMERS_FROM_CSV: "/cooperatives/add-farmers-from-csv",
  ADD_FARMER: "/cooperatives/add-farmer/:farmerId",

  // subscriptions
  CREATE_SUBSCRIPTION_PLAN: "/subscription-plans",
  GET_SUBSCRIPTION_PLANS: "/subscription-plans",
  UPDATE_SUBSCRIPTION_PLAN: "/subscription-plans/:id",
  DELETE_SUBSCRIPTION_PLAN: "/subscription-plans/:id",
  GET_MY_SUBSCRIPTION_PLAN: "/subscription-plans/my-plan",
  GET_SUBSCRIPTIONS: "/subscriptions",

  // Enumerator
  REGISTER_FARM: "/enumerator/register-farmer",

  // Admin
  ADMIN_ADD_USER: "/admin/add-user",

  GET_VENDOR_REVIEWS: "/vendor-reviews",
  GET_ZONAL_OFFICER_VENDORS: "/users/zonal-officer-vendors",
  APPROVE_VENDOR_REVIEW: "/vendor-reviews/approve",

  GET_VENDOR_CERTIFICATE: "/certificates/vendor/:vendorId",

  // livestocks
  GET_LIVESTOCKS: "/livestocks",
  GET_LIVESTOCK: "/livestocks/:id",
};

export default API_ENDPOINTS;
