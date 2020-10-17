const base = `
.center {
  margin: auto;
  width: 90%;
  padding: 10px;
}
.authors {
  color: #58595b;
  font-style: italic;
}
.title {
  text-transform: capitalize;
  padding: 10px;
  margin: 10px;
}
.underline {
  text-decoration: underline;
}
body {
  font-family: "Century Gothic";
}
h2 {
  text-transform: uppercase;
  font-size: 200%;
}
.day {
  margin: 100px;
}
.time {
  text-align: left !important;
}
.break-title {
  text-align: center;
}
`;

const orange = `
.break {
  background-color: #fbb03f;
  color: #ffffff;
}
.header {
  background-color: #fee3c6;
}
`;

const blue = `
.break {
  background-color: #1b75bc;
  color: #ffffff;
}
.header {
  background-color: #9fc9eb;
}
`;

const turq = `
.break {
  background-color: #643695;
  color: #ffffff;
}
.header {
  background-color: #80deea ;
}
`;

const green = `

.break {
  background-color: #39b54a;
  color: #ffffff;
}
.header {
  background-color: #becca8 ;
}
`;

module.exports = {
  base,
  orange,
  blue,
  turq,
  green,
};
