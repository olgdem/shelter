// _____SLIDER_____

let offset = 0;
const sliderLine = document.querySelector('.slider-line');

document.querySelector('.slider__button-next').addEventListener('click', function() {
    offset = offset + 360;
    if (offset > 1830) {
    offset = 0; }

    sliderLine.style.left = -offset + 'px';
    });

    document.querySelector('.slider__button-prev').addEventListener('click', function() {
        offset = offset - 360;
        if (offset < 0) {
        offset = 1830; }
    
        sliderLine.style.left = -offset + 'px';
        });


// __________PETS CARDS________

              async function getCards() {
                 const response = await fetch('/pets.json');
                 const content = await response.json();
 
                showCards(content);
              }
              getCards()

              
              async function showCards(content) {

                let list = document.querySelector('.slider-line');
                let cards = content;
                cards.forEach(element => {
                    
                    const item = document.createElement('div');
                    item.classList.add('card');
                    
                    item.innerHTML = 
                                       `
                                       <img src="${element.img}" alt="${element.type}">
                                       <p class="pets-name">${element.name}</p>
                                       <button class="slider-button__learn">Learn more</button>
                                   `
                    list.appendChild(item);
                    let button = item.querySelector('.slider-button__learn');
                    button.addEventListener('click', () => showModal(element.id))
                    
                                    
 });
                 }

                 const popup = document.querySelector('.popup');
                 
                 async function showModal(id) {
                    const response = await fetch('/pets.json');
                    const content = await response.json();
                    const pet = content.find(item => item.id === id);
                  
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
  btnClose.addEventListener("click", () => closeModal());
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

const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const body = document.body;
const navigationMenu = document.querySelector('.navigation');

function mobileMenuOpen () {
  burger.classList.toggle('active');
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
                   
       
        
        

        
        
        
        
        