const grey = document.getElementById('grey');
const popus = document.getElementById('popus');
const close = document.getElementById('close');
const containerInside = document.querySelector('.container_first');
const containerInsideDone = document.querySelector('.container_done');
const inputInside = document.getElementById('task');
const add = document.getElementById('add');

grey.addEventListener('click', showCloseWindow);
close.addEventListener('click', showCloseWindow);
container.addEventListener('click', initWindow);
inputInside.addEventListener('keyup', combineTaskButton);
add.addEventListener('click', combineTask);
containerInside.addEventListener('click', switchItem);
containerInsideDone.addEventListener('click', switchItem);
containerInsideDone.addEventListener('click', deleteTask);
containerInside.addEventListener('click', deleteTask);

function showCloseWindow(target){
    if (target.className === 'text' && grey.style.display === 'none'){
        grey.style.display = 'block';
        popus.style.display = 'block';
        close.style.display = 'block';
        initId(target);
    } else {
        grey.style.display = 'none';
        popus.style.display = 'none';
        close.style.display = 'none';
    }
}

function initId(target){
    id = target.id;
    creatLocalStorage(id);
    containerInside.id = id;
    containerInsideDone.id = id;
    const arr = findLocalStorage(id);
    createTask(arr);
}

function title(target) {
    const title_div = document.getElementById('title');
    title_div.innerHTML = '';
    const span = document.createElement('span');
    span.innerText = target.innerText;
    title_div.appendChild(span);
}

function initWindow(e) {
    const target = e.target.className === 'item'
        ? e.target.querySelector('.text') 
        : e.target;

    showCloseWindow(target);
    title(target);
}

function combineTaskButton(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        combineTask(event);
    }
}

function combineTask(e) {
    const item = e.target.parentNode.parentNode;
    const wrapper = item.querySelector('#container_3');
    const container = wrapper.querySelector('.container_first');
    const id = container.id;
    const key = findKeyStorage(id);
    let arr = JSON.parse(localStorage.getItem(key));
    if (inputInside.value) {
        const number = Math.random();
        const listItem = { text: inputInside.value, done: false, id: number };
        arr.push(listItem);
        createTask(arr);
        localStorage.setItem(key, JSON.stringify(arr));
        inputInside.value = '';
    }
}

function createDiv(element,check){
    const div = document.createElement('div');
    div.className = 'item item-inside';

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checkbox-inisde';
    checkBox.checked = check;

    const areaText = document.createElement('span');
    areaText.className = 'text text-inside';
    areaText.id = element.id;
    areaText.innerHTML = element.text;

    const delete_button = document.createElement('input');
    delete_button.className = 'delete-button';
    delete_button.type = 'button';
    delete_button.value = 'X';

    div.appendChild(checkBox);
    div.appendChild(areaText);
    div.appendChild(delete_button);
    return div;
}

function createTask(arr) {
    const checkBox = false;
    containerInside.innerHTML = '';
    containerInsideDone.innerHTML = '';
    
    arr.forEach((element, i) => {
        if (containerInside.id === arr[0] && !element.done && i > 0) {
            const div = createDiv(element, checkBox);
            containerInside.appendChild(div);
        } else if (containerInside.id == arr[0] && element.done && i > 0) {
            const div = createDiv(element, !checkBox);
            containerInsideDone.appendChild(div);
        }
    });
}

function switchItem(e) {
    if (e.target.className === 'checkbox-inisde') {
        const item = e.target.parentNode;
        const spanId = item.querySelector('.text').id;
        const arr = findLocalStorage(id);
        arr.some((el, i) => {
            if (i > 0 && id == arr[0] && el.id == spanId && !el.done) {
                el.done = true;
                localStorage.setItem(id, JSON.stringify(arr));
            } else if (i > 0 && id == arr[0] && el.id == spanId && el.done) {
                el.done = false;
                localStorage.setItem(id, JSON.stringify(arr));
            }
        });
        createTask(arr);
    }
}

function deleteTask(e) {
    if (e.target.className === 'delete-button') {
        const item = e.target.parentNode;
        const spanId = item.querySelector('.text').id;
        const arr = findLocalStorage(id);

        arr.forEach((el, i) => {
            if (el.id == spanId) {
                item.remove();
                arr.splice(i, 1);
                localStorage.setItem(id, JSON.stringify(arr));
            }
        })
    }
}


