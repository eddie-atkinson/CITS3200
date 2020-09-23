import XLSX from 'xlsx';
import numWords from 'num-words';
import {
  base, orange, blue, turq, green,
} from './styles';

const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');

dayjs.extend(timezone);
dayjs.extend(utc);

function orderByDay(rowData) {
  const reducer = (acc, row) => {
    const intDay = parseInt(row.Day, 10);
    if (Number.isNaN(intDay)) {
      throw new Error(
        'Sheet format invalid, one of the day descriptors could not be parsed as an integer',
      );
    }
    if (!acc[row.Day]) {
      acc[row.Day] = [];
    }
    acc[intDay].push(row);
    return acc;
  };
  return rowData.reduce(reducer, {});
}

function splitSessions(sessionBlock) {
  const reducer = (acc, conf) => {
    const intSess = parseInt(conf.Session, 10);
    if (Number.isNaN(intSess)) {
      throw new Error(
        `Sheet format invalid, conference ${conf.Title}'s session number could not be parsed as an integer`,
      );
    }
    if (!acc[conf.Session]) {
      acc[conf.Session] = [];
    }
    acc[conf.Session].push(conf);
    return acc;
  };
  return sessionBlock.reduce(reducer, {});
}

function dateFromExcel(excelDate) {
  // Credit: Christopher Scott
  // https://gist.github.com/christopherscott/2782634
  const newDate = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
  if (Number.isNaN(newDate)) {
    throw new Error(`Non-excel style date used ${excelDate}`);
  }
  return newDate;
}

function generateRows(rowData, headers) {
  let headercount = 0;
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
function generateTables(days) {
  let tables = '';
  const dayKeys = Object.keys(days).sort();
  dayKeys.forEach((dayKey) => {
    const dayData = days[dayKey];
    const sessions = splitSessions(dayData);
    const sessionKeys = Object.keys(sessions).sort();
    tables += `<h2 class='title'> Day  ${numWords(dayKey)} Programme`;
    tables += '<table>';
    sessionKeys.forEach((sessionKey) => {
      const session = sessions[sessionKey];
      const conferenceKeys = Object.keys(session).sort(
        (a, b) => dateFromExcel(a['Start Time']) - dateFromExcel(b['Start Time']),
      );
      conferenceKeys.forEach((confKey) => {
        const conf = session[confKey];
        const confTime = dateFromExcel(conf['Start Time']);
        tables += `<tr>
                    <td> ${dayjs(confTime).utc().format('D/M h:mm A')}</td>
                    <td>${conf.Title}</td>
                  </tr>`;
      });
    });
    tables += '</table>';
  });
  generateRows([days], ['hello world']);
  return tables;
}

function rowToHTML(headers, rowData, theme) {
  const days = orderByDay(rowData);
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
        ${generateTables(days)}
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
