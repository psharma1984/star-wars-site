const characterApi_url = "https://www.swapi.tech/api/people";
const filmApi_url = "https://www.swapi.tech/api/films";
const speciesApi_url = "https://www.swapi.tech/api/species";
const starshipsApi_url = "https://www.swapi.tech/api/starships";
const vehiclesApi_url = "https://www.swapi.tech/api/vehicles";
const planetsApi_url = "https://www.swapi.tech/api/planets";

async function fetchCharacters() {
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
  
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
  
        const characterImage = document.createElement("img");
        characterImage.src = `photos/${characterUid}.jpeg`;
        imageContainer.appendChild(characterImage);


        const characterName = document.createElement("h2");
        characterName.innerHTML = `<h2 style="text-align:center">${name}</h2>`;
  
        characterBlock.appendChild(imageContainer);
        characterBlock.appendChild(characterName);
  
        charactersContainer.appendChild(characterBlock);

        characterBlock.addEventListener("click", () => {
            displayCharacterInfo(characterUid,name);
        }); 
        
      });
  
      await Promise.all(characterDataPromises);
      return characterNames;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  }
  
  async function displayCharacterInfo(characterUid, name) {
    try {

        const characterResponse = await fetch(`${characterApi_url}/${characterUid}`);
        const characterData = await characterResponse.json();
        const character = characterData.result;

        const filmResponse = await fetch(filmApi_url);
        const filmData = await filmResponse.json();
        const films = filmData.result;

        const headingContainer = document.getElementById("heading-container");
        headingContainer.innerHTML = `<h1 style="text-align: center">${name.toUpperCase()}</h1>`;
     
        const characterContainer = document.getElementById("characters-container");
        characterContainer.innerHTML = ""; 

        const characterBlock = document.createElement("div");
        characterBlock.classList.add("character-block");

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        const characterImage = document.createElement("img");
        characterImage.src = `photos/${characterUid}.jpeg`;
        imageContainer.appendChild(characterImage);
        characterBlock.appendChild(imageContainer)

        const characterInfo = document.createElement("div");
        characterInfo.innerHTML = `
        <p>Birth Year : ${character.properties.birth_year}</p>
        <p>Height : ${character.properties.height}m</p>
        <p>Weight : ${character.properties.mass} kg</p>
        <p>Gender : ${character.properties.gender}</p>
        <p>Hair Color : ${character.properties.hair_color}</p>
        <p>Skin Color : ${character.properties.skin_color}</p>
        <p>Eye Color : ${character.properties.eye_color}</p>
        `;
        characterBlock.appendChild(characterInfo);
        characterContainer.appendChild(characterBlock);

        const filmElement = document.createElement("div");
        filmElement.classList.add("display-block");

        const filmHeading = document.createElement("h2");
        filmHeading.textContent= "FILMOGRAPHY";
        filmElement.appendChild(filmHeading); 

        const filmInformation = document.createElement("div");
        filmInformation.classList.add("characters-container");

        for (const film of films) {
            const characters = film.properties.characters;
            const title = film.properties.title;

            const filmTitles = document.createElement("div");
            filmTitles.classList.add("film-container");

            if(characters.includes(characterApi_url + `/${characterUid}`)) {
                const filmPoster = document.createElement("div");
                filmPoster.classList.add("image-container");
                const poster = document.createElement("img");
                poster.src = `movies/${title}.jpeg`;
                filmPoster.appendChild(poster);
                const filmTitle = document.createElement("h4");
                filmTitle.innerHTML = `${title}`;
                filmTitles.appendChild(filmPoster);
                filmTitles.appendChild(filmTitle);            
            }   
            filmInformation.appendChild(filmTitles);
        }
        filmElement.appendChild(filmInformation);
        characterContainer.appendChild(filmElement);
        
    } catch (error) {
      console.error("Error fetching film data:", error);
    }
  }


async function displayCharacters(title){
    try{
        const response = await fetch(`${filmApi_url}?title=${encodeURIComponent(title)}`);
        const data = await response.json();
        const films = data.result;
        if (films.length > 0){
            //film found
            const film = films[0];
            const title = film.properties.title;
            const director = film.properties.director;
            const releaseDate = film.properties.release_date;
            const characters = film.properties.characters;

            //const characterData = await fetchCharacterData(characters); 





        }
    }catch (error) {
        console.error("Error fetching film data:", error);
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


