

 let originalCards = []; 
 let currentPage = 1;
 let cardsPerPage = getCardsPerPage(); // Определение количества карточек на странице

// // Получение данных и отображение первой страницы
async function getCards() {
    const response = await fetch('/pets.json');
    content = await response.json();
    for (let i = 0; i < 6; i++) {
        originalCards.push(...content);
    }
    console.log(originalCards);
    showCards(currentPage);
    listPage();
    
}
getCards();

// Отображение карточек на странице
 async function showCards(page) {
     let list = document.querySelector('.pets-container');
     list.innerHTML = ''; // Очищаем контейнер перед добавлением новых карточек

     const startIndex = (page - 1) * cardsPerPage;
     const endIndex = startIndex + cardsPerPage;

     const cardsToShow = originalCards.slice(startIndex, endIndex);
     // shuffleArray(cardsToShow);

     cardsToShow.forEach(element => {
         const item = document.createElement('div');
         item.classList.add('card', 'item');
         item.innerHTML = 
             `
             <img src="${element.img}" alt="${element.type}">
             <p class="pets-name">${element.name}</p>
             <button class="modal-button__learn">Learn more</button>
             `;
        
         list.appendChild(item);
         let button = item.querySelector('.modal-button__learn');
         button.addEventListener('click', () => showModal(element.id, currentPage));
     });
 }

 // Перемешивание массива
 function shuffleArray(array) {
     for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
     }
 }

 // Определение количества карточек на странице в зависимости от размера окна
 function getCardsPerPage() {
    if (window.innerWidth <= 320) {
        return 3;  
    } else if (window.innerWidth <= 768) {
        return 6; 
    } else if (window.innerWidth > 769) {
        return 8;  
    }
}

//  function getCardsPerPage() {
//     if (window.innerWidth <= 768) {
//         return 6; 
//     } else if (window.innerWidth >= 320) {
//         return 3;  
//     }
//     else  {
//         return 8;  
//     }
// }

 // Обработчик изменения размера окна
 window.addEventListener('resize', () => {
    const newCardsPerPage = getCardsPerPage();
    if (newCardsPerPage !== cardsPerPage) {
        cardsPerPage = newCardsPerPage;
        currentPage = 1; // Сбрасываем текущую страницу до первой
        listPage();
        changePage(currentPage); // Обновляем отображение с новыми данными
    }
});

 // Переключение страницы и обновление отображения
 function changePage(page) {
     if (page >= 1 && page <= Math.ceil(originalCards.length / cardsPerPage)) {
         currentPage = page;
         showCards(currentPage);
         listPage();
     }
 }







 function listPage() {
    const pagination = document.querySelector('.pagination-list');
    pagination.innerHTML = '';

    // Кнопка "<<" для начала списка
    let firstPage = document.createElement('li');
    firstPage.innerText = '<<';
    firstPage.addEventListener('click', () => {
        if (currentPage !== 1) {
            changePage(1);
        }
    });
    if (currentPage === 1) {
        firstPage.classList.add('disabled', 'first-page'); // Добавление классов
    }
    pagination.appendChild(firstPage);

    // Кнопка "<" для предыдущей страницы
    let prevPage = document.createElement('li');
    prevPage.innerText = '<';
    prevPage.addEventListener('click', () => {
        if (currentPage !== 1) {
            changePage(currentPage - 1);
        }
    });
    if (currentPage === 1) {
        prevPage.classList.add('disabled', 'prev-page'); // Добавление классов
    }
    pagination.appendChild(prevPage);

    // Кнопка с номером текущей страницы
    let currentPageBtn = document.createElement('li');
    currentPageBtn.innerText = currentPage;
    currentPageBtn.classList.add('active');
    pagination.appendChild(currentPageBtn);

    // Кнопка ">" для следующей страницы
    let nextPage = document.createElement('li');
    nextPage.innerText = '>';
    nextPage.addEventListener('click', () => {
        if (currentPage !== Math.ceil(originalCards.length / cardsPerPage)) {
            changePage(currentPage + 1);
        }
    });
    if (currentPage === Math.ceil(originalCards.length / cardsPerPage)) {
        nextPage.classList.add('disabled');
    }
    pagination.appendChild(nextPage);

    // Кнопка ">>" для конца списка
    let lastPage = document.createElement('li');
    lastPage.innerText = '>>';
    lastPage.addEventListener('click', () => {
        const lastPageNumber = Math.ceil(originalCards.length / cardsPerPage);
        if (currentPage !== lastPageNumber) {
            changePage(lastPageNumber);
        }
    });
    if (currentPage === Math.ceil(originalCards.length / cardsPerPage)) {
        lastPage.classList.add('disabled');
    }
    pagination.appendChild(lastPage);
}

  

    const popup = document.querySelector('.popup');
    



async function showModal(id, page) {
    
    const pet = originalCards.find(item => item.id === id);
    console.log(pet);

    popup.classList.add('popup-show');
    document.body.classList.add("stop-scrolling");

    popup.innerHTML = `
        <div class="popup__content">
            <img src="${pet.img}" alt="${pet.type}">
            <div class="popup__text">
                <h5>${pet.name}</h5>
                <span>${pet.type} - ${pet.breed}</span>
                <p>${pet.description}</p>
                <ul>
                    <li><b>Age:</b> ${pet.age}</li>
                    <li><b>Inoculations:</b> ${pet.inoculations}</li>
                    <li><b>Diseases:</b> ${pet.diseases}</li>
                    <li><b>Parasites:</b> ${pet.parasites}</li>
                </ul>
            </div>
        </div>
        <img src="/assets/icons/modal_close_button.svg" class="popup__close" alt="close button" style="width:52px">
    `;

    const btnClose = document.querySelector(".popup__close");
console.log(btnClose);
    if (btnClose) {
        btnClose.addEventListener("click", () => {
            closeModal();
            showCards(page); // Передать текущую страницу при закрытии модального окна
        });
    
        
    }
    
    
    window.addEventListener("click", (e) => {
        if (e.target === popup) {
            closeModal();
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.keyCode === 27) {
            closeModal();
        }
    });
}



     function closeModal() {
       popup.classList.remove("popup-show");
       document.body.classList.remove("stop-scrolling");
     }
     
     window.addEventListener("click", (e) => {
       if (e.target === popup) {
         closeModal();
       }
     })
     
     window.addEventListener("keydown", (e) => {
       if (e.keyCode === 27) {
         closeModal();
       }
     })


   
    //  _______BURGER_______

const burger = document.querySelector('.burger-pets');
const burgerMenu = document.querySelector('.burger-menu');
const body = document.body;
const navigationMenu = document.querySelector('.navigation');

function mobileMenuOpen () {
  burger.classList.toggle('active-pets');
    burgerMenu.classList.toggle('active-burger-menu');
    navigationMenu.classList.toggle('active-nav-menu');
    body.classList.toggle('stop-scrolling');
}


burger.addEventListener('click', function(){
  mobileMenuOpen ();
 
})

burgerMenu.addEventListener('click', function(e) {

  if(e.target != navigationMenu) {
    mobileMenuOpen ();
  }

})

navigationMenu.addEventListener('click', function(){
  mobileMenuOpen ();
})
       
        





        
        
        
        