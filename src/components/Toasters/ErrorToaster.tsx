import {Bounce, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ErrorToaster = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
            transition={Bounce}
        />
    )
}

export default ErrorToaster;