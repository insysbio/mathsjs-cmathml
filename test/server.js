const math = require("mathjs")
  , prettyJSONStringify = require('pretty-json-stringify')
   , _ = require("lodash")
   , fs = require("fs"),
   express = require("express"),
   serveStatic = require('serve-static');

math.import(require("../src/to_content_mathml"));

exports = [
  require("../src/to_content_mathml")
];

var http = require('http');
var path = require('path');
var app = express();


app.use('/', serveStatic("test/public", {'index': ['index.html', 'index.html']}));


app.get("/mathsToCMathML", function(request, response){
  let formula = math.parse(request.query.formula);
  response.send(
    {
      'formula': formula,
      'tex': formula.toTex(),
      'cMathML': formula.toCMathML().toString()
    });
});


app.set('port', 3000);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
