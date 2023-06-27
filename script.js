const characterApi_url = "https://www.swapi.tech/api/people";  //people API
const filmApi_url = "https://www.swapi.tech/api/films";         //movies API

let nextPageUrl = null;

//Function to fetch characters with name and image
async function fetchCharacters() {
    try {
      const response = await fetch(nextPageUrl || characterApi_url);
      const data = await response.json();
      const characters = data.results;
  
      const charactersContainer = document.getElementById("characters-container");
      charactersContainer.innerHTML = '';
  
      const headingContainer = document.getElementById("heading-container");
      headingContainer.innerHTML = '';
  
      //Get characterPromises
      const characterDataPromises = characters.map(async (character) => {
        const characterUrl = character.url;
        const characterUid = character.uid;
  
        const characterResponse = await fetch(characterUrl);
        const characterData = await characterResponse.json();
  
        const characterProperties = characterData.result.properties;
        const name = characterProperties.name;
  
        // The individual character display box
        const characterBlock = document.createElement("div");
        characterBlock.classList.add("character-block");
  
        const imageContainer = document.createElement("div");       //image container that will contain image
        imageContainer.classList.add("image-container");
  
        const characterImage = document.createElement("img");
        characterImage.src = `people/${characterUid}.jpg`;
        imageContainer.appendChild(characterImage);


        const characterName = document.createElement("h2");         //label of the image
        characterName.innerHTML = `<h2 style="text-align:center">${name}</h2>`;
  
        characterBlock.appendChild(imageContainer);
        characterBlock.appendChild(characterName);
  
        charactersContainer.appendChild(characterBlock);

        //Character Box on-click event
        characterBlock.addEventListener("click", () => {
            window.location.href = "people.html?characterUid=" + encodeURIComponent(characterUid);
        });         
      });  
      await Promise.all(characterDataPromises);  

      // paginate more characters using next property
      nextPageUrl = data.next;
      const loadMoreButton = document.getElementById("loadMore");
      if (nextPageUrl) {
        console.log("Load more button should be displayed");
        console.log(loadMoreButton);
        loadMoreButton.style.display = 'block';
      } else {
        loadMoreButton.style.display = 'none';
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }


  // Function to display detailed character info on people.html
  async function displayCharacterInfo(characterUid) {
    try {

        const characterResponse = await fetch(`${characterApi_url}/${characterUid}`);       //individual character API call
        const characterData = await characterResponse.json();
        const character = characterData.result;
        const name = character.properties.name;

        //fetch film data 
        const filmResponse = await fetch(filmApi_url);
        const filmData = await filmResponse.json();
        const films = filmData.result;

        //Page Heading to display Characters name
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

        //loop to find the films a character did
        for (const film of films) {
            const characters = film.properties.characters;      //character API's for a particular film
            const title = film.properties.title;
            const filmUid = film.uid;

            const filmTitles = document.createElement("div");
            filmTitles.classList.add("film-container");

            //Finds if passed character UID exists for this film
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

            //Event Listener for this film display box
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
        headingContainer.innerHTML = '';                                        //set this empty to display new info on main.html
        
        const filmsContainer = document.getElementById("characters-container");
        filmsContainer.innerHTML = '';                                  //set empty to display fresh info on main.html

        //Loop to create film display boxes
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

            //Event Listener for this particular film display box
            filmBlock.addEventListener("click", () => {
                window.location.href = "movie.html?filmUid=" + encodeURIComponent(filmUid);
            }); 
        
        }  
    }
    catch (error){
        console.error("Error fetching data:", error);
    }
} 


//Function to display detail info for a film on movie.html
async function displayFilmInfo(filmUid){
    try{
        const respone = await fetch(`${filmApi_url}/${filmUid}`);       //fetch particular film API
        const data = await respone.json();
        const filmData = data.result;
        const title = filmData.properties.title;                        //film Title

        const headingContainer = document.getElementById("heading-container");
        headingContainer.innerHTML = `<h1 style="text-align: center">${title.toUpperCase()}</h1>`;    //set page heading to film title
     
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

        const charContainer = document.getElementById('char-container');
        charContainer.parentNode.insertBefore(castContainer, charContainer);
        castContainer.appendChild(charContainer);

        //Cast of the film
        const characters = filmData.properties.characters;
        const namedict = {};        // collects the name of each character
        const characterRequests = characters.map(async (c) => {
            const lastInteger = parseInt(c.match(/\d+$/)[0]);
            const characterResponse = await fetch(`${characterApi_url}/${lastInteger}`);
            const characterData = await characterResponse.json();
            return {lastInteger,name:characterData.result.properties.name};
        });
        const characterResults = await Promise.all(characterRequests);   

        //Populate the dictionary
        for (const result of characterResults) {
            const { lastInteger, name } = result;
            namedict[lastInteger] = name;
          }

        //Cast display blocks
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

            const characterName = document.createElement("span");
            characterName.innerHTML = `<span style="text-align:center"><b>${namedict[lastInteger].toUpperCase()}</b></span>`;
            characterInfoContainer.appendChild(imageContainer);
            characterInfoContainer.appendChild(characterName);
            
            charContainer.appendChild(characterInfoContainer);
            characterInfoContainer.addEventListener("click", () => {
                window.location.href = "people.html?characterUid=" + encodeURIComponent(lastInteger);
            }); 
            //Back Button on movie.html
            const backButton = document.getElementById("backButton");
            backButton.addEventListener("click", () => {
            window.history.back();
            });
        }
    }catch (error) {
        console.error("Error fetching data", error);
    }
}
