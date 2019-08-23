const grey = document.getElementById('grey');
const popus = document.getElementById('popus');
const close = document.getElementById('close');

const input_inside = document.getElementById('task');
const add = document.getElementById('add');
// const container_inside = document.querySelector('.container_first');

const button = document.getElementById('button');
const input = document.getElementById('text');
const arr = JSON.parse(localStorage.getItem('key')) || [];
// let arr_2 = JSON.parse(localStorage.getItem('key_2')) || [];
let id;

grey.addEventListener('click', close_popus);
close.addEventListener('click', close_popus);
button.addEventListener('click', combine);
add.addEventListener('click', combine_task);

function close_popus(e){
    if(e.target === grey || e.target === close){
        grey.style.display = 'none';
        popus.style.display = 'none';
        close.style.display = 'none';
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function show_popus(e){
    let container_inside = document.querySelector('.container_first');
    let container_inside_done = document.querySelector('.container_done');
    let item = e.target;
    let span;
    let ourid;
    if (e.target.className === 'item'){
        grey.style.display = 'block';
        popus.style.display = 'block';
        close.style.display = 'block';

        span = e.target.querySelector('.text');
        ourid = span.id;
    }else{
        return false;
    }
    id = ourid;
    creat_localStorage(id);
    container_inside.id = id;
    container_inside_done.id = id;

    for (let i = 0; i < localStorage.length; i++) {
        let arr = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(arr[0] == id){
            creat_task(arr);
            console.log(arr);
        }
    }
    // let arr = foo(id);
    // creat_task(arr);
}

function find_localStorage(id){
    for (let i = 0; i < localStorage.length; i++){
        let myKey = localStorage.key(i);
        if (id == myKey)
            return myKey;
    }
}

function combine_task(e){
    let item = e.target.parentNode.parentNode;
    let wrapper = item.querySelector('#container_3');
    let container = wrapper.querySelector('.container_first');
    let id = container.id;
    let key = find_localStorage(id)
    let arr = JSON.parse(localStorage.getItem(key));
    console.log(arr);
    if (input_inside.value) {
        let number = Math.random();
        let listItem = { text: input_inside.value, done: false, id: number };
        arr.push(listItem);
        creat_task(arr);
        localStorage.setItem( key, JSON.stringify(arr));
        input_inside.value = '';
    }
}

function creat_text(arr) {
    let container = document.getElementById('container');
    container.innerHTML = '';
    let div;
    let areaText;
    // let checkBox;
    let delete_button;

    arr.forEach( element => {
        if (JSON.parse(localStorage.getItem('key')) && !element.done) {
            div = document.createElement('div');
            div.className = 'item';
            div.addEventListener('click', show_popus);

            // checkBox = document.createElement('input');
            // checkBox.type = 'checkbox';
            // checkBox.className = 'checkbox';
            delete_button = document.createElement('input');
            delete_button.type = 'button';
            delete_button.className = 'delete-button';
            delete_button.value = 'X';
            delete_button.addEventListener('click', delte_element);

            areaText = document.createElement('span');
            areaText.className = 'text';
            areaText.id = element.id;
            areaText.innerHTML = element.text;
            

            // div.appendChild(checkBox);
            div.appendChild(areaText);
            div.appendChild(delete_button);
            container.appendChild(div);
        }
    });
}

function creat_task(arr){
    let container_inside = document.querySelector('.container_first');
    let container_inside_done = document.querySelector('.container_done');
    container_inside.innerHTML = '';
    container_inside_done.innerHTML = '';
    let div;
    let checkBox;
    let areaText;
    
    arr.forEach((element, i) => {
        if (container_inside.id === arr[0] && !element.done && i > 0) {
            div = document.createElement('div');
            div.className = 'item';

            checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.className = 'checkbox-inisde';
            checkBox.addEventListener('click', switch_item);

            areaText = document.createElement('span');
            areaText.className = 'text';
            areaText.id = element.id;
            areaText.innerHTML = element.text;
            div.appendChild(checkBox);
            div.appendChild(areaText);
            container_inside.appendChild(div);
        } else if (container_inside.id == arr[0] && element.done && i > 0){
            div = document.createElement('div');
            div.className = 'item';

            checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.className = 'checkbox-inisde';
            checkBox.checked = 'false';
            checkBox.addEventListener('click', switch_item);

            areaText = document.createElement('span');
            areaText.className = 'text';
            areaText.id = element.id;
            areaText.innerHTML = element.text;
            div.appendChild(checkBox);
            div.appendChild(areaText);
            container_inside_done.appendChild(div);
        }
    });
}
function foo(id){
    let arr = [];
    for (let i = 0; i < localStorage.length; i++) {
        arr = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (arr[0] == id) {
            console.log('our arr')
            console.log(arr);
            return arr = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
    }
}
function switch_item(e) {
    if (e.target.className === 'checkbox-inisde') {
        let item = e.target.parentNode;
        let span = item.querySelector('.text');
        let span_id = span.id;
        let id = item.parentNode.id
        console.log('our id span ' + span.id);
        let key = id;
        console.log('our id div ' + key);
        let arr = foo(id);
        arr.some((el,i) => { 
            console.log('our id el our arr :=' + el.id);
            if (i > 0 && id == arr[0] && el.id == span_id && !el.done) {
                console.log('our id el ' + el.id);
                console.log(true);
                el.done = true;
                localStorage.setItem(key, JSON.stringify(arr));
            } else if (i > 0 && id == arr[0] && el.id == span_id && el.done){
                console.log('our id el ' + el.id);
                console.log(false);
                el.done = false;
                localStorage.setItem(key, JSON.stringify(arr));
            }
        });
        creat_task(arr); 
    }
}

function combine() {
    if(input.value){
        const number = getRandomInt(1000, 100000000);
        let listItem = { text: input.value, done: false, id: number };
        arr.push(listItem);
        localStorage.setItem('key', JSON.stringify(arr));
        creat_text(arr);
        input.value = ''; 
    }
}

function delte_element(e){
    if (e.target.className === 'delete-button'){
        let items = e.target.parentNode;
        let span = items.querySelector('.text');
        let span_id = span.id;
        console.log('spam id: ' + span_id);
        let arr_2 = foo(span_id);
        let key;
        // console.log(main_arr);

        arr.forEach((item, i) =>{
            console.log('item.id: ' + item);
            if(item.id == span_id){  
                arr.splice(i, 1);
                localStorage.setItem('key', JSON.stringify(arr));
            }
        })

        if (arr_2){
            key = arr_2[0];
            localStorage.removeItem(key);
        }
        
        items.remove();
    }else{
        return false;
    }
}

if (JSON.parse(localStorage.getItem('key'))) {
    creat_text(JSON.parse(localStorage.getItem('key')));
}

function creat_localStorage(id) {
    // let key = '';
    // let arr = JSON.parse(localStorage.getItem(''));
    // for(let i = 0; i < localStorage.length; i++){
    //     key = localStorage.key(i);
    //     arr = JSON.parse(localStorage.getItem(key));
    //     console.log(key);
    //     console.log(key,(arr));
    // }
    let arr_x = JSON.parse(localStorage.getItem(id)) || [id];
    console.log(id);
    if (localStorage.key(id)) {
        arr_x = JSON.parse(localStorage.getItem(id));
    } else {
        arr_x = localStorage.setItem(id, JSON.stringify(arr_x));
    }  
}

