
/*
 * GET users listing.
 */

exports.list = function(req, res){
  req.param('notes_url', null); 
  res.send("respond with a resource");
};