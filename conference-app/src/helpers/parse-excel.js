import XLSX from 'xlsx';
import { base, orange } from './styles';

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

function rowToHTML(headers, rowData) {
  return (`<html>
      <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <style>
        ${base}
        ${orange}
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

export default function excelToHTML(data) {
  const wb = XLSX.read(data, {
    type: 'binary',
  });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  console.log(ws[0]);
  const rowData = XLSX.utils.sheet_to_json(ws);
  if (rowData.length < 1) {
    throw new Error('First sheet in Excel document contains no data');
  }
  const headers = Object.keys(rowData[0]);
  return rowToHTML(headers, rowData);
}
