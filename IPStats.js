var request = require('request');
var pretty = require('prettyjson');


module.exports.query = function(ip, cb) {
    request('http://iraq.infinitumtech.net:3000/lua/host_get_json.lua?ifname=0&host=' + ip, function(e, response, body) {
        if (e) throw e;
//console.log(body);
        //cb(e, null);
        try{
        var J = JSON.parse(body);
}catch(err){
	J = {Error: err};
}
        var R = {};
 //       R.IP = ip;
 //       R.Mac = J.mac_address;

        R.rcvd = J.rcvd;
        R.sent = J.sent;

 //       R.ActivityStats = J.activityStats;
//        J.ndpiStats = J.ndpiStats || {};
//        R.SSH = J.ndpiStats.SSH || {};
        R.Troughput_trend_bps = J.throughput_trend_bps;
        R.Troughput_bps = J.throughput_bps;
        R.Throughput_trend_pps = J.throughput_trend_pps;
        R.Throughput_pps = J.throughput_pps;
 //       console.log(pretty.render(R));
        cb(e, R);
    });
};
