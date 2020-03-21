'use strict';

const collections = [
  {
    title: 'Default',
    active: true,
    data: [
      {
        title: 'Welcome',
        type: 'image',
        url: 'https://instagram.fsyd7-1.fna.fbcdn.net/v/t51.2885-15/e15/11142282_807944772625369_492138085_n.jpg?_nc_ht=instagram.fsyd7-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=xiY27fXhWfEAX_xnnmR&oh=83642a21ce4039fea35758fc088c02f5&oe=5E9C156F'
      }
    ]
  
  }
]

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ collections: collections }, () => {
    console.log('Initialised array');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.instagram.com' },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});