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

let str =
  '<!DOCTYPE html>\
<html>\
<head>\
<meta charset="utf-8">\
<meta name="viewport" content="width=device-width, initial-scale=1.0">\
<title></title>\
</head>\
<body>\
<table>'
function buildHtmlTable(data) {
  //make new row for headers
  let columnSet = [];
  let l = data.length;
  for (let i = 0; i < l; i++) {
    for (let key in data[i]) {
      if (data[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
        columnSet.push(key);
        str = str + '<tr><th>' + key + '</th></tr>';
      }
    }
  }
  for (let i = 0, maxi = data.length; i < maxi; ++i) {
    for (let j = 0; j < columnSet.length; ++j) {

      str = str + '<tr><td>' + data[i][columnSet[j]];
    }
  }

  str = str + '</body></html>'

  // Check output in console
  console.log(str);
  return str;
}

buildHtmlTable(arr);

