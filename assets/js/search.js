let userInput = document.querySelector('#user-input')
let searchButton = document.querySelector('.search-btn')
let contentContainer = document.querySelector('.content-container')
let top10Button = document.querySelector('.top10-btn')

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
            let merchButton = document.createElement('button');
            merchButton.textContent = "Buy Merch!";
            merchButton.classList.add("merch-btn","center")
            contentContainer.append(animeTitle, animeImage, animeRating, animeGenres, animeStatus, animeSyn, merchButton);
        }
        });
    
}



let genresListEl = document.querySelector('.genres-list')

genresListEl.addEventListener("click", function(event) {
    contentContainer.textContent = " ";
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
        contentContainer.textContent= "";
        requestUrl = "https://api.jikan.moe/v4/anime?limit=10&order_by=score&sort=desc"
        getAnimeInfo();
    } else {
        contentContainer.textContent= "";
        requestUrl = "https://api.jikan.moe/v4/anime?q=" + searchInput + "&type=tv"
        getAnimeInfo();
    }
} 

getSearch();


searchButton.addEventListener("click", function() {
    contentContainer.textContent = "";
    getAnimeInfo();
});

let merchButton = document.querySelector(".jsMerchFunction")

let merchPage = document.querySelector("#user-input").value


// merchButton.addEventListener("click", function() {


// });

let merchUrl = "https://store.crunchyroll.com/collections/" + merchPage

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
