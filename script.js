let randomLocation = Math.ceil(Math.random()*126)

let url = `https://rickandmortyapi.com/api/location/${randomLocation}`;

//Peticion para la locacion

fetch(url)
  .then(response => response.json())
  .then(data => {
    document.querySelector("#card").innerHTML = `
    <p>Location: ${data.name}</p>
    <p>Id: ${data.id}</p>
    <p>Type: ${data.type}</p>
    <p>Dimension: ${data.dimension}</p>
    `;

    document.querySelector("#title").textContent = "Rick and Morty API";

    if(data.id < 50){
      document.body.style.backgroundColor = "green";
    }else if(data.id > 50 && data.id < 80){
      document.body.style.backgroundColor = "blue";
    }else{
      document.body.style.backgroundColor = "red";
    }

    const residentList = document.querySelector('#resident-list');

    for (let index = 0; index < 5; index++) {
      let residents = data.residents[index];
      fetch(residents)
        .then(response => response.json())
        .then(residentData =>{
          
      let residentDiv = document.createElement('div');
      residentDiv.classList.add('text-base','p-4', 'mb-6','rounded-xl', 'shadow-black','shadow-2xl', 'transition-all',
       'duration-200', 'hover:scale-110', 'bg-slate-400', 'hover:bg-slate-600'
    );      
    residentDiv.innerHTML =
 `
          <img class="resident-image hover:cursor-pointer" src="${residentData.image}">
          <p>Name: ${residentData.name}</p>
          <p>Status: ${residentData.status}</p>
          <p>Species: ${residentData.species}</p>
          <p>Origin: ${residentData.origin.name}</p>
          <p class="pt-2">Episodes:</p>
          <ul class = "list-disc pt-2 text-sm">
            ${residentData.episode
              .slice(0, 3)
              .map(episodeUrl => `<li><a href="${episodeUrl}">${episodeUrl}</a></li>`)
              .join('')}
          </ul>
        `;
        residentList.appendChild(residentDiv)

         const residentImage = residentDiv.querySelector('.resident-image');
            residentImage.addEventListener('click', function() {
              const modalInfo = document.getElementById('modal-info');
              modalInfo.innerHTML = `
                <img src="${residentData.image}">
                <p>Name: ${residentData.name}</p>
                <p>Id: ${residentData.id}</p>
                <p>Status: ${residentData.status}</p>
                <p>Species: ${residentData.species}</p>
                <p>Origin: ${residentData.origin.name}</p>
                <p>Gender: ${residentData.gender}</p>
                <p>Episodes:</p>
                <ul>
                  ${residentData.episode.map(episodeUrl => `<li><a href="${episodeUrl}">${episodeUrl}</a></li>`).join('')}
                </ul>
              `;
              const modal = document.getElementById('modal');
              modal.style.display = 'block';
            });

            const closeModal = document.querySelector('.close');
            closeModal.addEventListener('click', function() {
              const modal = document.getElementById('modal');
              modal.style.display = 'none';
            });
        });

    }
    
    
})
  .catch(err => console.log(err))