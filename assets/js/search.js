let userInput = document.querySelector('#user-input')
let searchButton = document.querySelector('.search-btn')
let contentContainer = document.querySelector('.content-container')
let top10Button = document.querySelector('.top10-btn')
let musicButton = document.querySelector('.music-btn')

let userInputValue;
let requestUrl = "https://api.jikan.moe/v4/anime?q=" + userInputValue + "&type=tv"

function getAnimeInfo() {
    
    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data);
        let apiData = data.data;
        for (let i=0; i< apiData.length; i++) {
            let animeTitle = document.createElement('h2');
            animeTitle.classList.add("anime-title", "center");
            if (!apiData[i].title_english) {
                animeTitle.textContent = apiData[i].title
            } else {
                animeTitle.textContent = apiData[i].title_english
            }
            let animeImage = document.createElement('img');
            animeImage.setAttribute("src", apiData[i].images.jpg.image_url);
            animeImage.classList.add("anime-image", "center");
            let animeRating = document.createElement('h6');
            if (!apiData[i].score) {
                animeRating.textContent = "Rating: Not Available";
            } else {
                animeRating.textContent = "Rating: " + apiData[i].score;
            }
            animeRating.classList.add("anime-info", "center");
            let animeGenres = document.createElement('h6');
            let totalGenres = [];
            for (let j=0; j< apiData[i].genres.length; j++) {
                totalGenres.push(apiData[i].genres[j].name);
            }
            animeGenres.textContent = "Genres: " + totalGenres.join(" ");
            animeGenres.classList.add("anime-info", "center")
            let animeStatus = document.createElement('h6');
            animeStatus.textContent = "Status: " + apiData[i].status;
            animeStatus.classList.add("anime-info", "center")
            let animeSyn = document.createElement('p');
            animeSyn.textContent = apiData[i].synopsis;
            animeSyn.classList.add("anime-synopsis", "center");
            let merchButton = document.createElement('button')
            merchButton.textContent = "Buy Merch!"
            merchButton.classList.add("merch-btn", "center");
            let watchHereButton = document.createElement('button')
            watchHereButton.textContent = "Watch Here!"
            watchHereButton.classList.add("watch-btn", "center");
            contentContainer.append(animeTitle, animeImage, animeRating, animeGenres, animeStatus, animeSyn, merchButton, watchHereButton);
            
        }
        });
    
}
let searchInput;
function getSearch() {
     searchInput = document.location.search.split("=").pop()
    if (searchInput === "top-10") {
        contentContainer.textContent= "";
        requestUrl = "https://api.jikan.moe/v4/anime?limit=10&order_by=score&sort=desc"
        getAnimeInfo();
    } 
    if (searchInput) {
        searchInput = document.location.search.split("=").pop()
        if (!isNaN(parseInt(searchInput))) {
            console.log("number");
            requestUrl = "https://api.jikan.moe/v4/anime?genres=" + searchInput + "&type=tv"


        } else {
            requestUrl = "https://api.jikan.moe/v4/anime?q=" + searchInput + "&type=tv"
            console.log("string");
        }
        getAnimeInfo();
    } else {
        contentContainer.textContent = " "
    }
}

getSearch();

let genresListEl = document.querySelector('.genres-list')

genresListEl.addEventListener("click", function(event) {
    contentContainer.textContent = " ";
    console.log(event.target)
    if (event.target.matches("a")) {
        let genre = event.target.getAttribute("data-genre")
        console.log(genre)
        requestUrl = "https://api.jikan.moe/v4/anime?genres=" + genre
        console.log(requestUrl);
        getAnimeInfo()
    }

})

let isClicked = false;
let randomNum = Math.floor(Math.random() * 4)
const music = new Audio('./assets/music/'+ randomNum + '.mp3');
musicButton.addEventListener("click", function() {
    if (isClicked) {
        isClicked = false;
        music.pause();
        musicButton.value = "⏵︎"
    } else {
        isClicked = true;
        music.play();
        musicButton.value = "⏸︎"
    }
})

searchButton.addEventListener("click", function() {
    contentContainer.textContent = " ";
    userInputValue = userInput.value
    let splitName = userInputValue.split(" ")
    if (splitName.length > 1) {
        userInputValue = splitName.join("%20")
    }
    requestUrl = "https://api.jikan.moe/v4/anime?q=" + userInputValue + "&type=tv"
    console.log(requestUrl)
    getAnimeInfo();
});

top10Button.addEventListener('click', function() {
    contentContainer.textContent= " ";
    requestUrl = "https://api.jikan.moe/v4/anime?limit=10&order_by=score&sort=desc"
    getAnimeInfo();
})
 
let merchInput = document.querySelector('#user-input')

 contentContainer.addEventListener("click", function(event) {

     if (event.target.matches(".merch-btn")) {
         console.log("I made it")
         userInputValue = merchInput.value;
         if (userInputValue === ""){
            userInputValue = searchInput.split("%20").join("-")
            console.log(userInputValue)
        }
     let merchUrl = "https://store.crunchyroll.com/collections/" + userInputValue.toLowerCase().split(" ").join("-")
     console.log(merchUrl)

 window.open(merchUrl, "_blank")
     }

 }); 

 let watchHereInput = document.querySelector('#user-input')

 contentContainer.addEventListener("click", function(event) {

     if (event.target.matches(".watch-btn")) {
         console.log("I made it")
         userInputValue = watchHereInput.value;
        if (userInputValue === ""){
            userInputValue = searchInput
        }
         let watchUrl = "https://www.crunchyroll.com/search?from=search&q=" + userInputValue.toLowerCase().split(" ").join("-")
     console.log(watchUrl)

 window.open(watchUrl, "_blank")
     }
     }); 