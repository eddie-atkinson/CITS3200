let tabl = document.createElement('table');
let tabrow = document.createElement('tr');
let tabhead = document.createElement('th');
let tabdata = document.createElement('td');

tabl.setAttribute('id', 'built');

//  Dummy data
let arr = [{
  'Name': 'Presentation 138',
  'Description': 'A demonstration of the cessation of spontaneous combustion in a coal overburden spoil pile',
  'Session Type': 'Conference',
  'Track': 'Session 11',
  'Start Time': 43712.493055555555,
  'End Time': 43712.506944444445,
  'Location Name': 'Cassia & Karri Rooms, Level 1',
  'Speakers': 'A Garvie, SRK\nConsulting (Australasia) Pty Ltd, Australia;\nK Donaldson, B Williams, Flinders Power,\nAustralia; J Chapman, SRK Consulting\n(Australasia) Pty Ltd, Australia',
},
{
  'Name': 'Presentation 37',
  'Description': 'Bang for your buck: revegetation of arid sites using coloniser species',
  'Session Type': 'Conference',
  'Track': 'Session 9',
  'Start Time': 43712.506944444445,
  'End Time': 43712.520833333336,
  'Location Name': 'Grand Ballroom 2',
  'Speakers': 'B Horner,\nG Christie, Succession Ecology, Australia; B\nWilliams, Flinders Power, Australia; AT Scanlon,\nJ Lemon, Succession Ecology, Australia',
}];

function addAllColumnHeaders(data, table) {
  let columnSet = [],
    tr = tabrow.cloneNode(false);
  for (let i = 0, l = data.length; i < l; i++) {
    for (let key in data[i]) {
      if (data[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
        columnSet.push(key);
        let th = tabhead.cloneNode(false);
        th.appendChild(document.createTextNode(key));
        tr.appendChild(th);
      }
    }
  }
  table.appendChild(tr);
  return columnSet;
}

function buildHtmlTable(data) {
  let table = tabl.cloneNode(false),
    columns = addAllColumnHeaders(data, table);
  for (let i = 0, maxi = data.length; i < maxi; ++i) {
    let tr = tabrow.cloneNode(false);
    for (let j = 0, maxj = columns.length; j < maxj; ++j) {
      let td = tabdata.cloneNode(false);
      td.appendChild(document.createTextNode(data[i][columns[j]] || ''));
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}

function returnHTML() {
  //  Just checking what it's returning
  console.dir(document.documentElement.innerHTML);

  return document.documentElement.innerHTML;
}

//  Function to call
//  Builds and appends a table with the correct format to the current document then
//  returns and removes it
function buildTable(data) {
  document.body.appendChild(buildHtmlTable(data));
  returnHTML();
  document.getElementById('built').remove();
}

//  Uncomment this to run
//  buildTable(arr);

export { buildHtmlTable, addAllColumnHeaders, returnHTML, buildTable };
