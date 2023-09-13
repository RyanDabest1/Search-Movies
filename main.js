const URL = "https://searchanimeapi.onrender.com/anime/zoro/";
let page = 1;
let submitBtn = document.querySelector('.searchBtn')
let animeList = document.querySelector('.animeList')
let animeres = document.querySelector('.animeResults')
let loading = document.querySelector('.loading')
const options = {
    method : "GET",
}
const search = function(url){
    loading.style.display = 'block'
    setTimeout(async()=>{
    let response = await fetch(url, options);
    let result = await response.json();
    for(let i = 0; i < result.results.length; i++){
        let title = result.results[i].title;
        let cardTemplate = document.createElement('div')
        cardTemplate.innerHTML = `
<div class="card" style="width: 18rem;">
  <img src="${result.results[i].image}" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">Click the button to watch!</p>
    <a href="${result.results[i].url}" class="btn btn-primary">Watch now</a>
  </div>
</div>`;
loading.style.display = 'none'
animeres.appendChild(cardTemplate)
    } 
    console.log('worked')
}, 10000)
    
    
  
}

submitBtn.addEventListener('click', () => { let child = animeres.lastElementChild; while(child){animeres.removeChild(child); child = animeres.lastElementChild}; search(`https://searchanimeapi.onrender.com/anime/zoro/${document.querySelector('#searchBox').value}?page=${page}`);console.log('clicked') })