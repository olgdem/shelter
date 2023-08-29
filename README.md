# shelter

This site I made to practice:

![](https://img.shields.io/badge/-HTML-DC143C)
![](https://img.shields.io/badge/-CSS-DC143C)
![](https://img.shields.io/badge/-SVG-DC143C)
![](https://img.shields.io/badge/-Flexbox-DC143C)
![](https://img.shields.io/badge/-Java%20script-DC143C)
![](https://img.shields.io/badge/-slider-DC143C)
![](https://img.shields.io/badge/-pagination-DC143C)
![](https://img.shields.io/badge/-JSON-DC143C)
![](https://img.shields.io/badge/-async%20await-DC143C)
![](https://img.shields.io/badge/-adaptive%20design-DC143C)
![](https://img.shields.io/badge/-adaptive%20slider-DC143C)
![](https://img.shields.io/badge/-backgrounds-DC143C)
![](https://img.shields.io/badge/-media%20queries-DC143C)
![](https://img.shields.io/badge/-multipage%20site-DC143C)

I learned how to work with two pages site and pagination. I improve my skills with sliders, JSON files, async await functions and Java script. It was interesting for me to make such site for me. I like difficult tasks and it was an instructive work.

![screenshot](/Screenshot_shelter.jpg)

## My code

```

function listPage() {
    const pagination = document.querySelector('.pagination-list');
    pagination.innerHTML = '';

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

    let prevPage = document.createElement('li');
    prevPage.innerText = '<';
    prevPage.addEventListener('click', () => {
        if (currentPage !== 1) {
            changePage(currentPage - 1);
        }
    });

```
