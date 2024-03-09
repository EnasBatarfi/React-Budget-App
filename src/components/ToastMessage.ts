// React import
import React from "react";

// Toast notification import
import { toast } from "react-toastify";

// ToastMessage component to display toast messages
const ToastMessage = (message: string, success: boolean) => {
  // Display success or error toast based on the 'success' parameter
  success ? toast.success(message) : toast.error(message);
};

export default ToastMessage;
