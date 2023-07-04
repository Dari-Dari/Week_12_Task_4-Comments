// 0. Получаем элементы
const nameInput = document.getElementById('name');
const linkInput = document.getElementById('link');
const commentInput = document.getElementById('comment');
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


    const name = nameInput.value === "" ? "Гость" : correctName(nameInput.value);
    let link = linkInput.value.trim();
    const comment = checkSpam(commentInput.value);

    //Проверяем положение чекбокса
    const showNameCheckbox = document.getElementById('showName');
    const showName = showNameCheckbox.checked;

    //Прверяем поле ввода ссылки на фото, если оно пустое, то подставляем одно из изображений
    if (link === "") {
        const randomLinks = [
            "https://cdn-icons-png.flaticon.com/512/11224/11224643.png",
            "https://cdn-icons-png.flaticon.com/512/11224/11224647.png",
            "https://cdn-icons-png.flaticon.com/512/11224/11224654.png",
            "https://cdn-icons-png.flaticon.com/512/11224/11224660.png",
            "https://cdn-icons-png.flaticon.com/512/11224/11224666.png",
            "https://cdn-icons-png.flaticon.com/512/11224/11224671.png",
            "https://cdn-icons-png.flaticon.com/512/11224/11224688.png",
            "https://cdn-icons-png.flaticon.com/512/11224/11224695.png",
            "https://cdn-icons-png.flaticon.com/512/11224/11224683.png",
            "https://cdn-icons-png.flaticon.com/512/11224/11224677.png",
            "https://cdn-icons-png.flaticon.com/512/11224/11224713.png",
            "https://cdn-icons-png.flaticon.com/512/11224/11224719.png",
            "https://cdn-icons-png.flaticon.com/512/11224/11224725.png",
            "https://cdn-icons-png.flaticon.com/512/11224/11224733.png",
            "https://cdn-icons-png.flaticon.com/512/11224/11224742.png"
        ];
        const randomLinksIndex = Math.floor(Math.random() * randomLinks.length);
        link = randomLinks[randomLinksIndex];
    }

    // Создаем элементы для вывода комментария
    const profileOutput = document.createElement("div");
    const imgOutput = document.createElement("img");
    const profileInfo = document.createElement("div");
    const nameOutput = document.createElement("p");
    const commentOutput = document.createElement("p");
    const commentDate = document.createElement("p");

    // Устанавливаем значения и классы элементов
    profileOutput.classList.add("comments__profile-output")

    imgOutput.classList.add("comments__img-output");
    imgOutput.src = link;
    imgOutput.alt = "photo";

    profileInfo.classList.add("comments__profile-info")

    nameOutput.classList.add("comments__name-output");
    nameOutput.textContent = showName ? "Аноним" : name;

    commentOutput.classList.add("comments__comment-output");
    commentOutput.textContent = comment;

    commentDate.classList.add("comments_date");
    commentDate.textContent = new Date().toLocaleString('ru-RU');

    // Добавляем элементы в соответствующие контейнеры
    outputContainer.appendChild(profileOutput);
    profileOutput.appendChild(imgOutput);
    profileOutput.appendChild(profileInfo);
    profileInfo.appendChild(nameOutput);
    profileInfo.appendChild(commentOutput);
    profileInfo.appendChild(commentDate);

    // Находим первый комментарий в контейнере вывода и вставляем новый комментарий перед ним
    const firstComment = outputContainer.firstChild;
    outputContainer.insertBefore(profileOutput, firstComment);

    // показываем блок с комментариями
    outputContainer.style.display = 'block';

    // Очищаем поля ввода
    nameInput.value = "";
    linkInput.value = "";
    commentInput.value = "";
}

// 4. Назначаем обработчик на кнопку
const btnSend = document.getElementById('btnSend');
btnSend.addEventListener('click', handleSubmit);