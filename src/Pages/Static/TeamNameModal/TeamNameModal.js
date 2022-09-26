import React from 'react';
import s from './TeamNameModal.module.css'
import ChartsComponent from "../../GamePage/ChartsComponent/ChartsComponent";

const TeamNameModal = ({isVisible, text}) => {
    return (
        <div className={s.wrapper} onClick={()=>{
            isVisible(false)
        }}>
            <div className={s.content}>
                <div className={s.text}>Название вашей команды:</div>
                <div className={s.team_name}>{text}</div>
                <div className={s.btn_cancel} onClick={()=>{
                    isVisible(false)
                }}>Закрыть</div>
            </div>

        </div>
    );
};

export default TeamNameModal;