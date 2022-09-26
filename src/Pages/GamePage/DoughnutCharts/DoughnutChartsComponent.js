import React from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import s from './DoughnutCharts.module.css'

ChartJS.register(ArcElement, Tooltip, Legend)


const DoughnutCharts = ({scoreTeam}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.title}>Статистика ответов вашей команды</div>
            <div className={s.chart_wrapper}>

                <div className={s.chart}>
                    <div className={scoreTeam.score > 0?scoreTeam.score > 9?s.num:s.num_slim:s.num_null}>{scoreTeam.score > 0 ? '+' + scoreTeam.score : 0}</div>
                    <Doughnut style={{display: 'inline-block'}} options={{
                        // responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                            ,
                            title: {
                                display: false,
                                text: 'Chart.js Bar Chart',
                            },
                        },
                    }} data={{
                        text: 'hello',
                        labels: ['Верно', 'Неверно', 'Нет ответа'],
                        datasets: [
                            {
                                label: '# of Votes',
                                data: [scoreTeam.countTrue, scoreTeam.countFalse, scoreTeam.countPlayers - scoreTeam.countTrue - scoreTeam.countFalse],
                                backgroundColor: [
                                    '#D4FFC5',
                                    '#FFC5C5',
                                    '#FFF9C5',
                                ],
                                borderColor: [
                                    '#00FF0A',
                                    '#FF0000',
                                    '#FFB800',
                                ],
                                borderWidth: 1,
                            },
                        ],

                    }}/>
                </div>

                <div className={s.wrapper_legend}>
                    {scoreTeam.countTrue>0?
                        <div className={s.legend_true}>
                            <span className={s.legend_true_color}/>
                            {/*<span className={s.legend_text}>верно - {Math.round(100/scoreTeam.countPlayers * scoreTeam.countTrue)}%</span>*/}
                            <span className={s.legend_text}>верно - {scoreTeam.countTrue}</span>
                        </div>:
                        <></>
                    }
                    {scoreTeam.countFalse>0?
                        <div className={s.legend_false}>
                            <span className={s.legend_false_color}/>
                            {/*<span className={s.legend_text}>неверно - {Math.round(100 / scoreTeam.countPlayers * scoreTeam.countFalse)}%</span>*/}
                            <span className={s.legend_text}>неверно - {scoreTeam.countFalse}</span>
                        </div>:
                        <></>
                    }
                    {scoreTeam.countPlayers - scoreTeam.countTrue - scoreTeam.countFalse?
                        <div className={s.legend_not_answer}>
                            <span className={s.legend_not_answer_color}/>
                            {/*<span className={s.legend_text}>нет ответа - {Math.round(100/scoreTeam.countPlayers * ( scoreTeam.countPlayers - scoreTeam.countTrue - scoreTeam.countFalse))}%</span>*/}
                            <span className={s.legend_text}>нет ответа - {scoreTeam.countPlayers - scoreTeam.countTrue - scoreTeam.countFalse}</span>
                        </div>:
                        <></>
                    }


                </div>
            </div>


        </div>
    );
};

export default DoughnutCharts;