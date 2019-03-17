chrome.runtime.onMessage.addListener((message, sender) => {
  chrome.tabs.create({ url: 'remindme.html' })
});

//da cambiare con runtime.onStartup o windows.onCreated se mi serve debug
// se uso onCreated devo modificare l'ultima riga con questo:
//}, {windowTypes: [ "normal" ]});
chrome.runtime.onStartup.addListener(function () {
  chrome.storage.local.get(null, function (items) {
    let itemsToRemove = [];
    let isThereAnElement = false;
    for (key in items) {
      let value = JSON.parse(items[key]);
      let creationDate = new Date(value.creationDate + 'Z');
      let currentDate = new Date();
      let remainingDays = value.days;
      let differenceInDays = Math.floor((currentDate - creationDate) / (1000*60*60*24));
      if(differenceInDays>remainingDays){
        itemsToRemove.push(key);
      } else {
        isThereAnElement = true;
      }
    }
    chrome.storage.local.remove(itemsToRemove);
    if(isThereAnElement){
      chrome.tabs.create({ url: 'remindme.html' })
    }
  });
});