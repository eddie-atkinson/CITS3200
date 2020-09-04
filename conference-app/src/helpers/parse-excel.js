import XLSX from 'xlsx';

function excelToHTML(data) {
  const wb = XLSX.read(data, {
    type: 'binary',
  });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rowData = XLSX.utils.sheet_to_json(ws);
  if (rowData.length < 1) {
    throw new Error('First sheet in Excel document contains no data');
  }
  console.log(rowData);
  const headers = Object.keys(rowData[0]);
  console.log(headers);

  // TODO call function which converts data into HTML string
  // return htmlString
}

function parseExcel(data) {
  excelToHTML(data);
  return XLSX.read(data, {
    type: 'binary',
  });
}

function buildHTML(workbook) {
  return XLSX.write(workbook, {
    type: 'binary',
    bookType: 'html',
  });
}

export { excelToHTML, parseExcel, buildHTML };
