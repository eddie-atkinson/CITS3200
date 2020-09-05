import XLSX from 'xlsx';

function rowToHTML(headers, rowData) {
  return (`<html>
      <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <style>
        table {
          border: 1px solid black;
          padding: 20px;
        }
        th, td {
          padding: 20px;
          margin: 10px;
          border: 1px solid black;
        }
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
          ${rowData.map((item) => `<tr><td>${Object.values(item).join('</td><td>')}</tr>`).join('')}
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
  const rowData = XLSX.utils.sheet_to_json(ws);
  if (rowData.length < 1) {
    throw new Error('First sheet in Excel document contains no data');
  }
  const headers = Object.keys(rowData[0]);
  return rowToHTML(headers, rowData);
}
