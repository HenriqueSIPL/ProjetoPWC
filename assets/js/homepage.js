async function fetchRandomCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();

        // Selecionar 3 países aleatórios
        const randomCountries = countries.sort(() => 0.5 - Math.random()).slice(0, 3);
        const container = document.getElementById('countries-container');

        randomCountries.forEach(country => {
            const countryName = country.name.common;
            const flagUrl = country.flags.svg || country.flags.png;

            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';

            card.innerHTML = `
                <a href="detalhespaises.html?name=${encodeURIComponent(countryName)}" class="text-decoration-none text-dark">
                    <div class="card-paisaleatorio h-100">
                        <img src="${flagUrl}" class="card-paisaleatorio-img-top" alt="${countryName} flag">
                        <div class="card-paisaleatorio-body">
                            <p class="card-paisaleatorio-text">${countryName}</p>
                        </div>
                    </div>
                </a>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

fetchRandomCountries();