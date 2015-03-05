var _ = require('underscore'),
    async = require('async');


module.exports.Filter = function(Connections, cb) {
    Connections = Connections.filter(function(C) {
        var pids = C.ChildProcesses.map(function(p) {
            return p.pid;
        });
        var procs = C.ChildProcesses.map(function(p) {
            return p.proc;
        });
        return _.contains(procs, 'zfs');
    });
    cb(null, Connections);
};