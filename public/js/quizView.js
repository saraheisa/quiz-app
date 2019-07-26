const addQBtn = document.querySelector('.addQ');

const queModal = document.querySelector('.modal');
const closeSpan = document.querySelector('.close');

const que = document.querySelector('#que');
const addAnswer = document.querySelector('.addAnswer');
const explanation = document.querySelector('#explanation');
const submitQue = document.querySelector('#addQue');

const answers = document.querySelector('#answers');
const questions = document.querySelector('#questions');

const publish = document.querySelector('#publish');

const openModal = () => {
    que.value = '';
    while (answers.firstChild) {
        answers.removeChild(answers.firstChild);
    }
    queModal.style.display = "block";
};

const closeModal = () => queModal.style.display = "none";

const addQueToUI = (question)=>{
    const div = document.createElement('div');
    div.classList.add('question');
    
    const h2 = document.createElement('h2');
    h2.innerHTML = question.que;
    
    const button = document.createElement('button');
    button.classList.add('rounded');
    button.innerHTML = isPublished? 'view' : 'edit';

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
    if (que.value !== '' && answers.children.length >= 2 && explanation.value !== '') {
        const ques = que.value;
        const exp = explanation.value;
        const answersInputs = document.querySelectorAll('#answers [name=answer]');
        let answers = [];
        let correct = '';

        for (const input of answersInputs) {
            answers.push(input.value);
            if (input.previousSibling.checked) {
                correct = input.value;
            }
        }

        const data = {
            que: ques,
            answers,
            correct,
            explanation: exp
        };
        
        const url = `/quizes?id=${quizId}`;

        fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(({ id }) => {
            data._id = id;
            addQueToUI(data);
            closeModal();
        })
        .catch(err => {
            console.error(err);
        });

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

publish.addEventListener('click', (e)=>{

    if (questions.children.length > 0) {
        const url = `/quizes?id=${quizId}`;

        fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token
            }
        }).then(response => response.json())
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        });
    }
    

});
