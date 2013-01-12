/**
 * GET trending page
 */

var graph = require('fbgraph');

// Module level constants
var CLIENT_ID = '394935803933737';
var APP_SECRET = 'e209282a5bd5b1836d838e24b17652ee';
var REDIRECT_URI = 'http://faceblog.herokuapp.com/auth';

var options = {
    timeout:  3000,
    pool:     { maxSockets:  Infinity },
    headers:  { connection:  "keep-alive" }
  };

exports.index = function (req, res) {
  // get authorization url
  if (!req.query.code) {
    var authUrl = graph.getOauthUrl({
      "client_id"   :     CLIENT_ID,
      "redirect_uri":  REDIRECT_URI
    });
    if (!req.query.error) {
      res.redirect(authUrl);
    } else {
      console.log(req.query.error);
      res.send('access denied');
    }
    return;
  }

  // after user click, auth `code` will be set
  // we'll send that and get the access token
  graph.authorize({
    "client_id":      CLIENT_ID,
    "redirect_uri":   REDIRECT_URI,
    "client_secret":  APP_SECRET,
    "code":           req.query.code
  }, function (err, facebookRes) {
    console.log(facebookRes);
    graph
      .setOptions(options)
      .get("me", function (err, res) {
        if (err)
          console.log(err);
        else
          console.log(res);
      });

    res.redirect('/ITWORKS');
  });

};
