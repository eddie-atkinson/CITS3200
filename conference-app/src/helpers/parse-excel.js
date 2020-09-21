import XLSX from 'xlsx';
import {
  base, orange, blue, turq, green,
} from './styles';

function orderByDay(rowData) {
  const reducer = (acc, row) => {
    if (!acc[row.Day]) {
      acc[row.Day] = [];
    }
    acc[row.Day].push(row);
    return acc;
  };
  return rowData.reduce(reducer, {});
}

function splitSessions(sessionBlock) {
  const reducer = (acc, conf) => {
    if (!acc[conf.Session]) {
      acc[conf.Session] = [];
    }
    acc[conf.Session].push(conf);
    return acc;
  };
  return sessionBlock.reduce(reducer, {});
}

function generateRows(rowData, headers) {
  let headercount = 0;
  console.log(splitSessions(orderByDay(rowData)['1']));
  let returnString = '';
  rowData.forEach((item) => {
    returnString += '<tr>';
    headers.forEach((header) => {
      if (item[header]) {
        if (headercount < 8) {
          returnString += `<td>${item[header]}</td>`;
          headercount += 1;
          //  if it's in the speaker row (row 9)
        } else if (headercount === 8) {
          returnString += `<td><u>${item[header]}</u></td>`;
          //  increment
          headercount += 1;
        } else if (headercount > 8) {
          returnString += `<td>${item[header]}</td>`;
          //  reset counter
          headercount = 0;
        }
        //  accomodating for when it creates an empty box, the headercount must still increment
      } else if (!item[header] && headercount < 8) {
        returnString += '<td></td>';
        headercount += 1;
      } else if (!item[header] && headercount === 8) {
        returnString += '<td></td>';
        headercount += 1;
      } else if (!item[header] && headercount > 8) {
        returnString += '<td></td>';
        headercount = 0;
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
  return `<html>
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
  `;
}

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
