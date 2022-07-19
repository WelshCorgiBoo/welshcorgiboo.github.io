const toDoForm = document.getElementById("todo_form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo_list");

const TODOS_KEY = "todos";

let toDos = [];


// 로컬 스토리지 저장
function saveToDos(resToDos) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(resToDos));
}

// 내용입력 후 저장
function handleToDoSubmit(e) {
    e.preventDefault();
    
    // 메모한 내역 object화
    const newTodoObj = {
        text: toDoInput.value,
        id: Date.now(),
        completed: false
    };
    toDoInput.value = "";
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos(toDos);

}

// _todo목록에 로컬스토리지 내용 출력
function paintToDo(newTodo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const inputChk = document.createElement("input");
    const button = document.createElement("button");
    const img = document.createElement("img");

    li.id = newTodo.id;

    span.innerText = newTodo.text;

    inputChk.type = "checkbox";
    inputChk.classList.add("checkbox");
    inputChk.value = newTodo.id;
    inputChk.checked = newTodo.completed;
    inputChk.addEventListener("click", checkBoxToggle);
    
    img.src = "img/delBtn.png";
    img.style.cssText = "height: 100%; width: 100%;";
    
    button.appendChild(img);
    button.style.cssText = "height: 15px;";
    button.addEventListener("click", deleteTodo);

    li.appendChild(inputChk);
    li.appendChild(span);

    if (newTodo.completed) {
        const strike = document.createElement("strike");
        strike.innerText = newTodo.text;
        span.innerText = "";
        const msg = document.createElement("span");
        msg.classList.add('completed')
        msg.innerText = " - Completed";
        span.appendChild(strike);
        span.appendChild(msg);
    }
    li.appendChild(button);
    toDoList.appendChild(li);
}

// _todo목록 체크 시 변형
function checkBoxToggle(e) {
    
    // ~ 선택한 li목록의 정보
    const li = e.target.parentElement;

    // ~ toDos배열에 담긴목록중 타겟의 id와 같은 index추출
    const targetIndex = parseInt(toDos.findIndex((toDo) => toDo.id === parseInt(li.id)));
    const originTodo = toDos[targetIndex];
    const span = li.querySelector("span");
    const inputChk = e.target;
    const strike = document.createElement("strike");
    
    // ~ 해당 타겟의 체크가 되어있다면
    if (inputChk.checked) {
        strike.innerText = span.innerText;
        span.innerText = "";
        originTodo.completed = true;
        const msg = document.createElement("span");
        msg.classList.add('completed')
        msg.innerText = " - Completed";
        span.appendChild(strike);
        span.appendChild(msg);
    } else {
        originTodo.completed = false;
        const getStrike = span.querySelector("strike");
        span.innerText = getStrike.innerText;
        getStrike.remove();
    }
    saveToDos();
}

// _todo 목록삭제
function deleteTodo(e) {

    // ~ 타겟의 부모의 부모객체 정보 가져옴 타겟img > 부모 button > 부모 li
    const li = (e.target.parentElement).parentElement;
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    li.remove();
    saveToDos(toDos);
}

// ~ 해당 이벤트 리스너 맨밑에 있으면 밑에 내용이 서브밋으로 초기화됨
toDoForm.addEventListener("submit", handleToDoSubmit);

// ~ 첫 로딩 시 해당 목록이 있으면 전부 출력
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

