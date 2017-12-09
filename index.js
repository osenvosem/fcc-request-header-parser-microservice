const express = require("express");

const app = express();

function getInfo(req) {
  const ua = req.headers["user-agent"];
  return {
    ipaddress: req.headers["x-forwarded-for"] || req.ip,
    language: req.acceptsLanguages()[0],
    software: ua.slice(ua.indexOf("(") + 1, ua.indexOf(")"))
  };
}

// home page
app.get("/", (req, res) => {
  const clientData = getInfo(req);

  const page = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
      <title>Free Code Camp Request Header Parser Microservice</title>
      <style>body {font: 1em "Open Sans"; margin: 40px}</style>
    </head>
    <body>
      <h2>Free Code Camp :: Request Header Parser Microservice/h2>
      <hr>
      <ul>
        <li>Your IP Address is <em>${clientData.ipaddress}</em></li>
        <li>Your language is <em>${clientData.language}</em></li>
        <li>Your software is <em>${clientData.software}</em></li>
      </ul>
      <hr>
      <a href="/whoami">Get JSON</a>
    </body>
    </html>
  `;

  res.send(page);
});

app.get("/whoami", (req, res) => res.send(getInfo(req)));

app.listen(process.env.PORT || 3000);
