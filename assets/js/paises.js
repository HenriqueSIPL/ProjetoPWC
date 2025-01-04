let countriesData = [];

async function fetchAndDisplayCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        countriesData = await response.json();
        displayCountries(countriesData);
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

function displayCountries(countries) {
    const container = document.getElementById('countries-container');
    container.innerHTML = '';

    countries.forEach(country => {
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

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); 
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredCountries = countriesData.filter(country =>
        country.name.common.toLowerCase().includes(searchInput)
    );
    displayCountries(filteredCountries);
});

fetchAndDisplayCountries();
