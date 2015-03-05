var procfs = require('procfs-stats');
var async = require('async');


var PID = 22783;
var ps = procfs(PID);
//var Meths = ['argv', 'fds','cwd'];
var Meths = ['argv', 'fds', 'stat', 'env', 'cwd'];


module.exports.pidInfo = function(pid, CB) {

    async.map(Meths, function(M, cb) {
        ps[M](function(e, d) {
            var G = {};
            G[M] = d;
            cb(e, G);
        });
    }, function(e, Is) {
        CB(e, Is);
    });


};