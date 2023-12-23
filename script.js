"use strict";

let counter = 1;
let limit = 10;
const wrapper = document.getElementsByClassName('wrapper')[0];

async function fetchDataAndRender() {
    while (counter !== limit) {
        const url = `https://pokeapi.co/api/v2/pokemon/${counter}`;
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network Response was not Ok');
            }

            const data = await response.json();
            const name = data.forms[0].name;

            


            let pokemonID = counter.toString().padStart(3, '0');

            wrapper.innerHTML += `
                <div class="pokemon">
                    <div class="pokemon-image">
                        <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonID}.png" alt="">
                    </div>
                    <div class="pokemon-info">
                        <h3 class="pokemon-name">${name}</h3>
                        <div class="pokemon-id">ID: ${pokemonID}</div>
                        <div class="pokemon-types"> Type:
                        </div>
                    </div>
                </div>
            `;

            const typesDiv = document.getElementsByClassName('pokemon-types')[counter - 1];
            const typesArr = data.types;
            typesArr.forEach(element => {
                typesDiv.innerHTML += `<div class="type">${element.type.name}</div>`;
            });

            

            counter = counter + 1;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

fetchDataAndRender();

function loadMore(){
    counter = limit;
    limit += 21;
    fetchDataAndRender();


}