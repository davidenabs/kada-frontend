import { IError } from "@/interface/error";
import { toast } from "sonner";

const processError = (err: IError) => {
  const { error, message, status } = err;
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
