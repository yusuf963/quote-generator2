const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
console.log(twitterButton)
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// showing loader
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden= true;
};
//hidding loader
function removeLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true
    }
}

// fetch quote from api
async function getQuote(){
    showLoadingSpinner();
    // proxy 
    const proxyUrl = 'https://stormy-atoll-29846.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const res = await fetch( proxyUrl + apiUrl);
        const data = await res.json();

        if(data.quoteAuthor === ''){
           quoteAuthor.innerText = 'Unknown, probably me';
        }else{
            quoteAuthor.innerText = data.quoteAuthor;
        }

        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote')
        }else{
            quoteText.classList.remove('long-quote')
        };
        quoteText.innerText = data.quoteText; 

        removeLoadingSpinner();
    }catch(error){
        getQuote();
    }
};

function tweetQuote(){
    const quote = quoteText.innerText;
    const author= quoteAuthor.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetUrl, '_blank');
}
// event listners
newQuoteButton.addEventListener('click', getQuote)
twitterButton.addEventListener('click', tweetQuote)
