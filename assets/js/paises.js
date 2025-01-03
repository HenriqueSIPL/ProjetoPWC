 // Função para buscar dados da API e gerar os cards
 async function fetchAndDisplayCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        const container = document.getElementById('countries-container');

        countries.forEach(country => {
            const countryName = country.name.common;
            const flagUrl = country.flags.svg || country.flags.png;

            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';

            card.innerHTML = `
                <a href="detalhespaises.html?name=${encodeURIComponent(countryName)}" class="text-decoration-none text-dark">
                    <div class="card">
                        <img src="${flagUrl}" class="card-img-top" alt="${countryName} flag">
                        <div class="card-body">
                            <p class="card-text">${countryName}</p>
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

// Chama a função para buscar e exibir os países
fetchAndDisplayCountries();
