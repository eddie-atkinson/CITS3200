import XLSX from 'xlsx';

function parseExcel(data) {
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

export { parseExcel, buildHTML };
