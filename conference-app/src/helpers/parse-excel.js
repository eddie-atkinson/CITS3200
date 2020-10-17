// import { session } from 'electron';
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

function dateFromExcel(excelDate) {
  // Credit: Christopher Scott
  // https://gist.github.com/christopherscott/2782634
  let newDate = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
  const milliSecondsInMinute = 60000;
  // Round the time up to the nearest minute to take account of small conversion errors
  newDate = new Date(Math.round(newDate.getTime() / milliSecondsInMinute) * milliSecondsInMinute);
  if (Number.isNaN(newDate)) {
    throw new Error(`Non-excel style date used ${excelDate}`);
  }
  return newDate;
}

function fetchStyling(theme) {
  let returnTheme = '';
  if (theme === 'Blue') returnTheme = blue;
  else if (theme === 'Orange') returnTheme = orange;
  else if (theme === 'Turquoise') returnTheme = turq;
  else if (theme === 'Green') returnTheme = green;
  else if (theme === 'None') returnTheme = '';
  return returnTheme;
}

// function generateAuthors(authors, speaker) {
//   if (!authors || !speaker) return '';
//   let returnString = authors;
//   const startIndex = returnString.indexOf(speaker);
//   if (startIndex === -1) {
//     returnString += `, <span class='speaker'>${speaker}</span>`;
//   } else {
//     returnString = `${authors.slice(0, startIndex)}`;
//     returnString += `<span class='speaker'>${speaker}</span>`;
//     returnString += `${authors.slice(startIndex + speaker.length)}`;
//   }
//   return returnString;
// }
// function generateTables(days, links) {
//   let tables = '';
//   const dayKeys = Object.keys(days).sort();
//   dayKeys.forEach((dayKey) => {
//     const dayData = days[dayKey];
//     const sessions = splitSessions(dayData);
//     const sessionKeys = Object.keys(sessions).sort();
//     tables += `<h2 class='title'> Day  ${numWords(dayKey)} Programme</h2>`;
//     tables += '<table>';
//     sessionKeys.forEach((sessionKey) => {
//       const session = sessions[sessionKey];
//       const sorter = (a, b) => session[a]['Start Time'] - session[b]['Start Time'];
//       const conferenceKeys = Object.keys(session).sort(sorter);
//       conferenceKeys.forEach((confKey) => {
//         const conf = session[confKey];

//         Object.values(links).forEach((link) => {
//           if (conf.Title === link.confTitle) {
//             conf.Link = link.confLink;
//           }
//         });
//         const confTime = dateFromExcel(conf['Start Time']);
//      //Time is assumed to be in UTC when parsed from Excel, DayJS it changes to current timezone
//         //We want the time in its original format so we specify UTC
//         if (conf.Link !== undefined) {
//           tables += `<tr class='${conf.Type.toLowerCase()}'>
//                     <td> ${dayjs(confTime).utc().format('h:mm')}</td>
//                     <td><a href="${conf.Link}">${
//   conf.Title
// }</a> <br /> <span class='authors'> ${generateAuthors(
//   conf.Authors,
//   conf.Speaker,
// )} </span></td>
//                   </tr>`;
//         } else {
//           tables += `<tr class='${conf.Type.toLowerCase()}'>
//                     <td> ${dayjs(confTime).utc().format('h:mm')}</td>
//                     <td>${conf.Title} <br /> <span class='authors'> ${generateAuthors(
//   conf.Authors,
//   conf.Speaker,
// )} </span></td>
//                   </tr>`;
//         }
//       });
//     });
//     tables += '</table>';
//   });
//   return tables;
// }

function formatTime(time) {
  return dayjs(time).utc().format('h:mm');
}

function generateTableHeader(setData) {
  let headerString = '';
  const { sessions } = setData;
  const sorter = (a, b) => (a.sessionTrack < b.sessionTrack ? a : b);
  const sessionKeys = Object.keys(sessions).sort(sorter);
  headerString += '<tr>';
  // Add column for time
  headerString += '<td class="time header"></td>';
  if (setData.setType.toLowerCase() === 'break') {
    return '';
  }
  sessionKeys.forEach((sessionKey) => {
    headerString += `
    <td class='header'>
        <h5>
        ${sessions[sessionKey].sessionTitle} -
        ${sessions[sessionKey].sessionLocation}\n
        </h5>
        <span class='authors'>
        Chair: ${sessions[sessionKey].sessionChair},
        <span class='underline'>
        ${sessions[sessionKey].institution}
        </span>
        </span>
    </td>`;
  });
  headerString += '</tr>';
  return headerString;
}

function generateRows(conferences) {
  const rows = {};
  conferences.forEach((conference) => {
    if (!rows[conference['Start Time']]) {
      rows[conference['Start Time']] = [];
    }
    rows[conference['Start Time']].push(conference);
  });
  return rows;
}

function generateTableRows(setData) {
  let rowString = '';
  const nStreams = Object.keys(setData.sessions).length;
  const rows = generateRows(setData.conferences, nStreams);
  const rowSorter = (a, b) => (a.sessionTrack < b.sessionTrack ? a : b);
  Object.keys(rows)
    .sort(rowSorter)
    .forEach((rowKey) => {
      rowString += '<tr>';
      const row = rows[rowKey].sort(rowSorter);
      rowString += `<td class="time">${formatTime(rowKey)}</td>`;
      row.forEach((conf) => {
        rowString += `<td >${conf.Title}</td>`;
      });
      rowString += '</tr>';
    });
  // remember to sort rows by track before outputting
  return rowString;
}

function generateTables(parsedData) {
  let tables = '';
  Object.keys(parsedData).forEach((dayKey) => {
    tables += `<h2> Day ${numWords(dayKey)} Programme</h2>`;
    const dayData = parsedData[dayKey];
    const setKeys = Object.keys(dayData).sort();
    setKeys.forEach((setKey) => {
      const setData = dayData[setKey];
      tables += '<table class="centered striped">';
      tables += generateTableHeader(setData);
      tables += generateTableRows(setData);
      tables += '</table>';
    });
  });
  return tables;
}

function dataToHTML(parsedData, themeColour, confName, cssData) {
  return `<html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    </head>
    <style>
      ${base}
      ${fetchStyling(themeColour)}
      ${cssData}
    </style>
    <title></title>
    </head>
    <body>
      <div class='center'>
        <h1>
          ${confName}
        </h1>
        ${generateTables(parsedData)}
      </div>
    </body>
    </html>
  `;
}

function fetchSheets(workbook) {
  const sheets = {};
  sheets.sessionSetsSheet = workbook.Sheets.Sets;
  sheets.sessionsSheet = workbook.Sheets.Sessions;
  if (!sheets.sessionSetsSheet) {
    throw new Error('The Sets sheet could not be parsed from the spreadsheet');
  }
  if (!sheets.sessionsSheet) {
    throw new Error('The Sessions sheet could not be parsed from the spreadsheet');
  }
  return sheets;
}

function parseSessions(sessionsData) {
  const sessionsObj = {};
  Object.values(sessionsData).forEach((session) => {
    if (!sessionsObj[session.Session]) {
      sessionsObj[session.Session] = [];
    }
    const sessionObj = session;
    sessionObj['Start Time'] = dateFromExcel(session['Start Time']);
    sessionObj['End Time'] = dateFromExcel(session['End Time']);
    sessionsObj[session.Session].push(session);
  });
  return sessionsObj;
}

function parseSets(setsData, sessionsData) {
  const finalData = {};
  Object.keys(setsData).forEach((key) => {
    const {
      Set, Session, Title, Chair, Institution, Track, Type, Location, Day,
    } = setsData[key];
    const confsArr = sessionsData[Session];
    if (!confsArr) {
      throw new Error(
        `Set ${Set} references session ${Session}, but there are no conferences specified for session ${Session}`,
      );
    }
    if (!finalData[Day]) {
      finalData[Day] = {};
    }
    if (!finalData[Day][Set]) {
      finalData[Day][Set] = {
        conferences: [],
        sessions: {},
        setType: Type,
      };
    }
    if (!finalData[Day][Set][Session]) {
      finalData[Day][Set].sessions[Session] = {
        sessionTitle: Title,
        sessionChair: Chair,
        institution: Institution,
        sessionTrack: Track,
        sessionLocation: Location,
      };
      finalData[Day][Set].conferences.push(...confsArr);
    }
  });
  return finalData;
}

export default function excelToHTML(formData) {
  const {
    excelData, themeColour, confName, customCSS,
  } = formData;
  let { cssData } = formData;
  if (!customCSS) {
    cssData = '';
  }
  const wb = XLSX.read(excelData, {
    type: 'binary',
  });
  const { sessionsSheet, sessionSetsSheet } = fetchSheets(wb);
  let sessionsData = XLSX.utils.sheet_to_json(sessionsSheet);
  const setsData = XLSX.utils.sheet_to_json(sessionSetsSheet);
  sessionsData = parseSessions(sessionsData);
  const parsedData = parseSets(setsData, sessionsData);
  return dataToHTML(parsedData, themeColour, confName, cssData);
}
