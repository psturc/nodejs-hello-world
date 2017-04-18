var fs = require('fs');

fs.writeFile('/var/log/node/testfile', "hello", function (err) {
  if (err) {
    return console.error(err);
  }
  console.log("the file was saved");
});

fs.readFile('/var/log/node/testfile', 'utf-8', function (err, data) {
  if (err) {
    return console.error(err);
  }
  console.log("DATA FROM FILE:", data);
});
