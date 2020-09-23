const base = `table a:link {
    color: #666;
    font-weight: bold;
    text-decoration:none;
  }
  .title {
    text-transform: capitalize;
  }
  .speaker {
    text-decoration: underline;
  }
  table a:visited {
    color: #999999;
    font-weight:bold;
    text-decoration:none;
  }
  table a:active,
  table a:hover {
    color: #bd5a35;
    text-decoration:underline;
  }
  table {
    font-family:Arial, Helvetica, sans-serif;
    color:#666;
    font-size:12px;
    text-shadow: 1px 1px 0px #fff;
    background:#eaebec;
    margin:20px;
  }
  table th {
    padding:21px 25px 22px 25px;

    background: #ededed;
    background: -webkit-gradient(linear, left top, left bottom, from(#ededed), to(#ebebeb));
    background: -moz-linear-gradient(top,  #ededed,  #ebebeb);
  }
  table th:first-child {
    text-align: left;
    padding-left:20px;
  }
  table tr:first-child th:first-child {
  }
  table tr:first-child th:last-child {
  }
  table tr {
    text-align: center;
    padding-left:20px;
  }
  table td:first-child {
    text-align: left;
    padding-left:20px;
    border-left: 0;
  }
  table td {
    padding:18px;

    background: #fafafa;
    background: -webkit-gradient(linear, left top, left bottom, from(#fbfbfb), to(#fafafa));
    background: -moz-linear-gradient(top,  #fbfbfb,  #fafafa);
  }
  table tr.even td {
    background: #f6f6f6;
    background: -webkit-gradient(linear, left top, left bottom, from(#f8f8f8), to(#f6f6f6));
    background: -moz-linear-gradient(top,  #f8f8f8,  #f6f6f6);
  }
  table tr:last-child td {
    border-bottom:0;
  }
  table tr:hover td {
    background: #f2f2f2;
    background: -webkit-gradient(linear, left top, left bottom, from(#f2f2f2), to(#f0f0f0));
    background: -moz-linear-gradient(top,  #f2f2f2,  #f0f0f0);
  }`;

const orange = `
table tr:hover td {
    background: #fee3c6;
  }

table th {
    background: #fbb03f;
}`;

const blue = `
table tr:hover td {
    background: #9fc9eb;
  }

table th {
    background: #1b75bc;
}`;

const turq = `
table tr:hover td {
    background: #b2b2b2;
  }

table th {
    background: #66cccc;
}`;

const green = `
table tr:hover td {
    background: #becca8;
  }

table th {
    background: #39b54a;
}`;

module.exports = {
  base,
  orange,
  blue,
  turq,
  green,
};
