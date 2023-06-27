const characterApi_url = "https://www.swapi.tech/api/people";
const filmApi_url = "https://www.swapi.tech/api/films";

async function fetchCharacters() {
    try {
      const response = await fetch(characterApi_url);
      const data = await response.json();
      const characters = data.results;
  
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
  
        const characterBlock = document.createElement("div");
        characterBlock.classList.add("character-block");
  
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
  
        const characterImage = document.createElement("img");
        characterImage.src = `people/${characterUid}.jpg`;
        imageContainer.appendChild(characterImage);


        const characterName = document.createElement("h2");
        characterName.innerHTML = `<h2 style="text-align:center">${name}</h2>`;
  
        characterBlock.appendChild(imageContainer);
        characterBlock.appendChild(characterName);
  
        charactersContainer.appendChild(characterBlock);

        characterBlock.addEventListener("click", () => {
            window.location.href = "people.html?characterUid=" + encodeURIComponent(characterUid);
        });         
      });  
      await Promise.all(characterDataPromises);
    } catch (error) {
      console.error("Error fetching data: ", error);
      return [];
    }
  }
  
  async function displayCharacterInfo(characterUid) {
    try {

        const characterResponse = await fetch(`${characterApi_url}/${characterUid}`);
        const characterData = await characterResponse.json();
        const character = characterData.result;
        const name = character.properties.name;

        const filmResponse = await fetch(filmApi_url);
        const filmData = await filmResponse.json();
        const films = filmData.result;

        const headingContainer = document.getElementById("heading-container");
        headingContainer.innerHTML = `<h1 style="text-align: center">${name.toUpperCase()}</h1>`;
     
        const characterImage = document.getElementById("characterImage");
        characterImage.src = `people/${characterUid}.jpg`;

        const characterInfo = document.getElementById("characterInfo");
        characterInfo.innerHTML = `
        <p>Birth Year : ${character.properties.birth_year}</p>
        <p>Height : ${character.properties.height}m</p>
        <p>Weight : ${character.properties.mass} kg</p>
        <p>Gender : ${character.properties.gender}</p>
        <p>Hair Color : ${character.properties.hair_color}</p>
        <p>Skin Color : ${character.properties.skin_color}</p>
        <p>Eye Color : ${character.properties.eye_color}</p>
        `;
        
        const filmInformation = document.getElementById("filmInformation");

        for (const film of films) {
            const characters = film.properties.characters;
            const title = film.properties.title;
            const filmUid = film.uid;

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
            filmTitles.addEventListener("click", () => {
                window.location.href = "movie.html?filmUid=" + encodeURIComponent(filmUid);
            });             
        }
    } catch (error) {
      console.error("Error fetching film data:", error);
    }
  }

// Function to fetch movies.....
async function fetchMovies(){
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
            const filmUid = f.uid;
           
            const filmBlock = document.createElement("div");
            filmBlock.classList.add('character-block');
            
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");

            const image = document.createElement("img");
            image.src = `movies/${title}.jpeg`;
            imageContainer.appendChild(image);

            const filmName = document.createElement("h3");
            filmName.innerHTML = `<h3 style='text-align:center'>${title}</h3>`;

            filmBlock.appendChild(imageContainer);
            filmBlock.appendChild(filmName);

            filmsContainer.appendChild(filmBlock)

            filmsContainer.addEventListener("click", () => {
                window.location.href = "movie.html?filmUid=" + encodeURIComponent(filmUid);
            }); 
        
        }  
    }
    catch (error){
        console.error("Error fetching data:", error);
    }
} 

async function displayFilmInfo(filmUid){
    try{
        const respone = await fetch(`${filmApi_url}/${filmUid}`);
        const data = await respone.json();
        const filmData = data.result;
        const title = filmData.properties.title;

        const headingContainer = document.getElementById("heading-container");
        headingContainer.innerHTML = `<h1 style="text-align: center">${title.toUpperCase()}</h1>`;
     
        const filmContainer = document.getElementById("film-container");
        const filmImage = document.getElementById("filmImage");
        filmImage.src = `movies/${title}.jpeg`;
       
        const filmPara = document.getElementById("filmPara");
        filmPara.innerHTML = `<ul>
        <li>Directed By : ${filmData.properties.director}</li>
        <li>Released : ${filmData.properties.release_date} </li>
        <li>Episode : ${filmData.properties.episode_id}</li>
        </ul>`;
        
        const openingCrawl = document.getElementById("crawlOpening-container");
        openingCrawl.innerHTML = `${filmData.properties.opening_crawl}`;

        const castContainer = document.getElementById("cast");

        const characters = filmData.properties.characters;
        const charContainer = document.getElementById('char-container');
        charContainer.parentNode.insertBefore(castContainer, charContainer);
        castContainer.appendChild(charContainer);
      

        for(const c of characters){
            const lastInteger = parseInt(c.match(/\d+$/)[0]);

            const characterInfoContainer = document.createElement("div");
            characterInfoContainer.classList.add("character-block");

            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");

            const characterImage = document.createElement("img");
            characterImage.alt = "No-Image";
            characterImage.src = `people/${lastInteger}.jpg`;

            imageContainer.appendChild(characterImage);
            characterInfoContainer.appendChild(imageContainer);
            charContainer.appendChild(characterInfoContainer);
            characterInfoContainer.addEventListener("click", () => {
                window.location.href = "people.html?characterUid=" + encodeURIComponent(lastInteger);
            }); 
        }
    }catch (error) {
        console.error("Error fetching data", error);
    }
}
