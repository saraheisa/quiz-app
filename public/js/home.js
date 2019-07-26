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
    button.addEventListener('click', openQuiz);

    button.innerHTML = quiz.isPublished? 'view' : 'edit';

    const idSpan = document.createElement('span');
    idSpan.style.display = 'none';
    idSpan.innerHTML = quiz._id;

    actionDiv.append(button, idSpan);

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
        const date = formatDate(new Date());
        const isPublished = false;

        const data = {name, topic, date, isPublished}

        fetch('/quizes',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(({ id }) => {
            data._id = id;
            addQuizToUI(data);
            closeModal();
        })
        .catch(err => {
            console.error(err);
        });
    }
});

const formatDate = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!
    let yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    let today = mm + '/' + dd + '/' + yyyy;

    return today;
};

const openQuiz = ({ target }) =>{
    const id = target.nextSibling.innerHTML;
    const url = `/quizes?id=${id}`;

    fetch(url,{
        method: 'GET',
        headers: {
            token
        }
    })
    .then((res) => {
        window.location.href = url;
    })
    .catch(err => {
        console.error(err);
    });
    
};
