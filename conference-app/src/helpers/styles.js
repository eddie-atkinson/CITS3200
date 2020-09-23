const base = `
.center {
  margin: auto;
  width: 50%;
  padding: 10px;
}
.authors {
  color: #58595b;
}
.title {
  text-transform: capitalize;
  padding: 10px;
  margin: 10px;
}
.speaker {
  text-decoration: underline;
}
`;

const orange = `
.break {
  background-color: #fbb03f;
  color: #ffffff;
}
.plenary {
  background-color: #fee3c6;
}
`;

const blue = `
.break {
  background-color: #1b75bc;
  color: #ffffff;
}
.plenary {
  background-color: #9fc9eb;
}
`;

const turq = `
.break {
  background-color: #643695;
  color: #ffffff;
}
.plenary {
  background-color: #80deea ;
}
`;

const green = `

.break {
  background-color: #39b54a;
  color: #ffffff;
}
.plenary {
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
