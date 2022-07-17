const clock = document.getElementById("clock");
const birthday = document.getElementById("birthday");
const today = document.querySelector("h1#today");

function getNowYmd() {
    return `${getNowYear()}-${getNowMonth()}-${getNowDate()}`;
}
function getNowHms() {
    return `${getNowHours()%12}:${getNowMinutes()}:${getNowSeconds()}`;
}
function getNowApm() {
    return new Date().getHours() >= 12 ? "PM" : "AM";
}
function getNowTime() {
    return new Date().getTime();
}
function getNowYear() {
    return new Date().getFullYear();
}
function getNowMonth() {
    return String(new Date().getMonth()+1).padStart(2, "0");
}
function getNowDate() {
    return String(new Date().getDate()).padStart(2, "0");
}
function getNowHours() {
    return String(new Date().getHours()).padStart(2, "0");
}
function getNowMinutes() {
    return String(new Date().getMinutes()).padStart(2, "0");
}
function getNowSeconds() {
    return String(new Date().getSeconds()).padStart(2, "0");
}
function getNowWeek(){
    const now = new Date().getDay();
    let nowToDay = ['일','월','화','수','목','금','토'];
    return `[${nowToDay[now]}요일]`;
}


function nowClock() {
    clock.innerHTML = `${getNowYmd()} <br/> ${getNowApm()} ${getNowHms()} ${getNowWeek()}`;
    today.innerText = `[ ${getNowYear()}-${getNowMonth()}-${getNowDate()} ] <Today>`;
    birthdayCheck();
}


// 사용자 생일 몇일 남았는지 보여주기
function birthdayCheck() {
    const userBirthDay = localStorage.getItem("userBirthDay");
    if (userBirthDay) {
        if (10 == userBirthDay.length) {
            RemainingBirthday(userBirthDay.substring(5, 10));
        } else {
            alert("생년월일을 형식에 맞게 기입해 주세요.");
            return;
        }
    }
    
}


function RemainingBirthday(userBirth) {

    let birthDayTime = ""; // 생일 시간계산값 기입
    
    
    if (getNowYmd() < `${getNowYear()}-${userBirth}`) {
        birthDayTime = `${getNowYear()}-${userBirth}`;
    } else {
        // 생일이 지나면 1년 추가해서 계산
        birthDayTime = `${getNowYear()+1}-${userBirth}`;
    }
        birthDayTime = parseInt((new Date(`${birthDayTime} 00:00:00`).getTime() - getNowTime())/1000); 
        const birthDayTimeDate = Math.floor(birthDayTime / 60 / 60 / 24);
        const birthDayTimeHours = Math.floor((birthDayTime / 60 / 60) % 24);
        const birthDayTimeMinutes = Math.floor((birthDayTime / 60)% 60);
        const birthDayTimeSeconds = birthDayTime % 60;

        const userBirthDayIndo = `your upcoming birthday<br/><br/>[ ${birthDayTimeDate}d ${birthDayTimeHours}H ${birthDayTimeMinutes}M ${birthDayTimeSeconds}S ]`;
        birthday.innerHTML = userBirthDayIndo;
}

nowClock();
setInterval(nowClock, 1000);