/* eslint-disable */
function validNum(num) {
  return !Number.isNaN(Number(num));
}
function validateSession(session) {
  const {
    Title,
    Session,
    // eslint-disable-next-line
    __rowNum__: rowNum,
    "Start Time": startTime,
    "End Time": endTime,
  } = session;
  if (!Title) {
    throw new Error(
      `No title specified for the conference on row ${rowNum + 1} of the Sessions sheet`
    );
  }
  if (!validNum(Session)) {
    throw new Error(`Session number format invalid for session "${Title}" on row ${rowNum + 1}`);
  }
  if (!startTime) {
    throw new Error(`Start time invalid for session "${Title}" on row ${rowNum + 1}`);
  }
  if (!endTime) {
    throw new Error(`End time invalid for session "${Title}" on row ${rowNum + 1}`);
  }
}

function validateSet(set, confsArr) {
  const {
    Set,
    Session,
    Title,
    Track,
    Type,
    Day,
    // eslint-disable-next-line
    __rowNum__: rowNum,
  } = set;
  if (!Title) {
    throw new Error(`Set ${Set} on row ${rowNum + 1} has no title`);
  }
  if (!confsArr) {
    throw new Error(
      `Set ${Set} on row ${
        rowNum + 1
      } references session ${Session}, session ${Session} contains no conferences.`
    );
  }
  if (!Track) {
    throw new Error(`Set ${Set} "${Title}" on row ${rowNum + 1} has no session track specified`);
  }
  if (!Type) {
    throw new Error(
      `Set ${Set} "${Title}" on row ${rowNum + 1} does not have a set type specified`
    );
  }
  if (!Day) {
    throw new Error(`Set ${Set} "${Title}" on row ${rowNum + 1} does not have a day specified`);
  }
  if (!validNum(Set)) {
    throw new Error(`Set "${Title}" on row ${rowNum + 1} has an invalid set number "${Set}"`);
  }
  if (!validNum(Session)) {
    throw new Error(
      `Set ${Set} "${Title}" on row ${rowNum + 1} has an invalid session number "${Session}"`
    );
  }
}

function checkSessionSets(setsData, sessionsData) {
  const setSessionList = new Set();
  Object.values(setsData).forEach((set) => setSessionList.add(set.Session));
  Object.keys(sessionsData).forEach((sessionNum) => {
    if (!setSessionList.has(parseInt(sessionNum, 10))) {
      throw new Error(
        `Session ${sessionNum} is referenced in the Sessions sheet but not by any set`
      );
    }
  });
}
module.exports = {
  validateSession,
  validateSet,
  checkSessionSets,
};
