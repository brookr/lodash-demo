var request = require('superagent');
var _ = require('lodash');

function getDates(p) {
  return [p.startdate, p.person.birthday];
}

function dateDiff(d) {
  return d[0].substr(0, 4) - d[1].substr(0, 4);
}

var url = 'http://www.govtrack.us/api/v2/role?role_type=president';
request.get(url, function(err, res) {
  console.log("Avg starting Presidential age:", 
    _.sum(
      _.map(
        _.map(
          _.filter(
            res.body.objects, 
            'person.birthday'
          ), 
          getDates
        ), 
        dateDiff
      ) 
    )/ res.body.objects.length
  );
})
