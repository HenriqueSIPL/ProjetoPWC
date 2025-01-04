let countriesData = [];
let originalCountriesData = [];
let currentPage = 1;
const itemsPerPage = 9;
const $pagination = document.getElementById('pagination');

async function fetchAndDisplayCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        countriesData = await response.json();
        originalCountriesData = [...countriesData];
        displayCountries();
        setupPagination();
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

function displayCountries() {
    const container = document.getElementById('countries-container');
    container.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const countriesToDisplay = countriesData.slice(start, end);

    countriesToDisplay.forEach(country => {
        const countryName = country.name.common;
        const flagUrl = country.flags.svg || country.flags.png;

        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';

        card.innerHTML = `
            <a href="detalhespaises.html?name=${encodeURIComponent(countryName)}" class="text-decoration-none text-dark">
                <div class="card-paises">
                    <img src="${flagUrl}" class="card-paises-img-top" alt="${countryName} flag">
                    <div class="card-paises-body">
                        <p class="card-paises-text">${countryName}</p>
                    </div>
                </div>
            </a>
        `;

        container.appendChild(card);
    });
}


function setupPagination() {
    $pagination.innerHTML = '';
    const totalPages = Math.ceil(countriesData.length / itemsPerPage);

    if (totalPages === 0) return;

    $pagination.innerHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">&laquo;</a>
        </li>
    `;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        $pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    $pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">&raquo;</a>
        </li>
    `;

    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = parseInt(this.getAttribute('data-page'));
            if (!isNaN(page) && page >= 1 && page <= totalPages) {
                currentPage = page;
                displayCountries();
                setupPagination();
            }
        });
    });
}

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchInput === '') {
        countriesData = [...originalCountriesData];
    } else {
        countriesData = originalCountriesData.filter(country =>
            country.name.common.toLowerCase().includes(searchInput)
        );
    }
    
    currentPage = 1;
    displayCountries();
    setupPagination();
});

fetchAndDisplayCountries();