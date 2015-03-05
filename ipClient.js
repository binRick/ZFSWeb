#!/usr/bin/env node

var p = require('prettyjson');

var IPQuery = require('./IPQuery');
var Log = function(O) {
    console.log(p.render(O));
};


IPQuery.query(function(e, IPInfo) {
    if (e) throw e;
    if (IPInfo.length == 0) return;
var D = IPInfo[0];
Log(D);
    //Log(IPInfo);
//    console.log(IPInfo);
    process.exit();
});
