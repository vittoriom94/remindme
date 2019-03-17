let save = document.getElementById("save");
let deleteAll = document.getElementById("delete");
let showAll = document.getElementById("showAll");


save.onclick = function (element) {
  chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tabs) {
    let currentUrl = tabs[0].url;
    let days = document.getElementById("time").value;
    let info = '{"days": '+days+', "creationDate":"'+getDateFormatted()+'"}';
    chrome.storage.local.set({ [currentUrl]: info}, function () {
      console.log(currentUrl + " " + info + " was saved.");
      document.getElementById("linkSaved").style.display = "block";
    });
  });
};

function getDateFormatted() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }

  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

deleteAll.onclick = function (element) {
  chrome.storage.local.clear();
}

showAll.onclick = function (element) {
  chrome.runtime.sendMessage({});
}