import React from "react";
import { toast } from "react-toastify";

const ToastMessage = (message: string, success: boolean) => {
  success ? toast.success(message) : toast.error(message);
};

export default ToastMessage;
