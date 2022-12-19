'use strict';

const formatDigit = (digit) => `0${digit}`.slice(-2)

const update = (time) => {
    const seconds = document.getElementById('seconds');
    const minutes = document.getElementById('minutes');
    const hours   = document.getElementById('hours');
    const days    = document.getElementById('days');
    
    // (arrancar os minutos) divide por 60 e o resto da divisão armazena na qtd de segundos;
    const qtdSeconds = time % 60;

    // (arrancar as horas) o resto da divisão pela quantidade de segundos;
    const qtdMinutes = Math.floor((time % (60 * 60)) / 60);

    // (arrancar os dias) o resto da divisão pela quantidade de segundos;
    const qtdHours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
    
    // não precisa arrancar, pois não há nada acima de dias
    const qtdDays = Math.floor(time / (60 * 60 * 24));

    seconds.textContent = formatDigit(qtdSeconds);
    minutes.textContent = formatDigit(qtdMinutes);
    hours.textContent   = formatDigit(qtdHours);
    days.textContent    = formatDigit(qtdDays);
}
 
const countDown = time => {
    const stopCount = () => clearInterval(id)
    const count = () => {
        if (time === 0) {
            stopCount();
        }
        update(time);
        time--;
    }
    const id = setInterval(count, 1000);
}

const timeLeft = () => {
    const eventDate = new Date('2022-12-20 20:00:00');
    const today = Date.now();
    return Math.floor((eventDate - today) / 1000);
}

countDown(timeLeft())