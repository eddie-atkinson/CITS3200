import XLSX from 'xlsx';
import numWords from 'num-words';
import {
  base, orange, blue, turq, green,
} from './styles';
import { validateSession, validateSet } from './validation';

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

function generateAuthors(authors, speaker) {
  if (!authors || !speaker) return '';
  let returnString = authors;
  const startIndex = returnString.indexOf(speaker);
  if (startIndex === -1) {
    returnString += `, <span class='underline'>${speaker}</span>`;
  } else {
    returnString = `${authors.slice(0, startIndex)}`;
    returnString += `<span class='underline'>${speaker}</span>`;
    returnString += `${authors.slice(startIndex + speaker.length)}`;
  }
  return returnString;
}

function formatTime(time) {
  return dayjs(time).utc().format('h:mm');
}

function generateTableHeader(setData) {
  let headerString = '';
  const { sessions } = setData;
  const sorter = (a, b) => a.sessionTrack - b.sessionTrack;
  const sessionKeys = Object.keys(sessions).sort(sorter);
  headerString += '<tr>';
  // Add column for time
  headerString += '<td class="time header"></td>';
  if (setData.setType.toLowerCase() === 'break') {
    return '';
  }
  sessionKeys.forEach((sessionKey) => {
    const {
      sessionTitle, sessionLocation, sessionChair, institution,
    } = sessions[sessionKey];
    headerString += `
    <td class='header'>
        <h5>
        ${sessionTitle} -
        ${sessionLocation}\n
        </h5>`;
    if (sessionChair) {
      headerString += `
      <span class='authors'>
        Chair: ${sessions[sessionKey].sessionChair}`;
      if (institution) {
        headerString += `,
        <span class='underline'>
        ${institution}
        </span>`;
      }
      headerString += '</span>';
    }
    headerString += '</td>';
  });
  headerString += '</tr>';
  return headerString;
}

function generateRows(setData) {
  const { conferences } = setData;
  const mappingTable = Object.keys(setData.sessions).reduce((acc, session) => {
    acc[session] = setData.sessions[session].sessionTrack;
    return acc;
  }, {});
  const rows = {};
  conferences.forEach((conference) => {
    if (!rows[conference['Start Time']]) {
      rows[conference['Start Time']] = {};
    }
    rows[conference['Start Time']][mappingTable[conference.Session]] = conference;
  });
  return rows;
}

function generateTableRows(setData, setType) {
  let rowString = '';
  if (setType.toLowerCase() === 'break') {
    const confBreak = setData.conferences.pop();
    rowString += `<tr class="${setType}">`;
    rowString += `<td class="time"> ${formatTime(confBreak['Start Time'])}</td>`;
    rowString += `<td class="break-title"> ${confBreak.Title}</td>`;
    rowString += '</tr>';
    return rowString;
  }
  const nStreams = Object.keys(setData.sessions).length;
  const rows = generateRows(setData, nStreams);
  const timeSorter = (a, b) => new Date(a) - new Date(b);
  const streamNums = Array.from({ length: nStreams }, (x, i) => i + 1).map(String);
  Object.keys(rows)
    .sort(timeSorter)
    .forEach((row) => {
      rowString += `<tr class=${setType}>`;
      rowString += `<td class="time">${formatTime(row)}</td>`;
      streamNums.forEach((streamNum) => {
        if (!rows[row][streamNum]) {
          rowString += '<td></td>';
        } else {
          const {
            Link, Title, Authors, Speaker,
          } = rows[row][streamNum];
          rowString += `<td class=${numWords(streamNum)}>`;
          if (Link) {
            rowString += `<a href=${Link}>`;
          }
          rowString += `${Title} <span class='authors'>${generateAuthors(Authors, Speaker)}</span>`;
          if (Link) {
            rowString += '</a>';
          }
          rowString += '</td>';
        }
      });
      rowString += '</tr>';
    });
  return rowString;
}

function generateTables(parsedData) {
  let tables = '';
  Object.keys(parsedData).forEach((dayKey) => {
    tables += `<div class = "day day-${dayKey}">`;
    tables += `<h2> Day ${numWords(dayKey)} Programme</h2>`;
    const dayData = parsedData[dayKey];
    const setKeys = Object.keys(dayData).sort();
    setKeys.forEach((setKey) => {
      const setData = dayData[setKey];
      const { setType } = setData;
      tables += '<table class="centered">';
      tables += generateTableHeader(setData);
      tables += generateTableRows(setData, setType);
      tables += '</table>';
    });
    tables += '</div>';
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
  const firstDay = sessionsData[0].Day;
  console.log(firstDay);
  Object.values(sessionsData).forEach((session) => {
    if (session.Day !== firstDay) {
      throw new Error(
        'Set contains sessions on differing days, all sessions in a set should occur on the same day',
      );
    }
    validateSession(session);
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
  Object.keys(setsData).forEach((setKey) => {
    const {
      Set, Session, Title, Chair, Institution, Track, Type, Location, Day,
    } = setsData[
      setKey
    ];
    const confsArr = sessionsData[Session];
    validateSet(setsData[setKey], confsArr);

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
