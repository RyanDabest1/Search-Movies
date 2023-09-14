const URL = "https://searchanimeapi.onrender.com/anime/zoro/";
let page = 1;
let submitBtn = document.querySelector('.searchBtn')
let animeList = document.querySelector('.animeList')
let animeres = document.querySelector('.animeResults')
let loading = document.querySelector('.loading')
let pageNav = document.querySelector('.pageControl')
let backPage = document.querySelector('.backPage')
let nextPage = document.querySelector('.nextPage')
let haveNextPage = false;
const options = {
    method : "GET",
}
var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.querySelector(".loadingBar");
    var width = 1;
    var id = setInterval(frame, 30);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}
const search = function(url){
    loading.style.display = 'block'
    move()
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
if(result.hasNextPage){
  haveNextPage = true;
}
loading.style.display = 'none'
pageNav.style.display = 'block'
animeres.appendChild(cardTemplate)
    } 
    console.log(result.results)
}, 1000)
}

submitBtn.addEventListener('click', () => { page = 1; let child = animeres.lastElementChild; while(child){animeres.removeChild(child); child = animeres.lastElementChild}; search(`https://searchanimeapi.onrender.com/anime/zoro/${document.querySelector('#searchBox').value}?page=${page}`);console.log('clicked') })

nextPage.addEventListener('click', async() => 
{
  if(haveNextPage){
    page++;
    let child = animeres.lastElementChild; 
    while(child){animeres.removeChild(child); child = animeres.lastElementChild};
    let response = await fetch(`https://searchanimeapi.onrender.com/anime/zoro/${document.querySelector('#searchBox').value}?page=${page}`, options);
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
animeres.appendChild(cardTemplate)

}
console.log(result.hasNextPage)
if(result.hasNextPage){
  haveNextPage = true;
} else {
  haveNextPage = false;
}
}
})

backPage.addEventListener('click', async() => {
  if(page != 1){
    page--;
    let child = animeres.lastElementChild; 
    while(child){animeres.removeChild(child); child = animeres.lastElementChild};
    let response = await fetch(`https://searchanimeapi.onrender.com/anime/zoro/${document.querySelector('#searchBox').value}?page=${page}`, options);
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
animeres.appendChild(cardTemplate)
    }
}

})