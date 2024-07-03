import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error(error.response);
    const err = error.response;
    if (Array.isArray(err?.data.errors)) {
      for (const val of err?.data.errors) {
        toast.warning(val.description);
      }
    } else if (typeof err?.data.errors === "object") {
      for (const e in err?.data.errors) {
        toast.warning(err.data.errors[e][0]);
      }
    } else if (err?.data) {
      console.log(err.data);
      if (err.data.hasOwnProperty("error")) toast.warning(err.data.error);
      else toast.warning(err.data.message);
    } else if (err?.status == 401) {
      toast.warning("Por favor inicie sesión para continuar!");
      window.history.pushState({}, "", "/login");
    } else if (err) {
      toast.warning(err?.data);
    }
  }
};
