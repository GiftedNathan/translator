
const inputedText = document.querySelector(".inputed-text");
const translatedText = document.querySelector(".translated-text");
const fromCountry = document.querySelector(".from-country");
const toCountry = document.querySelector(".to-country");
const translateButton = document.querySelector(".translate-button");
const exchangeTextButton = document.getElementById("exchange-text");


const speakInputedText = document.getElementById("speak-inputed-text");
const copyInputedText = document.getElementById("copy-inputed-text");

const speakTranslatedText = document.getElementById("speak-translated-text");
const copyTranslatedText = document.getElementById("copy-translated-text");


// let creating HTML option element with counties as values
const renderCountryOptions = (selectElement, defaultOption) =>{
    let optionTag = "";

    Object.entries(countries).forEach(([key, value]) => {

        optionTag += `<option value="${key}">${value}</option>`;
        
        // select an option by default by adding "selected"
        if (key === defaultOption ){
            optionTag += `<option value="${key}" selected >${value}</option>`;
        } 

    });

    selectElement.innerHTML = optionTag;

}
renderCountryOptions(fromCountry, "en-GB");
renderCountryOptions(toCountry, "fr-FR");


// tranlate inputed text by adding event listenner to button
translateButton.addEventListener('click', (e) => {
    e.preventDefault();

    let sentenceToTranslate = inputedText.value;
    let tranlatedSentence = "";
    let sourceLanguage = fromCountry.value;
    let destinationLanguage = toCountry.value;
    
    translatedText.setAttribute("placeholder", "translating text ...");
    
    const apiURL = `https://api.mymemory.translated.net/get?q=${sentenceToTranslate}!&langpair=${sourceLanguage}|${destinationLanguage}`;
    // console.log(fromCountry.value, " -> ", toCountry.value);

    // translatedText.value = inputedText.value;

    fetch(apiURL)
    .then((response) => response.json())
    .then((data) => { 
        tranlatedSentence = data.responseData.translatedText;
        translatedText.value = tranlatedSentence;
    });


    // async function getTranslation(apiURL) {
    //     // let url = 'users.json';
    //     try {
    //         let response = await fetch(apiURL);
    //         return await response.json().data.responseData.translatedText;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // async function tranlatedSentence(){
    //     return await getTranslation();
    // }

    // translatedText.value =  tranlatedSentence();


});

exchangeTextButton.addEventListener("click", () => {
    temp = inputedText.value
    inputedText.value = translatedText.value;
    translatedText.value = temp;
})


// a function to copy text 
const copyToClipboard = (textToCopy) =>{
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        
        return navigator.clipboard.writeText(textToCopy).then(() => {
            alert("Copied Succesfully: " + textToCopy);
        });
        // return navigator.clipboard.writeText(textToCopy, alert("text copied successfully"));
    }
    // return Promise.reject("Opps: clip API not supported");
    alert("Opps: clip API not supported, can't copy text");
}


// adding event listener to copy icons and call the copy function 
// copy inputed text
copyInputedText.addEventListener("click", () =>{
    copyToClipboard(inputedText.value);
});

// copy tranlated text
copyTranslatedText.addEventListener("click", () =>{
    copyToClipboard(translatedText.value);
});


// a function to speak out text
const speakOutText = (textToSpeakOut, speakingLanguage) => {

    if ("speechSynthesis" in window) {
        let voiceMessage = new SpeechSynthesisUtterance();
        voiceMessage.lang = speakingLanguage;
        voiceMessage.text = textToSpeakOut;
        window.speechSynthesis.speak(voiceMessage);
    } else {
        alert(window.speechSynthesis.error() + " Sorry: Language not supported");
        console.log(window.speechSynthesis.error(), "error speaking out");
    }
}

speakInputedText.addEventListener("click", () => {
    speakOutText(inputedText.value, fromCountry.value);
})
speakTranslatedText.addEventListener("click", () => {
    speakOutText(translatedText.value, toCountry.value);
})


