import React from 'react';
import Cookies from 'js-cookie';
import Loader from "../Static/Loader/Loader";
import {useParams} from "react-router-dom";

const QrAuthPage = () => {

    const {id, token} = useParams()
    Cookies.remove('room')
    Cookies.remove('token')
    if(id)
        Cookies.set('room', id)
    if(token)
        Cookies.set('token', token)
    document.location.href = document.location.origin
    return (
        <div>
            <Loader/>
        </div>
    );
};

export default QrAuthPage;