const api_url = "https://www.swapi.tech/api/people";

async function fetchCharacterData() {
  try {
    const response = await fetch(api_url);
    if (response) {
        hideloader();
    }
    const data = await response.json();
    const characters = data.results;
    console.log(characters);

    let tab = `
      <tr>
        <th>Name</th>
        <th>Gender</th>
        <th>Birth Year</th>
        <th>HomeWorld</th>
      </tr>`;

    const characterPromises = characters.map(async (character) => {
      const characterUrl = character.url;
      const characterResponse = await fetch(characterUrl);
      const characterData = await characterResponse.json();
      const characterProperties = characterData.result.properties;
      console.log(characterProperties);
      //console.log(characterData);
      const name = characterProperties.name;
      const gender = characterProperties.gender;
      const birthYear = characterProperties.birth_year;
      const homeworldUrl = characterProperties.homeworld;

    
     /* if (filmsUrls.length > 0){
        const filmPromises = filmsUrls.map(async (film) => {
        const filmUrl = film.films
        const filmResponse = await fetch(filmUrl);
        const filmData = await filmResponse.json();
        console.log(filmData);
        return filmData.result.properties.title;
      });
    }

      const speciesUrls = characterData.result.properties.species;
      const speciesPromises = speciesUrls.map(async (speciesUrl) => {
        const speciesResponse = await fetch(speciesUrl);
        const speciesData = await speciesResponse.json();
        return speciesData.result.properties.name;
      });

      const filmTitles = await Promise.all(filmPromises);
      const speciesNames = await Promise.all(speciesPromises); */

      const homeworldResponse = await fetch(homeworldUrl);
      const homeworldData = await homeworldResponse.json();
      const homeworld = homeworldData.result.properties.name;

      return {
        name,
        gender,
        birthYear,
        homeworld,
      };
    });

    const characterData = await Promise.all(characterPromises);

    for (let character of characterData) {
      const name = character.name;
      const gender = character.gender;
      const birthYear = character.birthYear;
      const homeworld = character.homeworld;

      tab += `
        <tr>
          <td>${name}</td>
          <td>${gender}</td>
          <td>${birthYear}</td>
          <td>${homeworld}</td>
        </tr>`;
    }

    const tableBody = document.getElementById("characters");
    tableBody.innerHTML = tab;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
fetchCharacterData();
