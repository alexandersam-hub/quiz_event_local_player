import React, {useState} from 'react';
import s from './NavBar.module.css'
import contactSvg from '../resource/contact.svg'
import TeamNameModal from "../TeamNameModal/TeamNameModal";

const NavBar = ({title}) => {
    const [isVisibleTeamName, setIsVisibleTeamName] = useState(false)
    return (
        <>
            <div className={s.wrapper}>
                <div className={s.logo}>
                    <div className={s.logo_up}>интерактивная командная игра</div>
                    <div className={s.logo_down}>РОССИЯ В ДЕТАЛЯХ</div>
                </div>
                {title?
                    <img onClick={()=>{setIsVisibleTeamName(true)}} className={s.team_name} src={contactSvg} alt=""/>:
                    <></>
                }

                {/*<div className={s.title}>{title}</div>*/}
            </div>
            {isVisibleTeamName?<TeamNameModal isVisible={setIsVisibleTeamName} text={title}/>:<></>}
        </>
    );
};

export default NavBar;