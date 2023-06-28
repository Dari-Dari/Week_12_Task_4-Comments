// 0. Получаем элементы

const nameInput = document.getElementById('name');
const linkInput = document.getElementById('link');
const commentInput = document.getElementById('comment');
const nameOutput = document.querySelector('.comments__name-output');
const imgOutput = document.querySelector('.comments__img-output');
const commentOutput = document.querySelector('.comments__comment-output');
const outputContainer = document.querySelector('.comments__output');

// 1. Функция преобразования имени

function correctName(name) {
    const trimmedName = name.trim();  //удаляем лишние пробелы
    const correctedName = trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase(); // Приводим первую букву к верхнему регистру, остальные к нижнему
    return correctedName
}

// 2. Фильтруем спам

function checkSpam(str) {
    const spamWords = ['viagra', 'xxx', 'fuck'];
    const lowerCaseStr = str.toLowerCase(); //приводим строку и и слова в ней к нижнему регистру 
    let filteredStr = lowerCaseStr;
    // Заменяем спам-слова на ***
    spamWords.forEach(word => {
        filteredStr = filteredStr.replace(new RegExp(word, 'g'), '***');
    });
    return filteredStr;
}

// 3. Добавляем обработчик

function handleSubmit(event) {
    event.preventDefault(); // отменяем стандартное поведение формы

    const name = correctName(nameInput.value);
    const link = linkInput.value;
    const comment = checkSpam(commentInput.value);

    // выводим данные на страницу
    nameOutput.textContent = name;
    imgOutput.src = link;
    commentOutput.textContent = comment;
    // показываем блок с комментариями
    outputContainer.style.display = 'block';

    // очищаем поля ввода
    nameInput.value = "";
    linkInput.value = "";
    commentInput.value = "";
}

// 4. Назначаем обработчик на кнопку

const btnSend = document.getElementById('btnSend');
btnSend.addEventListener('click', handleSubmit);