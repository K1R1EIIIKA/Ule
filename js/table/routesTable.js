const routesTable = document.getElementById('table-routes');
const routesArticle = document.getElementById('routes');

const itemsPerPage = 5;
let currentPage = 1;

const API_KEY = 'af55d856-11f2-4f40-8b68-57b23fd2e486'

function displayItems(page, data) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    routesTable.innerHTML = `
        <tr class="table-primary text-center">
            <td class="fw-bold">Название</td>
            <td class="fw-bold">Описание</td>
            <td class="fw-bold">Основные объекты</td>
            <td></td>
        </tr>
    `;

    paginatedData.forEach(item => {
        routesTable.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>${item.mainObject}</td>
                <td><button class="btn btn-primary align-self-center" onclick="fetchGuides(${item.id}, '${item.name}')">
                    Выбрать
                </button></td>
            </tr>
        `;
    });
}

function fetchRoutes() {
    const url = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=' + API_KEY
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Произошла ошибка');
            }
            return response.json();
        })
        .then(data => {
            displayItems(currentPage, data);

            const totalPages = Math.ceil(data.length / itemsPerPage);
            const paginationContainer = document.createElement('nav');
            paginationContainer.setAttribute('aria-label', '...');

            const paginationList = document.createElement('ul');
            paginationList.classList.add('pagination', 'row');

            const previousButton = document.createElement('li');
            previousButton.classList.add('page-item', 'page-item', 'col-2', 'col-md-auto', 'col-sm-auto', 'm-0', 'p-0', 'text-center');
            const previousLink = document.createElement('a');
            previousLink.classList.add('page-link');
            previousLink.href = '#routes';
            previousLink.innerText = 'Назад';
            previousButton.appendChild(previousLink);
            paginationList.appendChild(previousButton);

            previousLink.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    displayItems(currentPage, data);

                    const allPageItems = paginationList.querySelectorAll('.page-item');
                    allPageItems.forEach(item => item.classList.remove('active'));

                    const currentPageItem = paginationList.querySelector(`li:nth-child(${currentPage + 1})`);
                    currentPageItem.classList.add('active');
                }
            });

            for (let i = 1; i <= totalPages; i++) {
                const pageItem = document.createElement('li');
                pageItem.classList.add('page-item', 'page-item', 'col-2', 'col-md-auto', 'col-sm-auto', 'm-0', 'p-0', 'text-center');

                const pageLink = document.createElement('a');
                pageLink.classList.add('page-link');
                pageLink.href = '#routes';
                pageLink.innerText = i;

                if (i === currentPage) {
                    pageItem.classList.add('active');
                }

                pageLink.addEventListener('click', () => {
                    currentPage = i;
                    displayItems(currentPage, data);

                    const allPageItems = paginationList.querySelectorAll('.page-item');
                    allPageItems.forEach(item => item.classList.remove('active'));
                    pageItem.classList.add('active');
                });

                pageItem.appendChild(pageLink);
                paginationList.appendChild(pageItem);
            }

            const nextButton = document.createElement('li');
            nextButton.classList.add('page-item', 'page-item', 'col-2', 'col-md-auto', 'col-sm-auto', 'm-0', 'p-0', 'text-center');
            const nextLink = document.createElement('a');
            nextLink.classList.add('page-link');
            nextLink.href = '#routes';
            nextLink.innerText = 'Вперед';
            nextButton.appendChild(nextLink);
            paginationList.appendChild(nextButton);

            nextLink.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    displayItems(currentPage, data);

                    const allPageItems = paginationList.querySelectorAll('.page-item');
                    allPageItems.forEach(item => item.classList.remove('active'));

                    const currentPageItem = paginationList.querySelector(`li:nth-child(${currentPage + 1})`);
                    currentPageItem.classList.add('active');
                }
            });

            paginationContainer.appendChild(paginationList);
            routesArticle.appendChild(paginationContainer);

        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

fetchRoutes();
