const data = [
  {
    image_url: "https://picsum.photos/450/300?n=1",
    caption: "Photo 1",
  },
  {
    image_url: "https://picsum.photos/450/300?n=2",
    caption: "Photo 2",
  },
  {
    image_url: "https://picsum.photos/450/300?n=3",
    caption: "Photo 3",
  },
  {
    image_url: "https://picsum.photos/450/300?n=4",
    caption: "Photo 4",
  },
  {
    image_url: "https://picsum.photos/450/300?n=5",
    caption: "Photo 5",
  },
  {
    image_url: "https://picsum.photos/450/300?n=6",
    caption: "Photo 6",
  },
  {
    image_url: "https://picsum.photos/450/300?n=7",
    caption: "Photo 7",
  },
  {
    image_url: "https://picsum.photos/450/300?n=8",
    caption: "Photo 8",
  },
  {
    image_url: "https://picsum.photos/450/300?n=9",
    caption: "Photo 9",
  },
  {
    image_url: "https://picsum.photos/450/300?n=10",
    caption: "Photo 10",
  }
];

let currentIndex = 0;

function loadSlides(photoList) {
  const innerContainer = document.querySelector('.carousel-inner');
  let count = 1;
  photoList.forEach(photo => { 
    const slide = `
      <section class="slide" role="group" aria-hidden="true" aria-label="Slide ${count} of ${photoList.length}">
        <img src="${photo.image_url}" alt="${photo.caption}" onclick="next()">
        <p>${photo.caption}</p>
      </section>
    `;
    innerContainer.insertAdjacentHTML('beforeend', slide);
    count++;
  });
}

loadSlides(data);

const slides = Array.from(document.querySelector('.carousel-inner').children);
slides[currentIndex].setAttribute("aria-hidden", "false");

function next() {
    const carouselInner = document.querySelector('.carousel-inner');
    const slides = Array.from(carouselInner.children);
    slides[currentIndex].setAttribute("aria-hidden", "true");
    currentIndex = (currentIndex + 1) % data.length;
    slides[currentIndex].setAttribute("aria-hidden", "false");
    const slideWidth = slides[0].getBoundingClientRect().width;
    carouselInner.style.left = `-${currentIndex * slideWidth}px`;
}

function previous() {
    const carouselInner = document.querySelector('.carousel-inner');
    const slides = Array.from(carouselInner.children)
    slides[currentIndex].setAttribute("aria-hidden", "true");
    currentIndex = (currentIndex + data.length - 1) % data.length;
    slides[currentIndex].setAttribute("aria-hidden", "false");
    const slideWidth = slides[0].getBoundingClientRect().width;
    carouselInner.style.left = `-${currentIndex * slideWidth}px`;
}