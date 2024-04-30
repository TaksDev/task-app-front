import { toast, type ToastOptions } from "vue3-toastify";

export function showErrorAlert(text: string) {
  return toast.error(text, {
    theme: "colored",
    autoClose: 3000,
    position: toast.POSITION.BOTTOM_RIGHT,
  } as ToastOptions);
}

export function showSuccessAlert(text: string) {
  return toast.success(text, {
    // theme: "colored",
    autoClose: 3000,
    position: toast.POSITION.TOP_RIGHT,
  } as ToastOptions);
}
