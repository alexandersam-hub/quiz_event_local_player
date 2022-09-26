const IP = '192.168.0.105'
const config = {
    SERVER_SOCKET:'ws://'+IP+':3100',
 //   SERVER_SOCKET:'wss://quizserver.vityazgroup.ru:8500',
    //URL_API:'https://quizserver.vityazgroup.ru:8500/api/',
    URL_API:'http://'+IP+':8011/api/',
    URL_LOGIN:'auth/login',
}

export default config
