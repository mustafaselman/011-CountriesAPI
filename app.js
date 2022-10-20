const input = document.querySelector("#input");
const button = document.querySelector("#button");
const newCards = document.querySelector("#newcards");
let number = 1;




eventListeners();
function eventListeners(e){
    button.addEventListener("click", e => {
        const myInput = e.target.previousElementSibling.previousElementSibling;
        addCard(myInput.selectedIndex);
        
    })

}


class Request {
    get(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err))

        })
    }
}
const request = new Request();

function getAllCountries(){
    
    
    request.get("https://restcountries.com/v3.1/all")
    .then(countries => { 
        for (let country in countries) {
            let createOption = document.createElement('option');
            createOption.value = countries[country].name.common;
            createOption.innerHTML += countries[country].name.common;
            input.appendChild(createOption);
            
        }
    })
    .catch(err => console.log(err))
}
getAllCountries();

function addCard (input){
    request.get("https://restcountries.com/v3.1/all")
    .then(countries => {
        const newCard = document.createElement('div');
        newCard.className = 'card-body';
        const newCardTitle = document.createElement('h5');
        newCardTitle.className = 'card-title';
        newCardTitle.innerHTML = countries[input].name.common.toUpperCase();
        const newCardImage = document.createElement('img');
        newCardImage.src = countries[input].flags.png;
        newCardImage.alt = countries[input].name.common;
        const newCardPopulation = document.createElement('p');
        newCardPopulation.className = 'card-text';
        
        newCardPopulation.innerHTML = "</br><i class='bi bi-people-fill'> </i> <b>POPULATION : </b>" + countries[input].population;
        const newCardCurrency = document.createElement('p');
        newCardCurrency.className = 'card-text';
            
        for (let currencyCode in countries[input].currencies) {
            
            newCardCurrency.innerHTML += `<i class="bi bi-cash"> </i><b>CURRENCIES ${number}: </b>`  + countries[input].currencies[currencyCode].name + "</br>";
            number++;
        }
        number = 1;
        newCard.appendChild(newCardTitle);
        newCard.appendChild(newCardImage);
        newCard.appendChild(newCardPopulation);
        newCard.appendChild(newCardCurrency);
        deleteChild(newCards);
        newCards.appendChild(newCard);
    })
}

function deleteChild(oldCards){
    if ( oldCards.hasChildNodes() )
        {
            while ( oldCards.childNodes.length >= 1 )
            {
                oldCards.removeChild( oldCards.firstChild );       
            } 
        }

}



    

