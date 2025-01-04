async function fetchCountryDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const countryName = urlParams.get('name');

    if (!countryName) {
        document.getElementById('country-details').innerHTML = '<p>País não especificado.</p>';
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`);
        const countryData = await response.json();
        const country = countryData[0];

        const countryDetails = `
           <div class="country-name text-center">${country.name.common}</div>
    <div class="row align-items-center">
        <div class="col-md-5 text-center">
            <img src="${country.flags.svg || country.flags.png}" alt="${country.name.common} flag" class="flag-img">
        </div>
        <div class="col-md-6">
            <table class="table table-striped detalhes mx-auto">
                <tbody>
                    <tr>
                        <th scope="row">Capital</th>
                        <td>${country.capital ? country.capital[0] : 'N/A'}</td>
                    </tr>
                    <tr>
                        <th scope="row">Região</th>
                        <td>${country.region}</td>
                    </tr>
                    <tr>
                        <th scope="row">Sub-região</th>
                        <td>${country.subregion || 'N/A'}</td>
                    </tr>
                    <tr>
                        <th scope="row">População</th>
                        <td>${country.population.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <th scope="row">Área</th>
                        <td>${country.area.toLocaleString()} km²</td>
                    </tr>
                    <tr>
                        <th scope="row">Moeda</th>
                        <td>${Object.values(country.currencies || {})
                            .map(currency => `${currency.name} (${currency.symbol})`)
                            .join(', ')}</td>
                    </tr>
                    <tr>
                        <th scope="row">Idiomas</th>
                        <td>${Object.values(country.languages || {}).join(', ')}</td>
                    </tr>
                    <tr>
                        <th scope="row">Fuso horário</th>
                        <td>${country.timezones.join(', ')}</td>
                    </tr>
                    <tr>
                        <th scope="row">Fronteiras</th>
                        <td>${country.borders ? country.borders.join(', ') : 'Nenhuma'}</td>
                    </tr>
                </tbody>
            </table>
            <div class="text-center mt-3">
                <button id="add-to-favorites" class="btn btn-primary">Adicionar aos Favoritos</button>
            </div>
        </div>
    </div>
        `;

        document.getElementById('country-details').innerHTML = countryDetails;

        // Adicionar evento ao botão "Adicionar aos Favoritos"
        const button = document.getElementById('add-to-favorites');
        if (button) {
            console.log('Botão encontrado, adicionando evento...');
            button.addEventListener('click', () => {
                addToFavorites(country);
            });
        } else {
            console.error('Botão "Adicionar aos Favoritos" não encontrado!');
        }
    } catch (error) {
        console.error('Erro ao buscar detalhes do país:', error);
        document.getElementById('country-details').innerHTML = '<p>Erro ao carregar os detalhes do país.</p>';
    }
}

// Função para salvar país nos Favoritos usando localStorage
function addToFavorites(country) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    const exists = favorites.find(item => item.name === country.name.common);
    if (!exists) {
        favorites.push({
            name: country.name.common,
            flag: country.flags.svg || country.flags.png,
            capital: country.capital ? country.capital[0] : 'N/A',
        });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${country.name.common} foi adicionado aos Favoritos!`);
    } else {
        alert(`${country.name.common} já está nos Favoritos.`);
    }
}


// Chama a função para buscar os detalhes do país
fetchCountryDetails();