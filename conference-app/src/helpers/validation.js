function validNum(num) {
  return !Number.isNaN(Number(num));
}
function validateSession(session) {
  const {
    Title,
    Session,
    // eslint-disable-next-line
    __rowNum__: rowNum,
    'Start Time': startTime,
    'End Time': endTime,
  } = session;
  if (!Title) {
    throw new Error(
      `No title specified for the conference on row ${rowNum + 1} of the Sessions sheet`,
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

module.exports = {
  validateSession,
};
