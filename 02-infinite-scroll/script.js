const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArr = [];

// Unsplash API
let count = 5;
let apiUrl = `https://api.unsplash.com/photos/random/?count=${count}&client_id=${UNSPLASH_API_KEY}&orientation=landscape`;

// Helper function to set attibutes
function setAttributes(el, att) {
  for (const key in att) {
    el.setAttribute(key, att[key]);
  }
}

// Check if all the images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.style.display = 'none';
    imagesLoaded = 0;
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?count=${count}&client_id=${UNSPLASH_API_KEY}&orientation=landscape`;
  }
}

function displayPhotos() {
  totalImages = photosArr.length;
  for (let photo of photosArr) {
    // create <a> tag to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.description,
    });
    // Check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  }
}

async function getPhotos() {
  try {
    const res = await fetch(apiUrl);
    photosArr = await res.json();
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// Check to see if scrolling near bottom, Load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
