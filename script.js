const characterApi_url = "https://www.swapi.tech/api/people";
const filmApi_url = "https://www.swapi.tech/api/films";
const speciesApi_url = "https://www.swapi.tech/api/species";
const starshipsApi_url = "https://www.swapi.tech/api/starships";
const vehiclesApi_url = "https://www.swapi.tech/api/vehicles";
const planetsApi_url = "https://www.swapi.tech/api/planets";

async function fetchCharacterData() {
  try {
    const response = await fetch(characterApi_url);
    const data = await response.json();
    const characters = data.results;
    let characterNames = [];
    
    for (const character of characters) {
        const characterUrl = character.url;
        const characterResponse = await fetch(characterUrl);
        const characterData = await characterResponse.json();
        const characterProperties = characterData.result.properties;
        const name = characterProperties.name;
        characterNames.push(name);
      }  
      return characterNames;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function fetchSpeciesData(){
    try{
        const response = await fetch(speciesApi_url);
        const data = await response.json();
        const species = data.results;
        const speciesNames = [];

        for ( const s of species){
            const response = await fetch(s.url);
            const data = await response.json();
            const speciesProperties = data.result.properties;
            const name = speciesProperties.name;
            speciesNames.push(name);
        }
        return speciesNames;

    } catch (error){
        console.error("Error fetching data:", error);
        return [];
    }
}

async function fetchFilmData(){
    try{
        const response = await fetch(filmApi_url);    
        const data = await response.json();
        const films = data.result;
        console.log(films);

        let tab = `
        <tr>
          <th>Title</th>
          <th>Director</th>
          <th>Opening Crawl</th>
          <th>Characters</th>
          <th>Planets</th>
          <th>Starships</th>
          <th>Vehicles</th>
          <th>Species</th>
        </tr>`;

        for (const f of films){
            const title = f.properties.title;
            const director = f.properties.director;
            const opening = f.properties.opening_crawl;
            const characters = f.properties.characters;
            const planets = f.properties.planets;
            const starships = f.properties.starships;
            const vehicles = f.properties.vehicles;
            const species = f.properties.species;

            const characterData = await fetchCharacterData(characters); 
            const speciesData = await fetchSpeciesData(species);     
            const vehiclesData = await fetchVehiclesData(vehicles);
            const planetsData = await fetchPlanetsData(planets);
            const starshipsData = await fetchStarshipsData(starships);

            console.log("Film Title:", title);
            console.log("Director:", director);
            console.log("Opening Crawl:", opening);
            console.log("Characters:", characterData);
            console.log("Species:", speciesData);
            console.log("Planets:", planetsData);
            console.log("Starships:", starshipsData);
            console.log("Vehicles:", vehiclesData);
            console.log("-------------------");

        }  
    }
    catch (error){
        console.error("Error fetching data:", error);
    }
}

fetchSpeciesData();
//fetchFilmData();

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
//fetchCharacterData();
