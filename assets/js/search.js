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
        for (let i=0; i< data.data.length; i++) {
            let example = document.createElement('img')
            example.setAttribute("src", data.data[i].images.jpg.image_url)
            contentContainer.append(example)
        }
        });
    
}

searchButton.addEventListener("click", getImage);