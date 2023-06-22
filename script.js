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
    
    const charactersContainer = document.getElementById("characters-container");
    charactersContainer.innerHTML = '';

    const headingContainer = document.getElementById("heading-container");
    headingContainer.innerHTML = '';

    const characterDataPromises = characters.map(async (character) => {
        const characterUrl = character.url;
        const characterUid = character.uid;
        const characterResponse = await fetch(characterUrl);
        const characterData = await characterResponse.json();
        
        const characterProperties = characterData.result.properties;
        const name = characterProperties.name;
        characterNames.push(name);

        const characterBlock = document.createElement("div");
        characterBlock.classList.add("character-block");
        characterBlock.innerHTML = `
        <h2>${name}</h2>
        <p><b>Height: ${characterProperties.height}</b></p>
        <p><b>Mass: ${characterProperties.mass}</b></p>
        <p><b>Hair Color: ${characterProperties.hair_color}</b></p>
        <p><b>Skin Color: ${characterProperties.skin_color}</b></p>
        `;
        characterBlock.addEventListener("click", () => {
            displayFilms(characterUid,name);
        });

        charactersContainer.appendChild(characterBlock);
      });
      await Promise.all(characterDataPromises);
      return characterNames;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}


async function displayFilms(characterUid, name) {
    try {
      const response = await fetch(filmApi_url);
      const data = await response.json();
      const films = data.result;

      const headingContainer = document.getElementById("heading-container");
      headingContainer.innerHTML = `<h2 style="text-align: center"><b>${name} Filmography</b></h2>`;
     
      const filmsContainer = document.getElementById("characters-container");
      filmsContainer.innerHTML = "";

      for (const film of films) {
        const characters = film.properties.characters;
        const title = film.properties.title;
        const director = film.properties.director;
        const episode = film.properties.episode_id;
        const releaseDate = film.properties.release_date;

        if(characters.includes(characterApi_url + `/${characterUid}`)) {

            const filmElement = document.createElement("div");
            filmElement.classList.add("display-block");
            filmElement.innerHTML =`
            <h2><u>${title}</u></h2>
            <p><b>Release Date : ${releaseDate}</b></p>
            <p><b>Director : ${director}</b></p>
            <p><b>Episode ID : ${episode}</b></p>
            `;            
            filmsContainer.appendChild(filmElement);
            }   
        }
    } catch (error) {
      console.error("Error fetching film data:", error);
    }
  }


async function fetchVehiclesData(){
    try{
        const response = await fetch(vehiclesApi_url);
        const data = await response.json();
        const vehicles = data.results;
        
        const headingContainer = document.getElementById("heading-container");
        headingContainer.innerHTML = '';

        const vehiclesContainer = document.getElementById("characters-container");
        vehiclesContainer.innerHTML = '';
        const vehicleNames = [];

        const vehicleDataPromises = vehicles.map(async (vehicle) => {
            const vehicleUrl = vehicle.url;
            const vehicleResponse = await fetch(vehicleUrl);
            const vehicleData = await vehicleResponse.json();
            
            const vehicleProperties = vehicleData.result.properties;
            const name = vehicleProperties.name;
            vehicleNames.push(name);   
            
            const vehicleBlock = document.createElement("div");
            vehicleBlock.classList.add("display-block");
            vehicleBlock.innerHTML = `
            <h2>${name}</h2>
            <p><b>Model: ${vehicleProperties.model}</b></p>
            <p><b>Passengers: ${vehicleProperties.passengers}</b></p>
            <p><b>Max-speed: ${vehicleProperties.max_atmosphering_speed}</b></p>
            <p><b>Class: ${vehicleProperties.vehicle_class}</b></p>
            `;

            vehiclesContainer.appendChild(vehicleBlock);
        });
        await Promise.all(vehicleDataPromises);
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
        
        const headingContainer = document.getElementById("heading-container");
        headingContainer.innerHTML = '';

        const speciesContainer = document.getElementById("characters-container");
        speciesContainer.innerHTML = '';
        const speciesNames = [];

        const speciesDataPromises = species.map(async (specie) => {
            const speciesUrl = specie.url;
            const speciesResponse = await fetch(speciesUrl);
            const speciesData = await speciesResponse.json();
            
            const speciesProperties = speciesData.result.properties;
            const name = speciesProperties.name;
            speciesNames.push(name);

            const speciesBlock = document.createElement("div");
            speciesBlock.classList.add("display-block");
            speciesBlock.innerHTML = `
            <h2>${name}</h2>
            <p><b>Classification: ${speciesProperties.classification}</b></p>
            <p><b>Language: ${speciesProperties.language}</b></p>
            <p><b>Hair Colors: ${speciesProperties.hair_color}s</b></p>
            <p><b>Height: ${speciesProperties.height}</b></p>
            `;

            speciesContainer.appendChild(speciesBlock);
        });
        await Promise.all(speciesDataPromises);
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

        const headingContainer = document.getElementById("heading-container");
        headingContainer.innerHTML = '';
        
        const planetsContainer = document.getElementById("characters-container");
        planetsContainer.innerHTML = '';
        const planetsNames = [];

        const planetDataPromises = planets.map(async (planet) => {
            const planetUrl = planet.url;
            const planetResponse = await fetch(planetUrl);
            const planetData = await planetResponse.json();
            
            const planetProperties = planetData.result.properties;
            const name = planetProperties.name;
            
            const planetBlock = document.createElement("div");
            planetBlock.classList.add("display-block");
            planetBlock.innerHTML = `
            <h2>${name}</h2>
            <p><b>Population: ${planetProperties.population}</b></p>
            <p><b>Climate: ${planetProperties.climate}</b></p>
            <p><b>Terrain: ${planetProperties.terrain}</b></p>
            <p><b>Day length(hrs): ${planetProperties.rotation_period}</b></p>
            `;

            planetsContainer.appendChild(planetBlock);
            planetsNames.push(name);
        });
        await Promise.all(planetDataPromises);
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

        const headingContainer = document.getElementById("heading-container");
        headingContainer.innerHTML = '';
                
        const starshipsContainer = document.getElementById("characters-container");
        starshipsContainer.innerHTML = '';
        const startshipsNames = [];

        const starshipDataPromises = starships.map(async (starship) => {
            const starshipUrl = starship.url;
            const starshipResponse = await fetch(starshipUrl);
            const starshipData = await starshipResponse.json();
            
            const starshipProperties = starshipData.result.properties;
            const name = starshipProperties.name;
            startshipsNames.push(name);
            
            const starshipBlock = document.createElement("div");
            starshipBlock.classList.add("display-block");
            starshipBlock.innerHTML = `
            <h2>${name}</h2>
            <p><b>Model: ${starshipProperties.model}</b></p>
            <p><b>Class: ${starshipProperties.starship_class}</b></p>
            <p><b>Cost in credits: ${starshipProperties.cost_in_credits}</b></p>
            <p><b>Passengers: ${starshipProperties.passengers}</b></p>
        `;

            starshipsContainer.appendChild(starshipBlock);
        });
        await Promise.all(starshipDataPromises);
        return startshipsNames;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
/*--- Function to fetch film data for later use sometime.....
async function fetchFilmData(){
    try{
        const response = await fetch(filmApi_url);   
        const data = await response.json();
        const films = data.result;

        const headingContainer = document.getElementById("heading-container");
        headingContainer.innerHTML = '';        
        
        const filmsContainer = document.getElementById("characters-container");
        filmsContainer.innerHTML = '';       

        for (const f of films){
            const title = f.properties.title;
            const director = f.properties.director;
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

            const filmBlock = document.createElement("div");
            filmBlock.classList.add("display-block");
            filmBlock.innerHTML = `
            <h2>${title}</h2>
            <p><b>Director : ${director}</b></p>
            <p><b>${characterData}</b></p>
            <p><b>${speciesData}</b></p>
            <p><b>${vehiclesData}</b></p>
            `;
            /*console.log("Film Title:", title);
            console.log("Director:", director);
            console.log("Opening Crawl:", opening);
            console.log("Characters:", characterData);
            console.log("Species:", speciesData);
            console.log("Planets:", planetsData);
            console.log("Starships:", starshipsData);
            console.log("Vehicles:", vehiclesData);
            console.log("-------------------"); 
            filmsContainer.appendChild(filmBlock);
        }  
    }
    catch (error){
        console.error("Error fetching data:", error);
    }
} */


