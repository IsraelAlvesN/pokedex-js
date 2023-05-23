const content = document.getElementById('content')
const pokemonList = document.getElementById('pokemonList')
const loadMoreBtn = document.getElementById('loadMoreBtn')
const showAbout   = document.getElementById('showAbout')
const returnDiv   = document.getElementById('returnDiv')
const container   = document.getElementById('container')

const limit = 3
const maxRecords = 30
let offset = 0
let arrayName = []

function loadPokemonItens(offset, limit){

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
         const newHtml = pokemons.map((pokemon) =>`
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
pokemonList.addEventListener('click', (e) => {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            pokemons.map((pokemon) => {
                arrayName.push(pokemon.name)
            })
            const findPokemon = pokemons.find((pokemon, index) => {
                if(e.target.innerHTML === arrayName[index]){
                    return pokemon.name !== arrayName[index] ? '' : pokemon
                }
            })

            showAbout.classList.add(`${findPokemon.type}`)

            const newHtml = `
                    <div class="aboutTitle">
                        <span class="aboutName">${findPokemon.name}</span>
                        <span id="number" class="aboutNumber">#${findPokemon.number}</span>
                        <ol class="aboutType">
                            ${findPokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="aboutImg">
                        <img src=${findPokemon.image}  alt=${findPokemon.name}>
                    </div>

                    <div class="table">
                        <table>
                        <th class="aboutTable">About</th>
                            <tr>
                                <th>Species</th>
                                <td>${findPokemon.species}</td>
                            </tr>
                            <tr>
                                <th>Height</th>
                                <td>${findPokemon.height}</td>
                            </tr>
                            <tr>
                                <th>Weight</th>
                                <td>${findPokemon.weight}</td>
                            </tr>
                            <tr>
                                <th>Abilities</th>
                                ${findPokemon.abilities.map((ability) => `
                                    <td class="${ability}">${ability}, </td>
                                `).join('')}
                            </tr>
                        </table>
                    </div>
            `

            // pokemonList.parentElement.removeChild(pokemonList)
            // pagination.parentElement.removeChild(pagination)
            content.parentElement.removeChild(content)
            showAbout.innerHTML += newHtml
            returnDiv.style.display = 'flex'
        })
    }
)