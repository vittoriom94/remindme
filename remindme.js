renderTable();

function createRow(key,value){
    var row = document.createElement('tr');
    addLink(key,row);
    addDays(value.days,row);
    addCreationDate(value.creationDate,row);
    addDeleteButton(row)
    row.setAttribute("id",key);
    return row;
}
function addLink(link, row){
    var column = document.createElement("td");
    var linkString = '<a href="' + link+'" target="_blank">'+link+'</a>';
    column.innerHTML+=linkString;
    row.appendChild(column);
}
function addDays(days, row){
    var column = document.createElement("td");
    column.innerHTML+=days;
    row.appendChild(column);
}
function addCreationDate(date, row){
    var column = document.createElement("td");
    column.innerHTML+=date;
    row.appendChild(column);
}
function addDeleteButton(row){
    var column = document.createElement("td");
    var deleteButton = document.createElement("input");
    deleteButton.setAttribute("type","image");
    deleteButton.setAttribute("src","images/delete.png");
    deleteButton.setAttribute("alt","Delete Link");
    column.appendChild(deleteButton);
    row.appendChild(column);
    deleteButton.addEventListener("click", deleteItem, false);
}



function deleteItem(event){
    
    var link = event.target.parentNode.parentNode.id;
    console.log("Called with link: " + link);
    chrome.storage.local.remove(link);
    renderTable();
    
}

function renderTable(){
    chrome.storage.local.get(null, function (items) {
        var tbody = document.getElementById('remindList');
        tbody.innerHTML = '';
        for(key in items) {
            let value = JSON.parse(items[key]);
            var row = createRow(key, value)
            tbody.appendChild(row);
            
        }
    });
    
}