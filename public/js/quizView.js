const addQBtn = document.querySelector('.addQ');

const queModal = document.querySelector('.modal');
const closeSpan = document.querySelector('.close');

const que = document.querySelector('#que');
const addAnswer = document.querySelector('.addAnswer');
const explanation = document.querySelector('#explanation');
const submitQue = document.querySelector('#addQue');

const answers = document.querySelector('#answers');
const questions = document.querySelector('#questions');

const openModal = () => {
    que.value = '';
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild);
    }
    queModal.style.display = "block";
};

const closeModal = () => queModal.style.display = "none";

const addQueToUI = (question, answers)=>{
    const div = document.createElement('div');
    div.classList.add('question');
    
    const h2 = document.createElement('h2');
    h2.innerHTML = question;
    
    const button = document.createElement('button');
    button.classList.add('rounded');
    button.innerHTML = 'edit';

    div.appendChild(h2);
    div.appendChild(button);

    questions.appendChild(div);
}

addQBtn.addEventListener("click", openModal);

closeSpan.addEventListener("click", closeModal);

window.addEventListener("click", (event)=> {
    if (event.target == queModal) {
        closeModal();
    }
});

submitQue.addEventListener('click', (e)=>{
    if (que.value !== '' && answers.children.length >= 2 && explanation.innerHTML !== '') {
        const question = que.value;
        const answers = [];
        // send request

        // add to ui
        addQueToUI(question, answers);
        closeModal();
    }
});

addAnswer.addEventListener('click', (e)=>{

    const div = document.createElement('div');
    div.classList.add('option');

    const rinput = document.createElement('input');
    rinput.setAttribute('type', 'radio');
    rinput.setAttribute('name', 'answerRadio');
    rinput.setAttribute('id', 'ans');
    
    const tinput = document.createElement('input');
    tinput.setAttribute('type', 'text');
    tinput.setAttribute('name', 'answer');

    div.appendChild(rinput);
    div.appendChild(tinput);

    if (answers.children.length === 0) {
        rinput.setAttribute('checked', 'true');
    }

    answers.appendChild(div);
});
