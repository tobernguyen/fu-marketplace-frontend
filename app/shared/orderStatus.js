const orderStatus = {
  NEW: 0,
  ACCEPTED: 1,
  SHIPPING: 2,
  COMPLETED: 3, // finish by seller
  REJECTED: 4, // by seller
  CANCELED: 5,  // by buyer
  ABORTED: 6 // by seller
};

export default orderStatus;
