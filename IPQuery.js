var Info = require('./IPInfo'),
    Stats = require('./IPStats'),
    p = require('prettyjson'),
    async = require('async');


module.exports.query = function(meCB) {
    Info.query({}, function(e, Infos) {
        if (e) throw e;
        async.map(Infos, function(i, cb) {
            Stats.query(i.Remote.Host, function(e, S) {
                if (e) throw e;
                i.Stats = S;
                cb(e, i);
            });
        }, function(e, Conns) {
            meCB(e, Conns);
        });
    });
};
