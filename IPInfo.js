#!/usr/bin/env node

var psnode = require('ps-node');


var ps = require('ps');
var procfs = require('procfs-stats'),

    request = require('request'),
    os = require('os'),
    netstat = require('netstat'),
    pretty = require('prettyjson'),
    psTree = require('ps-tree'),
    async = require('async'),
    me = '66.35.70.82:22',
    args = process.argv.slice(2),
    argPid = args[0] || 0,
    Format = [],
    pidStat = require('process_status'),
    pidInfo = function(PID, cb) {
        return cb(null, {});
        pidStat.get_status('sshd', Format, function(err, pidStatus) {
            if (err) throw err;
            var Info = {};
            if (pidStatus.PID == PID) {
                Info.ChildProcesses = pidStatus.processes;
            }
            cb(err, Info);
        });
    };

module.exports.query = function(Setup, meCB) {
    netstat.on('stdout', function(data) {
        J = netstat.parse(data).filter(function(n) {
            return n['Local-Address'] == me && n.Proto == 'tcp' && n.Inode > 0 && n.State == 'ESTABLISHED' && n['PID/Program-name'].split('/')[1].split(':')[0] == 'sshd' && n.User == 0;
        }).map(function(n) {
            return {
                PID: n['PID/Program-name'].split('/')[0],
                Remote: {
                    Host: n['Foreign-Address'].split(':')[0],
                    Port: n['Foreign-Address'].split(':')[1]
                },
                Local: {
                    Host: n['Local-Address'].split(':')[0],
                    Port: n['Local-Address'].split(':')[1]
                },
            };
        });
        if (argPid > 0)
            J = J.filter(function(n) {
                return n.PID == argPid;
            });
        async.map(J, function(n, cb) {
            psTree(n.PID, function(err, children) {
                if (err) throw err;
                n.ChildProcesses = children.map(function(p) {
                    return p.PID;
                });
                async.map(n.ChildProcesses, function(CP, cpCB) {
                    ps.lookup({
                        pid: CP
                    }, function(e, proc) {
                        cpCB(e, {
                            pid: CP,
                            proc: proc
                        });
                    });
                }, function(e, Children) {
                    n.ChildProcesses = Children;
                    cb(err, n);
                });
            });
        }, function(e, Connections) {
            if (e) throw e;
            meCB(e, Connections);
        });
    });
    netstat.on('stderr', function(err) {
        process.stderr.write(err);
    });
};