let userInput = document.querySelector('#user-input')
let searchButton = document.querySelector('.search-btn')
let contentContainer = document.querySelector('.content-container')

let userInputValue = userInput.value
    let splitName = userInputValue.split(" ")
    if (splitName.length > 1) {
        userInputValue = splitName.join("+")
    }
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
            animeRating.classList.add("anime-info");
            let animeGenres = document.createElement('h6');
            let totalGenres = [];
            for (let j=0; j< apiData[i].genres.length; j++) {
                totalGenres.push(apiData[i].genres[j].name);
            }
            animeGenres.textContent = "Genres: " + totalGenres.join(" ");
            animeGenres.classList.add("anime-info")
            let animeStatus = document.createElement('h6');
            animeStatus.textContent = "Status: " + apiData[i].status;
            animeStatus.classList.add("anime-info")
            let animeSyn = document.createElement('p');
            animeSyn.textContent = apiData[i].synopsis;
            animeSyn.classList.add("anime-synopsis", "center");
            contentContainer.append(animeTitle, animeImage, animeRating, animeGenres, animeStatus, animeSyn);
        }
        });
    
}



let genresListEl = document.querySelector('.genres-list')

genresListEl.addEventListener("click", function(event) {
    console.log(event.target)
    if (event.target.matches("a")) {
        let genre = event.target.getAttribute("data-genre")
        console.log(genre)
    
    requestUrl = "https://api.jikan.moe/v4/anime?genre=" 

    getAnimeInfo()
    }

})

function getSearch() {
    let searchInput = document.location.search.split("=").pop()
    if (searchInput === "top-10") {
        requestUrl = "https://api.jikan.moe/v4/anime?limit=10&order_by=score&sort=desc"
        getAnimeInfo();
    } else {
        return searchInput
    }
} 

getSearch();


searchButton.addEventListener("click", function() {
    contentContainer.textContent = "";
    getImage();
});