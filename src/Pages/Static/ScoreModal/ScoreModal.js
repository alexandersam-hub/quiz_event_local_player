import React from 'react';
import s from './ScoreModal.module.css'
import ChartsComponent from "../../GamePage/ChartsComponent/ChartsComponent";

const ScoreModal = ({teamsName, score, closeModal}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <ChartsComponent title={'Счет игры'} score={score} teamsName={teamsName}/>
                <div className={s.btn_cancel} onClick={()=>{
                    closeModal()
                }}>Дальше</div>
            </div>

        </div>
    );
};

export default ScoreModal;