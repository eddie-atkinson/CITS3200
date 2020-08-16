import XLSX from 'xlsx';

export function parseExcel(data) {
  return XLSX.read(data, {
    type: 'binary',
  });
}

export function buildHTML(workbook) {
  return XLSX.write(workbook, {
    type: 'binary',
    bookType: 'html',
  });
}
