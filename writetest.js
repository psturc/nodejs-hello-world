const fs = require('fs');
const http = require('http');

function testFileWriteToPV(pathToFile) {
  return new Promise(function(res, rej) {
    fs.writeFile(pathToFile, "test string", function (err) {
      if (err) {
        return rej(err);
      }
      console.log("Test of write access to the Persistent Volume succeeded");
      console.log("Data stored in the file in path:", pathToFile);
      res(pathToFile);
    });
  });
}

function testFileReadFromPV(pathToFile) {
  return new Promise(function(res, rej) {
    fs.readFile(pathToFile, 'utf-8', function (err, data) {
      if (err) {
        return rej(err);
      }
      console.log("Data from PV read successfully. Data:", data);
      res();
    });
  });
}
function startTheServer() {
  const app = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  });
  const port = process.env.PORT || 8080;
  app.listen(port, function() {
    console.log("HTTP server started successfully on port", port);
  });
}
testFileWriteToPV(process.env.PATH_TO_PV)
.then(testFileReadFromPV)
.then(startTheServer)
.catch(function (err) {
  console.error("Error occured:", err);
})

