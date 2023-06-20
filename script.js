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
    console.log(characters);
    let characterNames = [];
    const charactersContainer = document.getElementById("characters-container");
    charactersContainer.innerHTML = '';

    for (const character of characters) {
        const characterBlock = document.createElement("div");
        
        const characterUrl = character.url;
        const characterResponse = await fetch(characterUrl);
        const characterData = await characterResponse.json();
        const characterProperties = characterData.result.properties;
        const name = characterProperties.name;
        characterNames.push(name);

        characterBlock.classList.add("character-block");
        characterBlock.innerHTML = `
        <h2>${name}</h2>
        <p><b>Height: ${characterProperties.height}</b></p>
        <p><b>Mass: ${characterProperties.mass}</b></p>
        <p><b>Hair Color: ${characterProperties.hair_color}</b></p>
        <p><b>Skin Color: ${characterProperties.skin_color}</b></p>
      `;

      charactersContainer.appendChild(characterBlock);
      }  
      return characterNames;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function fetchVehiclesData(){
    try{
        const response = await fetch(vehiclesApi_url);
        const data = await response.json();
        const vehichels = data.results;
        const vehicleNames = [];

        for (const vehicle of vehichels){
            vehicleNames.push(vehicle.name);   
        }
        return vehicleNames;
    } catch (error){
        console.error("Error fetching data: ",error);
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
            speciesNames.push(s.name);
        }
        return speciesNames;

    } catch (error){
        console.error("Error fetching data:", error);
        return [];
    }
}

async function fetchPlanetsData(){
    try{
        const response = await fetch(planetsApi_url);
        const data = await response.json()
        const planets = data.results;
        const planetsNames = [];

        for(const planet of planets){
            planetsNames.push(planet.name);
        }
        return planetsNames;
    } catch (error){
        console.error("Error fetching data:", error);
        return [];
    }
}

async function fetchStarshipsData(){
    try{
        const response = await fetch(starshipsApi_url);
        const data = await response.json();
        const starships = data.results;
        const startshipsNames = [];

        for(const starship of starships){
            startshipsNames.push(starship.name);
        }
        return startshipsNames;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
async function fetchFilmData(){
    try{
        const response = await fetch(filmApi_url);   
        if(response){
            hideloader();
        } 
        const data = await response.json();
        const films = data.result;
        console.log(films);

        let tab = `
        <tr>
          <th>Title</th>
          <th>Director</th>
          <th>Opening Crawl</th>
          <th>Characters</th>
          <th>Species</th>
          <th>Vehicles</th>
          <th>Starships</th>
          <th>Planets</th>        
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

            tab += `<tr>
            <td>${title}</td>
            <td>${director}</td>
            <td>${opening}</td>
            <td>${characterData}</td>
            <td>${speciesData}</td>
            <td>${vehiclesData}</td>
            <td>${starshipsData}</td>
            <td>${planetsData}</td>           
            </tr>`;
            /*console.log("Film Title:", title);
            console.log("Director:", director);
            console.log("Opening Crawl:", opening);
            console.log("Characters:", characterData);
            console.log("Species:", speciesData);
            console.log("Planets:", planetsData);
            console.log("Starships:", starshipsData);
            console.log("Vehicles:", vehiclesData);
            console.log("-------------------"); */
        }  
        document.getElementById("movies").innerHTML = tab;
    }
    catch (error){
        console.error("Error fetching data:", error);
    }
}

fetchFilmData();

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

