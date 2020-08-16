import XLSX from 'xlsx';

export default function parseExcel(data) {
  const workbook = XLSX.read(data, {
    type: 'binary',
  });
  console.log(workbook);
}
