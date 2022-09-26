import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import config from "../../config";
import Maps from "./Maps/Maps";
import NavBar from "../Static/NavBar/NavBar";
import s from './GamePage.module.css'
import AnswerModal from "./AnswerModal/AnswerModal";
import ChartsComponent from "./ChartsComponent/ChartsComponent";
import DoughnutCharts from "./DoughnutCharts/DoughnutChartsComponent";
import loader_img from "../Static/Loader/loader.svg";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'
import MapsMobile from "../MapsMobile/MapsMobile";
// import DoughnutCharts from "./DoughnutCharts/DoughnutCharts";

const GamePage = () => {

    const [token, setToken] = useState('')
    const [room, setRoom] = useState('')
    const [currentWs, setWs] = useState({})
    const [teamName, setTeamName] = useState('')
    const [teamsName, setTeamsName] = useState([])
    const [score, setScore] = useState([])
    const [scoreTeam, setScoreTeam] = useState({})
    const [isViewScore, setIsViewScore] = useState(false)
    const [isViewScoreTeam, setIsViewScoreTeam] = useState(false)
    const [question, setQuestion] = useState({})
    const [isLoad, setIsLoad] = useState(false)
    const [userId, setUserId] = useState(-1)
    const [isStart, setIsStart] = useState(false)
    const [isFinish, setIsFinish] = useState(false)
    const [quiz, setQuiz] = useState({})
    const [currentTask, setCurrentTask] = useState({})
    const [answer, setAnswer] = useState('')
    const [isAnswerSend, setIsAnswerSend] = useState(false)
    const [isViewModalAnswer, setIsViewModalAnswer] = useState(false)

    const stupidPhrase = ['Ждем загрузки викторин', 'Загружаем вопросы', 'Кажется не все вопросы загрузились', 'Быстро дописываем вопросы', 'Ждем редактора, он скоро придет', 'Редактор сказал, что некоторые вопросы откровенный бред', 'Взламываем базу вопросов из различных телевизионных игр', 'Нас вычислили по ip адресу, пришлось переезжать', 'А вы знаете хороший VPN?', 'Ведущий, нажми уже кнопку «Старт»', 'Это та синяя кнопка',' Сервер уже дымится от ожидания']
    const [stupidIndex,setStupidIndex] = useState(0)
    const [trueAnswer, setTrueAnswer] = useState('')

    const sendAnswer = () => {
        currentWs.send(JSON.stringify({action: 'get_score'}))
        setIsAnswerSend(true)
        currentWs.send(JSON.stringify({action: 'answer', type: 'user', room: room, token: token, answer, userId}))
    }

    const setAnswerFromMap = (data)=>{
        if (data) {
            setAnswer(data)
            setIsViewModalAnswer(true)
        }
    }

    const closeModalAnswer = ()=>{
        setIsViewModalAnswer(false)
    }

    const init = ()=>{
        const tokenCookie = Cookies.get('token')
        const roomCookie = Cookies.get('room')
        const sessionCookie = Cookies.get('session')
        const userIdCookie = Cookies.get('user_id')


        if (!tokenCookie || !roomCookie)
            document.location.href = './not_found'
        setRoom(roomCookie)
        setToken(tokenCookie)
        const ws = new WebSocket(config.SERVER_SOCKET)
        ws.onopen = function () {
            console.log("подключился");
            ws.send(JSON.stringify({
                action: 'login',
                type: 'user',
                room: roomCookie,
                session: sessionCookie ? sessionCookie : 'none',
                userId: userIdCookie && Number(userIdCookie) ? Number(userIdCookie) : -1,
                token: tokenCookie
            }));
        };
        ws.onclose = ()=>{
            init()
        }
        ws.onmessage = function (message) {
            const data = JSON.parse(message.data)
            console.log("Message", data);
            switch (data.action) {
                case 'game':
                    setIsViewScoreTeam(false)
                    setQuestion(data.question)
                    setIsStart(data.isStart)
                    setQuiz(data.quiz)
                    if (currentTask !== data.currentTask)
                        setIsAnswerSend(false)
                    setCurrentTask(data.currentTask)
                    setUserId(data.userId)
                    setIsAnswerSend(data.isAnswer)
                    setTeamName(data.teamName)
                    Cookies.set('user_id', data.userId)
                    Cookies.set('session', data.session)
                    break
                case 'report_answer':
                    break
                case 'score':
                    setScoreTeam({score:data.score, countTrue:data.countTrue, countFalse:data.countFalse, countPlayers:data.countPlayers})
                    setIsViewScoreTeam(true)
                    setTrueAnswer(data.answer)
                    console.log('score')
                    break
                case 'get_score':
                    setScore(data.score)
                    setTeamsName(data.teamsName)
                    setIsViewScore(true)
                    if(data.stepRound && data.stepRound === 'finish'){
                        setIsViewScoreTeam(false)
                        setIsFinish(true)
                    }

                    break
                case 'error':
                    window.location.href = window.location.origin+'/error'
                    break
            }
        };
        setWs(ws)
    }

    useEffect(() => {
        let x = 0


            setInterval(()=>{
                setStupidIndex(x+1)
                x++
                if(x>= stupidPhrase.length-1)
                    x = 0
            },5200)

        // document.body.addEventListener("touchmove", e=>{ console.log( window )}, false);
      init()

    }, [])
    return !isViewScoreTeam?(

        <div className={s.wrapper}>
            <NavBar title={teamName}/>
            {/*<div className={s.user_id}>{userId}</div>*/}
            <div className={s.content}>
            {quiz && quiz.title ? <div className={s.title}>{quiz.title}</div> : <></>}
            {!isStart?   <div className={s.wrapper_waiting_launch}>
                <div className={s.team_name}>Название вашей команды: <br/> {teamName}</div>
                <div className={s.waiting_launch}>Ждем запуска игры</div>
                <img className={s.loader_img} src={loader_img} alt=""/>
                <div className={s.stupid_phrase}>{stupidPhrase[stupidIndex]}</div>
                {/*    // if(index>0)*/}
                {/*    //     await setInterval(()=>{},1200)*/}
                {/*    return(*/}
                {/*        <div key={'stupidPhrase'}>{phras}</div>*/}
                {/*    )*/}
                {/*})}*/}
            </div>:<></>}
                {isFinish?
                    <div>
                        <div className={s.answer_ready}>Игра завершена</div>
                        <ChartsComponent title={'Счет игры'} teamsName={teamsName} score={score}/>
                    </div>
                   :
                    <></>
                }
            {!isFinish && isStart && isAnswerSend?
                <div className={s.score_wrapper}>
                    <div className={s.answer_ready}>Ответ принят</div>
                    <div className={s.score}><ChartsComponent title={'Счет игры на текущий момент'} teamsName={teamsName} score={score}/></div>

                </div>:<></>
            }
            {!isFinish && isStart && !isAnswerSend?
                <div className={s.content_question}>
                    <div className={s.wrapper_quest}>
                        <div>Вопрос №{currentTask + 1}</div>
                        {question && question.text ? <div>{question.text}</div> : <></>}
                    </div>
                    <BrowserView>
                        <div className={s.map}>
                            <Maps answer={answer} setAnswer={setAnswerFromMap}/>
                        </div>
                    </BrowserView>
                    <MobileView>
                        <div className={s.map}>
                            <MapsMobile answer={answer} setAnswer={setAnswerFromMap}/>
                        </div>
                    </MobileView>

                    {/*<div>{answer}</div>*/}
                    {/*{answer ? <div className={s.btn_answer} onClick={() => {*/}
                    {/*    sendAnswer()*/}
                    {/*}}>Ответить</div> : <></>}*/}
                </div>:<></>
            }


            {isViewModalAnswer?<AnswerModal text={answer} close={closeModalAnswer} action={sendAnswer}/>:<></>}
            </div>
        </div>
    ):(
        <>
            <NavBar/>

            <div className={s.pie_charts}>
                <DoughnutCharts scoreTeam={scoreTeam}/>
            </div>
            <div className={s.true_answer}>Правильный ответ:<br/> {trueAnswer}</div>
        </>

    )
};

export default GamePage;