let countriesData = [];
let originalCountriesData = [];  // Armazena os dados originais
let currentPage = 1;
const itemsPerPage = 9;
const $pagination = document.getElementById('pagination');

// Função para buscar dados da API e gerar os cards
async function fetchAndDisplayCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        countriesData = await response.json();
        originalCountriesData = [...countriesData]; // Armazena uma cópia dos dados originais
        displayCountries();
        setupPagination();
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Função para exibir os países no container
function displayCountries() {
    const container = document.getElementById('countries-container');
    container.innerHTML = ''; // Limpa o container antes de exibir os novos resultados

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

// Configurar Paginação
function setupPagination() {
    $pagination.innerHTML = '';
    const totalPages = Math.ceil(countriesData.length / itemsPerPage);

    if (totalPages === 0) return;

    // Anterior
    $pagination.innerHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage - 1}">&laquo;</a>
        </li>
    `;

    // Calcular intervalo
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        $pagination.innerHTML += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" data-page="${i}">${i}</a>
            </li>
        `;
    }

    // Próximo
    $pagination.innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" data-page="${currentPage + 1}">&raquo;</a>
        </li>
    `;

    // Mudar de Página
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

// Evento de pesquisa
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o reload da página
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchInput === '') {
        // Se o campo de pesquisa estiver vazio, restaura a lista completa
        countriesData = [...originalCountriesData];
    } else {
        // Filtra os países com base no nome
        countriesData = originalCountriesData.filter(country =>
            country.name.common.toLowerCase().includes(searchInput)
        );
    }
    
    currentPage = 1; // Reinicia para a primeira página
    displayCountries();
    setupPagination();
});

// Chama a função para buscar e exibir os países
fetchAndDisplayCountries();
