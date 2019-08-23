const container = document.getElementById('container');
const button = document.getElementById('button');
const input = document.getElementById('text');
const arr = JSON.parse(localStorage.getItem('key')) || [];

let id;

input.addEventListener('keyup', combineButton)
button.addEventListener('click', combine);
container.addEventListener('click', delteElement);
container.addEventListener('click', edit);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findKeyStorage(id){
    for (let i = 0; i < localStorage.length; i++){
        let myKey = localStorage.key(i);
        if (id == myKey)
            return myKey;
    }
}

function createMainDiv(element){
    const div = document.createElement('div');
    div.className = 'item';

    const img = document.createElement('img');
    img.className = 'item-img';
    img.src = arrForm[0];
    img.addEventListener('click', openForm);

    const delete_button = document.createElement('input');
    delete_button.type = 'button';
    delete_button.className = 'delete-button';
    delete_button.value = 'X';

    const edit_button = document.createElement('input');
    edit_button.type = 'button';
    edit_button.className = 'edit-button';
    edit_button.value = 'edit';

    const areaText = document.createElement('span');
    areaText.className = 'text';
    areaText.id = element.id;
    areaText.innerHTML = element.text;

    const extraArea = document.createElement('input');
    extraArea.type = 'text';
    extraArea.className = 'extra';
    extraArea.style.display = 'none';
    

    div.appendChild(img);
    div.appendChild(areaText);
    div.appendChild(extraArea);
    div.appendChild(edit_button);
    div.appendChild(delete_button);
    return div;
}

function creatText(arr) {
    container.innerHTML = '';

    arr.forEach( element => {
        if (JSON.parse(localStorage.getItem('key')) && !element.done) {
            const div = createMainDiv(element);
            container.appendChild(div);
        }
    });
}

function findLocalStorage(id){
    let arr = [];
    for (let i = 0; i < localStorage.length; i++) {
        arr = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (arr[0] == id) {
            return arr = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
    }
}

function combineButton(event){
    if (event.keyCode === 13){
        event.preventDefault();
        combine();
    }
}

function combine() {
    if(input.value){
        const number = getRandomInt(1000, 100000000);
        let listItem = { text: input.value, done: false, id: number };
        arr.push(listItem);
        localStorage.setItem('key', JSON.stringify(arr));
        creatText(arr);
        input.value = ''; 
    }
}

function delteElement(e){
    if (e.target.className === 'delete-button'){
        const items = e.target.parentNode;
        const spanId = items.querySelector('.text').id;
        const arr2 = findLocalStorage(spanId);

        arr.forEach((item, i) =>{
            if (item.id == spanId){  
                arr.splice(i, 1);
                localStorage.setItem('key', JSON.stringify(arr));
            }
        })

        if (arr2){
            arr2[0];
            localStorage.removeItem(arr2[0]);
        }
        
        items.remove();
    }
}

function edit(e){
    const arr = JSON.parse(localStorage.getItem('key'));
    const item = e.target.parentNode;
    const span = item.querySelector('.text');
    const inputExtra = item.querySelector('.extra');
    const checkButton = e.target.classList.contains('edit-button');
    const buttonClass = e.target.classList;

    if (e.target.className === 'edit-button' && checkButton){
        span.style.display = 'none';
        e.target.value = 'save';
        inputExtra.style.display = 'inline';
        inputExtra.value = span.innerText;
        buttonClass.remove('edit-button');
        buttonClass.add('edit-button_2');
    } else if (e.target.className === 'edit-button_2' && !checkButton){
        const id = span.id;
        arr.forEach((el) => {
            if (el.id == id) {
                el.text = inputExtra.value;
                localStorage.setItem('key', JSON.stringify(arr));
            }
        });
        e.target.value = 'edit';
        span.innerText = inputExtra.value;
        inputExtra.style.display = 'none';
        span.style.display = 'inline';
        buttonClass.remove('edit-button_2');
        buttonClass.add('edit-button');
    }
}

if (JSON.parse(localStorage.getItem('key'))) {
    creatText(JSON.parse(localStorage.getItem('key')));
}

function creatLocalStorage(id) {
    let arr = JSON.parse(localStorage.getItem(id)) || [id];
        arr = localStorage.setItem(id, JSON.stringify(arr));
}

