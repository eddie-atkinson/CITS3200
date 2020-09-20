import XLSX from 'xlsx';
import {
  base,
  orange,
  blue,
  turq,
  green,
} from './styles';

function generateRows(rowData, headers) {
  let returnString = '';
  rowData.forEach((item) => {
    returnString += '<tr>';
    headers.forEach((header) => {
      if (item[header]) {
        returnString += `<td>${item[header]}</td>`;
      } else {
        returnString += '<td></td>';
      }
    });
  });
  return returnString;
}

function fetchStyling(theme) {
  let returnTheme = '';
  if (theme === 'Blue') returnTheme = blue;
  else if (theme === 'Orange') returnTheme = orange;
  else if (theme === 'Turquoise') returnTheme = turq;
  else if (theme === 'Green') returnTheme = green;
  return returnTheme;
}

function rowToHTML(headers, rowData, theme) {
  return (`<html>
      <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <style>
        ${base}
        ${fetchStyling(theme)}
      </style>
      <title></title>
      </head>
      <body>
        <table>
        <thead>
          <tr>
            <th>${headers.join('</th><th>')}</th>
          </tr>
        </thead>
        <tbody>
          ${generateRows(rowData, headers)}

        </tbody>
        </table>
      </body>
      </html>
  `);
}

function orderByDay(data) {
  return data.reduce((total, item) => {
    const property = item.Day;
    const grouped = total;
    if (!grouped[property]) {
      grouped[property] = [];
    }
    grouped[property].push(item);
    return grouped;
  }, {});
}
const dummy = [
  {
    Name: 'Welcome and Introduction',
    Description: 'Welcome and introduction, including Welcome to Country by Barry McGuire Speaker',
    Type: 'Plenary',
    Session: '1',
    'Start Time': '9/3/2019 8:00',
    'End Time': '9/3/2019 8:30',
    'Location Name': 'Grand Ballroom 2 & 3',
    Authors: 'a Carneiro, AB Fourie, The University of Western Australia, Australia',
    Speaker: 'a Carneiro',
    Day: '1',
  },
  {
    Name: 'Keynote Address 1',
    Description: 'KEYNOTE: Why should we ‘Think Big’ on closure? L Tyler, J Heyes, BHP, Australia',
    Type: 'Plenary',
    Session: '1',
    'Start Time': '9/3/2019 8:30',
    'End Time': '9/3/2019 9:00',
    'Location Name': 'Grand Ballroom 2 & 3',
    Authors: 'Laura Tyler, BHP',
    Speaker: 'Laura Tyler',
    Day: 1,
  },
  {
    Name: 'Morning Tea',
    Description: 'Morning Tea',
    Type: 'Break',
    'Start Time': '9/5/2019 10:00',
    'End Time': '9/5/2019 10:30',
    'Location Name': 'Exhibition Area',
    Day: '3',
  },
];

orderByDay(dummy);
// console.dir(orderByDay(dummy));

export default function excelToHTML(data, theme) {
  const wb = XLSX.read(data, {
    type: 'binary',
  });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rowData = XLSX.utils.sheet_to_json(ws);
  if (rowData.length < 1) {
    throw new Error('First sheet in Excel document contains no data');
  }
  const headers = Object.keys(rowData[0]);
  return rowToHTML(headers, rowData, theme);
}
