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
            <div class="country-name">${country.name.common}</div>
            <div class="row align-items-center">
                <div class="col-md-5">
                    <img src="${country.flags.svg || country.flags.png}" alt="${country.name.common} flag" class="flag-img">
                </div>
                <div class="container col-md-5">
                    <div class="country-info">
                        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                        <p><strong>Região:</strong> ${country.region}</p>
                        <p><strong>Sub-região:</strong> ${country.subregion || 'N/A'}</p>
                        <p><strong>População:</strong> ${country.population.toLocaleString()}</p>
                        <p><strong>Área:</strong> ${country.area.toLocaleString()} km²</p>
                        <p><strong>Moeda:</strong> ${Object.values(country.currencies || {}).map(currency => `${currency.name} (${currency.symbol})`).join(', ')}</p>
                        <p><strong>Idiomas:</strong> ${Object.values(country.languages || {}).join(', ')}</p>
                        <p><strong>Fuso horário:</strong> ${country.timezones.join(', ')}</p>
                        <p><strong>Fronteiras:</strong> ${country.borders ? country.borders.join(', ') : 'Nenhuma'}</p>
                        <button id="add-to-favoritzes" class="btn btn-primary">Adicionar aos Favoritos</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('country-details').innerHTML = countryDetails;

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

function addToFavorites(country) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    console.log('Favoritos antes de adicionar:', favorites);
    
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

fetchCountryDetails();
