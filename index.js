//TODO Exporta las variables desde estos archivos, e impórtalas en tu archivo index.js. Haz los
//TODO cambios necesarios para que tu proyecto siga funcionando de la misma forma que lo
//TODO hacía al usar el módulo fs, salvo que ahora la información la estarás requiriendo desde
//TODO los archivos, y no leyéndola con el módulo fs.

import { pokemones } from "./pokemones.js";
import { random } from "./random.js";
import axios from "axios";

async function buscarRandom() {
	const arrayUrl = random;
	for (let i = 0; i < arrayUrl.length; i++) {
		axios
			.get(arrayUrl[i])
			.then((respuesta) => {
				const { data } = respuesta;
				console.log("\n");
				console.log(arrayUrl[i]);
				console.log(data);
			})
			.catch((err) => console.log(err));
	}
}

//* Seleccionamos de manera random a un pokemon de la lista
async function randomPokemon() {
	const seleccion = Math.floor(Math.random() * pokemones.length);
	buscarPokemon(pokemones[seleccion]);
}

//* Buscamos por el nombre al pokemon en la pokeapi
function buscarPokemon(pokemon) {
	console.log("Este es mi pokemon: ", pokemon);
	axios
		.get("http://pokeapi.co/api/v2/pokemon")
		.then((respuesta) => {
			const { data } = respuesta;
			for (const seleccion of data.results) {
				if (seleccion.name == pokemon) {
					getInfoPokemon(seleccion.url);
				}
			}
		})
		.catch((err) => console.log(err));
}

function getInfoPokemon(pokemon) {
	console.log(pokemon);
	axios.get(pokemon).then((respuesta) => {
		const { data } = respuesta;
		pokemons(data);
		//console.log(data);
	});
}

//todo Al momento de recibir la respuesta de la consulta a la API de Pokémon, construye un
//todo mensaje escrito con el nombre del Pokémon y describiendo dicho pokemon. Recuerda
//todo utilizar template literals para que la lectura del código sea lo más limpia posible, y ten en
//todo cuenta que puedes emplear destructuring de objetos para extraer la información del
//todo objeto de la respuesta.

const pokemons = ({ name, base_experience, height, weight, order, id, stats }) => {
	const descripcion = `El pokemon ${name} con id ${id} de orden ${order} entrega ${base_experience} puntos de experiencia. 
Físicamente pesa ${weight} Kg y mide ${height} cm.
Sus atributos base son:
    ${stats[0].base_stat}:  ${stats[0].stat.name}
    ${stats[1].base_stat}:  ${stats[1].stat.name}
    ${stats[2].base_stat}:  ${stats[2].stat.name}
    ${stats[3].base_stat}:  ${stats[3].stat.name}
    ${stats[4].base_stat}:  ${stats[4].stat.name}
    ${stats[5].base_stat}:  ${stats[5].stat.name}`;
	console.log(descripcion);
};

buscarRandom();

//! Mas que nada para que el pokemon salga al final
setTimeout(() => {
	randomPokemon();
}, 1000);
