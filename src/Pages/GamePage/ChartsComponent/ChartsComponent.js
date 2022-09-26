import React from 'react';
import s from './ChartsComponent.module.css'
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

const ChartsComponent = ({teamsName, score, title}) => {
    console.log(teamsName, score)
    return teamsName && teamsName.length >0?(
        <div className={s.wrapper}>
            <div className={s.title}>{title}</div>
            <table className={s.t_score}>
                <tbody>
                {teamsName.map((team, index)=>{
                    return(
                        <tr key={'team_score_'+index}>
                            <td>{team}</td>
                            <td>{score[index]}</td>
                        </tr>
                    )
                })}
                {}

                </tbody>
            </table>
        </div>

    ):(
        <></>
    )
};

export default ChartsComponent;