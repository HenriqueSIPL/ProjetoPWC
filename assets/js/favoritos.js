// Função para exibir os Favoritos armazenados no localStorage
function displayFavorites() {
    // Garantir que o container existe antes de manipular o DOM
    const container = document.getElementById('favorites-container');
    
    if (!container) {
        console.error('Elemento favorites-container não encontrado na página');
        return;
    }

    // Garantir que estamos lidando com dados válidos no localStorage
    let favorites = [];
    try {
        favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    } catch (error) {
        console.error('Erro ao ler dados dos Favoritos:', error);
    }

    if (favorites.length === 0) {
        container.innerHTML = '<p class="text-center">Nenhum país foi adicionado aos Favoritos.</p>';
        return;
    }

    favorites.forEach(country => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <a href="detalhespaises.html?name=${encodeURIComponent(country.name)}" class="text-decoration-none text-dark">
                <div class="card-favoritos">
                    <img src="${country.flag}" class="card-img-top cardFavoritosImg" alt="${country.name} flag">
                    <div class="card-favoritos-body">
                        <h5 class="card-title">${country.name}</h5>
                    </div>
                    <button class="btn btn-danger btn-sm remove-favorite" data-name="${country.name}">Remover</button>
                </div>
            </a>
        `;
        container.appendChild(card);
    });

    // Adicionar eventos para remover favoritos
    document.querySelectorAll('.remove-favorite').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const countryName = event.target.getAttribute('data-name');
            removeFromFavorites(countryName);
        });
    });
}

// Função para remover um país dos Favoritos
function removeFromFavorites(name) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(country => country.name !== name);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert(`${name} foi removido dos Favoritos.`);
    location.reload(); // Atualiza a página para refletir a remoção
}

// Certifique-se de que o DOM esteja carregado antes de chamar a função
document.addEventListener('DOMContentLoaded', () => {
    displayFavorites();
});
