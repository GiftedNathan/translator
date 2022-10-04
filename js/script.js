
const inputedText = document.querySelector(".inputed-text");
const translatedText = document.querySelector(".translated-text");
const fromCountry = document.querySelector(".from-country");
const toCountry = document.querySelector(".to-country");
const translateButton = document.querySelector(".translate-button");
const exchangeTextButton = document.getElementById("exchange-text");





const renderCountryOptions = () =>{
    let optionTag = "";

    for (let country in countries){
        optionTag += `<option value="${country}">${countries[country]}</option>`;
        // console.log(countries[country], country);
    }
    
    fromCountry.innerHTML = optionTag;
    toCountry.innerHTML = optionTag;

    // for (let country in countries){

    //     let option = document.createElement("option");
    //     option.setAttribute("value", country);
    
    //     let optionText = document.createTextNode(countries[country]);
    //     option.appendChild(optionText);
    
    //     fromCountry.appendChild(option)
    //     toCountry.appendChild(option)
    
    // }

}
renderCountryOptions()



translateButton.addEventListener('click', (e) => {
    e.preventDefault();

    let sentenceToTranslate = inputedText.value;
    let tranlatedSentence = "";
    let sourceLanguage = fromCountry.value;
    let destinationLanguage = toCountry.value;
    
    translatedText.setAttribute("placeholder", "translating text ...");
    
    let apiURL = `https://api.mymemory.translated.net/get?q=${sentenceToTranslate}!&langpair=${sourceLanguage}|${destinationLanguage}`;
    // console.log(fromCountry.value, " -> ", toCountry.value);

    // translatedText.value = inputedText.value;

    fetch(apiURL)
    .then((response) => response.json())
    .then((data) => { 
        tranlatedSentence = data.responseData.translatedText;
        translatedText.value = tranlatedSentence;
    });


});

exchangeTextButton.addEventListener("click", () => {
    temp = inputedText.value
    inputedText.value = translatedText.value;
    translatedText.value = temp;
})

// console.log(exchangeTextButton);