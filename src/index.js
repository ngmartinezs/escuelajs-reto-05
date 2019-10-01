
localStorage.clear(); 
const MESSAGE_END_CONTENT ="Ya no hay personajes";
const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
//const API = 'https://randomuser.me/api/?results=50';//'https://rickadmortyapi.com/api/character/';
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';

const getData = api => {
  let nextFetch ="";
  fetch(api)
    .then(response => response.json())
    .then(response => {
      nextFetch =response.info.next;
      
      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);

      console.log(`nextFetch => ${nextFetch}`);
      if(nextFetch)
      {
        localStorage.setItem("next_fetch",nextFetch);
      }
      else{
        document.getElementById('observe').remove();
        let itemMenssgeEnd = document.createElement('section');
        let output = `<p>${MESSAGE_END_CONTENT}</p>`;
        itemMenssgeEnd.classList.add('MessageEnd');
        itemMenssgeEnd.innerHTML = output;
        $app.appendChild(itemMenssgeEnd);
      }  
    })
    .catch(error => console.log(error));
}

 const loadData = async () => {
  let lApi = API;
  const urlNextFetch = localStorage.getItem("next_fetch");
  
  if(urlNextFetch)
    lApi = urlNextFetch;
    await getData(lApi);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);