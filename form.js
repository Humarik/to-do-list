const showForm = document.querySelector('.show-form');
const formWrapper = document.querySelector('.form-wrapper');
const wrapperLeft = document.querySelector('.wrapper-left');
const img = document.querySelector('.img');
const form = document.querySelector('.form');
const arrForm = JSON.parse(localStorage.getItem('img')) || [img.src];
const fileInput = document.querySelector('#file');
const inputName = document.getElementById('input-name');
const acceptButton = document.getElementById('accept');
const userName = document.querySelector('.user-name');

showForm.addEventListener('click', openForm);
acceptButton.addEventListener('click', crateUserName);
// inputName.addEventListener('keyup', userNameButton);

function openForm(){
    formWrapper.classList.toggle('open');
    const element = formWrapper.classList.contains('open');
    if (element){
        wrapperLeft.style.width = '350px';
        showForm.value = 'close';
    }else{
        wrapperLeft.style.width = '0px';
        showForm.value = 'show';
    }
}

function previewFile() { 
    img.src = '';
    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.onloadend = function () {
        img.src = reader.result;
        arrForm.splice(0, 1);
        arrForm.unshift(img.src);
        localStorage.setItem('img', JSON.stringify(arrForm));
    }

    if (file) {
        reader.readAsDataURL(file);
        form.appendChild(img);
    } else {
        alert('error');
    }
}

// function userNameButton(event){ 
//     if (event.keyCode === 13){
//         event.preventDefault();
//         crateUserName();
//     }
// }

function crateUserName (){
    accept.classList.toggle('delete');
    const element = accept.classList.contains('delete');

    if (inputName.value && element){
        userName.innerHTML = inputName.value;
        arrForm[1] = inputName.value;
        inputName.style.display = 'none';
        accept.value = 'delete'
    } else if (!element){
        arrForm.splice(1,1);
        userName.innerHTML = '';
        inputName.value = '';
        inputName.style.display = 'inline-block';
        accept.value = 'accept';
    }
    localStorage.setItem('img', JSON.stringify(arrForm));
}

if (JSON.parse(localStorage.getItem('img'))) {
    img.src = arrForm[0];
    form.appendChild(img);
}

if(arrForm[1]){
    userName.innerHTML = arrForm[1];
    inputName.style.display = 'none';
    accept.value = 'delete'
    accept.classList.toggle('delete');
}