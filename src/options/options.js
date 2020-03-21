const carousel = document.querySelector('.carousel-inner');

/**
 * Renders carousel HTML to DOM
*/
function renderCarousel(data) {
  let html = '';
  data.forEach((item, index) => {
    if (item.type === 'video') {
      html = html.concat(`
      <div class='carousel-item ${index === 0 ? 'active' : ''}'>
        <video class='d-block h-100 mx-auto' controls autoplay loop muted src='${item.url}'></video>
      <div>`);
      return;
    }
    html = html.concat(`
    <div class='carousel-item ${index === 0 ? 'active' : ''}'>
      <img class='d-block h-100 mx-auto' src='${item.url}'>
    </div>`);
  });
  carousel.innerHTML = html;
};

chrome.storage.sync.get('collections', (data) => {
  renderCarousel(data.collections[0].data);
});