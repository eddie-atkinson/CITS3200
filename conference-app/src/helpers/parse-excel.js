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
function addLogo(logo) {
  let returnlogo = '';
  if (logo) {
    returnlogo += `<td>This Session's Sponsor: <br> <img style="display:block;" width="100%" height="100%" src="${logo}" /></td>`;
  }
  return returnlogo;
}
function isLogo(logo) {
  let returnvalue = '';
  if (!logo) {
    returnvalue += 'colspan = "2"';
  }
  return returnvalue;
}

function generateAuthors(authors, speaker) {
  if (!authors || !speaker) return '';
  let returnString = authors;
  const startIndex = returnString.indexOf(speaker);
  if (startIndex === -1) {
    returnString += `, <span class='speaker'>${speaker}</span>`;
  } else {
    returnString = `${authors.slice(0, startIndex)}`;
    returnString += `<span class='speaker'>${speaker}</span>`;
    returnString += `${authors.slice(startIndex + speaker.length)}`;
  }
  return returnString;
}
function generateTables(days, links) {
  let tables = '';
  const dayKeys = Object.keys(days).sort();
  dayKeys.forEach((dayKey) => {
    const dayData = days[dayKey];
    const sessions = splitSessions(dayData);
    const sessionKeys = Object.keys(sessions).sort();
    tables += `<h2 class='title'> Day  ${numWords(dayKey)} Programme</h2>`;
    tables += '<table>';
    sessionKeys.forEach((sessionKey) => {
      const session = sessions[sessionKey];
      const sorter = (a, b) => session[a]['Start Time'] - session[b]['Start Time'];
      const conferenceKeys = Object.keys(session).sort(sorter);
      conferenceKeys.forEach((confKey) => {
        const conf = session[confKey];

        Object.values(links).forEach((link) => {
          if (conf.Title === link.confTitle) {
            conf.Link = link.confLink;
          }
        });
        const confTime = dateFromExcel(conf['Start Time']);
        // Time is assumed to be in UTC when parsed from Excel, DayJS it changes to current timezone
        // We want the time in its original format so we specify UTC
        if (conf.Link !== undefined) {
          tables += `<tr class='${conf.Type.toLowerCase()}'>
                    <td> ${dayjs(confTime).utc().format('h:mm')}</td>
                    <td ${isLogo(conf.Logo)}><a href="${conf.Link}">${
  conf.Title
}</a> <br /> <span class='authors' > ${generateAuthors(
  conf.Authors,
  conf.Speaker,
)} </span></td> ${addLogo(conf.Logo)}
                  </tr>`;
        } else {
          tables += `<tr class='${conf.Type.toLowerCase()}'>
                    <td> ${dayjs(confTime).utc().format('h:mm')}</td>
                    <td ${isLogo(conf.Logo)}>${
  conf.Title
} <br /> <span class='authors' > ${generateAuthors(
  conf.Authors,
  conf.Speaker,
)} </span></td> ${addLogo(conf.Logo)}
                  </tr>`;
        }
      });
    });
    tables += '</table>';
  });
  return tables;
}

function rowToHTML(rowData, theme, title, links, customCSS) {
  const days = orderByDay(rowData);
  return `<html>
      <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
      </head>
      <style>
        ${base}
        ${fetchStyling(theme)}
        ${customCSS}
      </style>
      <title></title>
      </head>
      <body>
        <div class='center'>
          <h1>
            ${title}
          </h1>
          ${generateTables(days, links)}
        </div>
      </body>
      </html>
  `;
}

export default function excelToHTML(formData) {
  const data = formData.excelData;
  const theme = formData.themeColour;
  const title = formData.confName;
  let customCSS = formData.cssData;
  if (formData.customCSS) {
    customCSS = formData.cssData;
  } else {
    customCSS = '';
  }
  const wb = XLSX.read(data, {
    type: 'binary',
  });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];

  const obj = ws;
  const links = [];

  Object.values(obj).forEach((val) => {
    if (val.l !== undefined && val.h !== undefined) {
      const ctitle = val.h;
      const clink = val.l.Rel.Target;
      links.push({ confTitle: ctitle, confLink: clink });
    }
  });
  const rowData = XLSX.utils.sheet_to_json(ws);
  if (rowData.length < 1) {
    throw new Error('First sheet in Excel document contains no data');
  }
  return rowToHTML(rowData, theme, title, links, customCSS);
}
