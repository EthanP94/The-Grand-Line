let userInput = document.querySelector('#user-input')
let searchButton = document.querySelector('.search-btn')
let contentContainer = document.querySelector('.content-container')

function getImage(event) {
    event.preventDefault();
    let userInputValue = userInput.value
    let splitName = userInputValue.split(" ")
    if (splitName.length > 1) {
        userInputValue = splitName.join("+")
    }
    let requestUrl = "https://api.jikan.moe/v4/anime?q=" + userInputValue + "&type=tv"
    
    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log(data);
        let apiData = data.data
        for (let i=0; i< apiData.length; i++) {
            let animeTitle = document.createElement('h2')
            animeTitle.classList.add("anime-title")
            if (!apiData[i].title_english) {
                animeTitle.textContent = apiData[i].title
            } else {
                animeTitle.textContent = apiData[i].title_english
            }
            let animeImage = document.createElement('img')
            animeImage.setAttribute("src", apiData[i].images.jpg.image_url)
            animeImage.classList.add("anime-image")
            let animeSyn = document.createElement('p')
            animeSyn.textContent = apiData[i].synopsis
            animeSyn.classList.add("anime-synopsis")
            contentContainer.append(animeTitle)
            contentContainer.append(animeImage)
            contentContainer.append(animeSyn)
        }
        });
    
}

searchButton.addEventListener("click", getImage);