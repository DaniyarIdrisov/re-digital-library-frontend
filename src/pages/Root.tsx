import {Outlet} from "react-router-dom";
import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";

import "@radix-ui/themes/styles.css";

import 'react-toastify/dist/ReactToastify.css';

import React, {useEffect, useState} from "react";
import AuthContext from "../context/AuthContext.ts";
import {useAccount} from "../QueryHooks/useAccount.ts";
import {toast, ToastContainer} from "react-toastify";

const Root: React.FC = () => {
    const [user, setUser] = useState(null);

    const {data, isError, isSuccess} = useAccount({
        refetchInterval: 60 * 1000,
    });

    useEffect(() => {
        if (isError) {
            toast.error("Не удалось обновить информацию о пользователе")
        }

        if (isSuccess) {
            setUser(data?.data)
        }
    }, [isError, data, isSuccess]);

    return (
        <>
            <AuthContext.Provider value={{user, setUser}}>
                <Header/>
                <Outlet/>
                <Footer/>

                <ToastContainer/>
            </AuthContext.Provider>
        </>
    );
};

export default Root;
