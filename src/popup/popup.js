const startSlideshowButton = document.querySelector('#startSlideshow');
const updateJSONButton = document.querySelector('#uploadCollection');
const ul = document.querySelector('#ul');
const jsonTextarea = document.querySelector('#json');

const download = (text, name, type) => {
  var a = document.querySelector("#downloadCollection");
  var file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;
}

const renderJSON = (json) => {
  jsonTextarea.value = JSON.stringify(json);
}

const renderTable = (mediaArray) => {
  let htmlString = '';
  mediaArray.forEach((item, index) => {
    if (item.type === 'video') {
      htmlString = htmlString.concat(`<li id="item-${index}"><video muted src='${item.url}'></video></li>`);
    }
    if (item.type !== 'video') {
      htmlString = htmlString.concat(`<li id="item-${index}"><img src='${item.url}'></li>`);
    }
  });
  ul.innerHTML = htmlString;
  mediaArray.forEach((item, index) => {
    const button = document.querySelector(`#item-${index}`);
    button.onclick = () => {
      chrome.storage.sync.get('collections', (data) => {
        data.collections[0].data.splice(index, 1);
        renderTable(data.collections[0].data);
        renderJSON(data.collections);
        download(JSON.stringify(data.collections), `${data.collections[0].title}.json`, 'text/plain');
        chrome.storage.sync.set({ collections: data.collections }, () => {
          console.log(data.collections);
        });
      });
    };
  });
};

const startSlideshow = () => {
  chrome.tabs.create({ 'url': "src/options/options.html" });
}

startSlideshowButton.onclick = () => {
  startSlideshow();
}

updateJSONButton.onclick = () => {
  chrome.storage.sync.set({ collections: JSON.parse(jsonTextarea.value) });
  chrome.storage.sync.get('collections', (data) => {
    renderTable(data.collections[0].data);
  });
}

chrome.storage.sync.get('collections', (data) => {
  renderTable(data.collections[0].data);
  renderJSON(data.collections);
  download(JSON.stringify(data.collections), `${data.collections[0].title}.json`, 'text/plain');
});

chrome.storage.sync.get('collections', (data) => {
  renderTable(data.collections[0].data);
});