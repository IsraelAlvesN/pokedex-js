const pokemonList = document.getElementById('pokemonList')
const loadMoreBtn = document.getElementById('loadMoreBtn')
const showDetailsBtn = document.getElementById('showDetailsBtn')
const limit = 2
const maxRecords = 2
let offset = 0

function loadPokemonItens(offset, limit){

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
         const newHtml = pokemons.map((pokemon) =>  `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src=${pokemon.image} alt="${pokemon.name}">
                </div>
            </li>
         `).join('')
         pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreBtn.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    //limitando paginação
    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        
        loadMoreBtn.parentElement.removeChild(loadMoreBtn)//desabilitar botão quando chegar ao máximo
    }else{
        loadPokemonItens(offset, limit)
    }

})

//details
