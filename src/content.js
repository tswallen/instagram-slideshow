let collections;
let activeCollection;

let media;
let isAdded = false;

const imageClass = '.FFVAD'; //and parent is style="padding-bottom: 100%;"
const videoClass = '.tWeCl';
const slideshowClass = '.vi798';

function getActiveCollection(collections) {
    return collections.find(collection => collection.active)
};

function getCollections() {
    return new Promise(resolve => {
        chrome.storage.sync.get('collections', (collections) => {
            resolve(collections.collections);
        });
    }).then(res => {
        collections = res;
        activeCollection = getActiveCollection(collections);
    });
};

function step1() {
    if (document.querySelector(slideshowClass)) {
        media = {
            type: 'slide',
            title: window.location.pathname.slice(3, -1)
        };
        return;
    };
    if (document.querySelector(videoClass)) {
        media = {
            type: 'video',
            title: window.location.pathname.slice(3, -1),
            url: document.querySelector(videoClass)['src']
        };
        return;
    };
    if (document.querySelector(imageClass)) {
        media = {
            type: 'image',
            title: window.location.pathname.slice(3, -1),
            url: document.querySelector(imageClass)['src']
        };
        return;
    };
};

function step2() {
    if (activeCollection.data.find(item => item.title === media.title)) {
        isAdded = true;
    }
}

function step3() {
    if (isAdded && document.querySelector('#add')) {
        document.querySelector('#add').outerHTML = '<button id="remove">-</button>';
        return;
    }
    let toolBarDropdown = '';
    collections.forEach(collection => {
        toolBarDropdown = toolBarDropdown + `<option value="${collection.title}" ${(collection === activeCollection) ? 'selected' : ''}>${collection.title}</option>`
    });
    /*     const toolBar = `
        <div class="toolbar" style="display: flex; flex-direction: row;">
            <select>
                ${toolBarDropdown}
            </select>
            ${(isAdded && media.type !== 'slide') ? '<button id="remove">-</button>' : '<button id="add">+</button>'}
        </div>
        `; */
    const toolBar = `
    <div class="toolbar" style="display: flex; flex-direction: row;">
        ${(isAdded && media.type !== 'slide') ? '<button id="remove">-</button>' : '<button id="add">+</button>'}
    </div>
    `;
    document.querySelector('.wmtNn').insertAdjacentHTML('beforebegin', toolBar);
}

function step4() {
    if (isAdded) { return; }
    document.querySelector('#add').onclick = () => {
        if (media.type === 'slide') {
            const container = document.querySelector(slideshowClass);
            const slides = container.querySelectorAll('.FFVAD');
            const index = [...document.querySelector('.JSZAJ').children].indexOf(document.querySelector('.XCodT'));
            media.index = index;
            media.url = slides[index]['src'];
        }
        getCollections()
            .then(() => {
                activeCollection['data'].push(media);
                chrome.storage.sync.set({ 'collections': collections });
                if (media.type === 'slide') { return; }
                isAdded = true;
                step3();
            });
    };
};

const init = setInterval(() => {
    step1();
    if (!media.url && media.type !== 'slide') { console.error('No media found!'); return; }
    clearInterval(init);
    getCollections()
        .then(() => {
            step2();
            step3();
            step4();
        });
}, 500);

setTimeout(() => {
    clearInterval(init);
}, 15000);


/*
/* let collections;
let activeCollection;
let media;
 STEP 2: Add toolbar

function renderToolbarDropdown(collections, activeCollection) {
    let dropdown = '';
    collections.forEach(collection => {
        dropdown = dropdown + `<option value="${collection.title}" ${(collection === activeCollection) ? 'selected' : ''}>${collection.title}</option>`
    });
    return dropdown;
};

function renderToolbar(element) {
    const toolBar = `
        <div style="display: flex; flex-direction: row;">
            <select>
                ${renderToolbarDropdown(collections, activeCollection)}
            </select>
            ${activeCollection.data.find(media$ => media$.title === window.location.href) ? '<button id="add">-</button>' : '<button id="add">+</button>'}
        </div>
    `;
    element.insertAdjacentHTML('beforebegin', toolBar);
    document.querySelector('#add').onclick = () => {
        addToCollection(extractMedia())
    };
};

/* STEP 3: Add media to collection *

function extractMedia() {
    const video = document.querySelectorAll('[type="video/mp4"]');
    if (video.length) {
        const url = video[0]['src'];
        return { title: window.location.href, type: 'video', url: url };
    }
    const isSlideshow = document.querySelector('.XCodT');
    if (isSlideshow) {
        const index = [...isSlideshow.parentElement.children].indexOf(isSlideshow);
        const url = document.querySelectorAll('[style="object-fit: cover;"]')[index]['src'];
        return { title: `${window.location.href}-${index}`, type: 'slide', url: url, index: index };
    }
    const url = document.querySelectorAll('[style="object-fit: cover;"]')[0]['src'];

    return { title: window.location.href, type: 'image', url: url };
};

function addToCollection(data) {
    getCollections()
        .then(() => {
            activeCollection['data'].push(data);
            chrome.storage.sync.set({ 'collections': collections });
            document.querySelector('#add').outerHTML = '<button id="remove">-</button>';
        });
};
 */
