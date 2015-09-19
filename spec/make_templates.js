// creates templates.js file to inject backbone view templates from index.html.erb
// into the karma test environment.

var fs = require('fs');

fs.readFile('./app/views/welcome/index.html.erb', 'utf8', function(err, data){
  if (err) throw err;

  var templateStart = data.match(/<!-- Splash Templates -->/).index;
  data = data.slice(templateStart).replace(/\'/g, '').split('\n');

  var stringToWrite = '';

  for (var i = 0; i < data.length; i++) {
    stringToWrite += data[i];
  }

  var stringToWrite = '$("body").append(\'' + stringToWrite + '\');';

  fs.writeFile('./spec/templates.js', stringToWrite, 'utf8', function(err){
    if (err) throw err;
  })
})