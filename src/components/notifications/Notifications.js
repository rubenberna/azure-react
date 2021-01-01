import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Notifications = () => (
  <ToastContainer
    autoClose={3000}
    hideProgressBar={true}
    closeOnClick
  />
);

export const activate = toast


