import { ToastContainer, toast, type ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toast = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    );
};

// Helper object for triggering toasts with consistent styling/behavior
export const notify = {
    success: (message: string, options?: ToastOptions) => toast.success(message, options),
    error: (message: string, options?: ToastOptions) => toast.error(message, options),
    info: (message: string, options?: ToastOptions) => toast.info(message, options),
    warning: (message: string, options?: ToastOptions) => toast.warn(message, options),
    default: (message: string, options?: ToastOptions) => toast(message, options),
};