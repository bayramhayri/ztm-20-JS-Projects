const quoteContainer = document.querySelector('.quote');
const quoteText = document.querySelector('#quote-text');
const quoteAuthor = document.querySelector('.quote__author-name');
const twitterBtn = document.getElementById('twitter-btn');
const newQuoteBtn = document.getElementById('new-quote-btn');
const quoteIcon = document.querySelector('.fa-quote-left');
const loader = document.getElementById('loader');
let errorCount = 0;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get Quote from API
async function getQuote() {
  showLoadingSpinner();
  const URL =
    'https://type.fit/api/quotes/?method=getQuote&lang=en&format=json';
  try {
    const res = await fetch(URL);
    const data = await res.json();
    const num = Math.floor(Math.random() * data.length);
    let quote;

    // Check if author is null, and replace it with 'Unknown'
    if (data[num].author === null) {
      quote = data[num];
      quote.author = 'Unknown';
    } else {
      quote = data[num];
    }

    // If quote is too long, reduce font size
    if (quote.text.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteAuthor.innerText = quote.author;
    quoteText.innerText = quote.text;
    hideLoadingSpinner();
  } catch (err) {
    if (errorCount < 10) {
      errorCount++;
      getQuote();
    } else {
      console.log('Something went wrong! No Quote!', err);
      hideLoadingSpinner();
      // Display an error message to user
      quoteText.innerText = 'Something went wrong! Try again later!';
      quoteText.style.color = '#ec4646'; // Red text
      twitterBtn.style.display = 'none'; // Hide twitter button
      quoteIcon.style.display = 'none'; // Hide quote icon
      newQuoteBtn.style.flexGrow = 1; // Change button's flex grow property for better style
    }
  }
}

// Tweet Qoute
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);

// On Load
getQuote();
