import React from 'react';
import native_rus_svg from '../Static/img/native_rus.svg'
import s from './not_found.module.css'
import NavBar from "../Static/NavBar/NavBar";

const NotFoundPage = () => {
    return (
        <>
            <NavBar/>
            <div className={s.wrapper}>
                <div className={s.title}>404</div>
                <img src={native_rus_svg} alt=""/>
                <div className={s.text}>Извините,<br/> страница не найдена</div>
            </div>
        </>
    );
};

export default NotFoundPage;