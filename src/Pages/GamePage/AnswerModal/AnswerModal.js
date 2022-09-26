import React from 'react';
import s from './AnswerModal.module.css'

const AnswerModal = ({action, text, close}) => {
    return (
        <div onClick={close} className={s.wrapper}>
            <div className={s.content}>
                <div className={s.style_text}>{text}</div>
                    <div onClick={action} className={s.style_btn_answer}>Ответить</div>
                    <div onClick={close} className={s.style_btn_close}>Отмена</div>
            </div>
        </div>
    );
};

export default AnswerModal;