import { IError } from "@/interface/error";
import { toast } from "sonner";

const processError = (err: IError) => {
  const { error, message, status } = err;
  // show toast
  console.error(error);
  if (error && message) {
    toast.error(error, {
      description: message,
    });
  } else {
    toast.error(message);
  }

  return;
};

export default processError;
