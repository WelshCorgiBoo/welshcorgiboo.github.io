const userContainer = document.querySelector('#user_container');
const greeting = document.querySelector('#greeting_container');
const todoContainer = document.querySelector('#todo_container');
const userForm = document.querySelector('#user_form');


const HIDDEN_KEY = "hidden";
const USERNAME_KEY = "userName";
const userName = document.getElementById('user_name');
const userBirthDay = document.getElementById('user_birthDay');



/** 생일 입력폼 변환 */
function BirthDayForm(el) {
    let BirthDay = userBirthDay.value;
    userBirthDay.value = BirthDay.replace(/[^0-9]/g, '').replace(/^(\d{4,4})(\d{2,4})(\d{2})$/, `$1-$2-$3`);
}

function toggle() {
    userContainer.classList.toggle(HIDDEN_KEY);
    greeting.classList.toggle(HIDDEN_KEY);
    todoContainer.classList.toggle(HIDDEN_KEY);
};

if(localStorage.getItem(USERNAME_KEY)) {
    toggle();
    message(getNowHours(), localStorage.getItem(USERNAME_KEY));
} else {
    function setLocalStorage(e) {
        e.preventDefault();
        
        if(null == userName.value || "" == userName.value) {
            alert("이름을 작성해 주세요.");
            return;
        }
        if(10 !== userBirthDay.value.length) {
            alert("생년월일을 8자리 확인해주세요");
            return;
        }
        

        localStorage.setItem(USERNAME_KEY, userName.value);
        localStorage.setItem("userBirthDay", userBirthDay.value);
        toggle();
        message(getNowHours(), localStorage.getItem(USERNAME_KEY));
    }
}



function message(hour, userName) {
    const span = document.createElement("span");
    span.className = "greeting";
    if (hour > 5 && hour < 11) {
        span.innerText = "Good Morning, " + userName + "!!";
    } else if (hour >= 11 && hour < 14) {
        span.innerText = userName + ", Did you have lunch?";
    } else if (hour >= 14 && hour < 17) {
        span.innerText = "Good Afternoon " + userName + "!!";
    } else if (hour >= 17 && hour < 23) {
        span.innerText = "Good Evening, " + userName + "!!";
    } else {
        span.innerText = "Hello~! " + userName;
    }
    greeting.appendChild(span);
}



userBirthDay.addEventListener('input', BirthDayForm);
userForm.addEventListener('submit', setLocalStorage);