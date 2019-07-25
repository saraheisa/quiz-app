const addQBtn = document.querySelector('.addQ');

const quizModal = document.querySelector('.modal');
const closeSpan = document.querySelector('.close');

const quizName = document.querySelector('#quizName');
const quizTopic = document.querySelector('#quizTopic');
const submitQuiz = document.querySelector('#addQuiz');

const quizes = document.querySelector('#quizes');

const openModal = () => {
    quizName.value = '';
    quizTopic.value = '';
    quizModal.style.display = "block";
};

const closeModal = () => quizModal.style.display = "none";

const addQuizToUI = (quiz) => {
    const quizDiv = document.createElement('div');
    quizDiv.classList.add('quiz');

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');

    const h2 = document.createElement('h2');
    h2.innerHTML = quiz.name;

    const small = document.createElement('small');
    small.innerHTML = quiz.date;

    detailsDiv.append(h2, small);

    const topicDiv = document.createElement('div');
    topicDiv.classList.add('topic');

    const span = document.createElement('span');
    span.innerHTML = quiz.topic;

    topicDiv.appendChild(span);

    const actionDiv = document.createElement('div');
    actionDiv.classList.add('action');

    const button = document.createElement('button');
    button.classList.add('rounded');

    button.innerHTML = quiz.isPublished? 'view' : 'edit';

    actionDiv.appendChild(button);

    quizDiv.append(detailsDiv, topicDiv, actionDiv);

    quizes.appendChild(quizDiv);

};

addQBtn.addEventListener("click", openModal);

closeSpan.addEventListener("click", closeModal);

window.addEventListener("click", (event)=> {
    if (event.target == quizModal) {
        closeModal();
    }
});

submitQuiz.addEventListener('click', (e)=>{
    if (quizName.value !== '' && quizTopic.value !== '') {
        const name = quizName.value;
        const topic = quizTopic.value;
        // send request and redirect to quiz view

    }
});
