var _ = require('underscore'),
    dns = require('dns'),
    bytelabel = require('bytelabel'),
    trim = require('trim'),
    async = require('async'),
    pidInfo = require('./pidInfo'),
    ps = require('ps-node');


module.exports.Mapper = function(Connections, cb) {


    Connections = Connections.filter(function(Conn) {
        return Conn.ChildProcesses.length == 1;
    }).map(function(Conn) {
        Conn.Child = Conn.ChildProcesses[0];
        return Conn;
    }).map(function(Conn) {
        return Conn;
    }).map(function(Conn) {
        var TotalBytesToTransfer = 0;

        ConnLocal = Conn.Local.Host + ':' + Conn.Local.Port;
        ConnRemote = Conn.Remote.Host + ':' + Conn.Remote.Port;
        console.log(Conn);
        Conn.NetworkConnection = {
            ConnectionProgram: 'sshd',
            ConnectionPID: 0000,
            ActoveConnections: {
                Protocol: 'tcp',
                Local: {
                    Host: Conn.Local.Host,
                    Port: Conn.Local.Port,
                },
                Remote: {
                    Host: Conn.Remote.Host,
                    Port: Conn.Remote.Port,
                }
            }
        };
        Conn.Worker = {};
        Conn.Worker.Pid = Conn.Child.pid;
        Conn.Worker.Process = Conn.Child.proc;
        Conn.Stats = Conn.Stats || {};
        Conn.Stats.sent = Conn.Stats.sent || 0;
        Conn.CompletedBytes = bytelabel(Conn.Stats.sent.bytes || 'unknown');
        Conn.TotalBytes = bytelabel(TotalBytesToTransfer);
        Conn.Trend_bps = parseInt(Conn.Stats.Throughput_trend_bps);
        Conn.Trend_pps = parseInt(Conn.Stats.Throughput_trend_pps);
        Conn.CurrentRate_bps = Conn.Stats.Throughput_bps;
        Conn.CurrentRate_pps = Conn.Stats.Throughput_pps;
        return Conn;
    }).map(function(Conn) {
        //       delete Conn.PID;
        //      delete Conn.ChildProcesses;
        delete Conn.Child;
        delete Conn.Stats;
        return Conn;
    }).map(function(Conn) {
        return {
            Work: {
                Pid: Conn.PPID,
                TotalBytes: Conn.TotalBytes,
                CompletedBytes: Conn.CompletedBytes,
            },
            Network: {
                ConnectionProess: 'sshd',
                ConnectionPID: 1234,
                TCP: {
                    Local: Conn.Local,
                    Remote: Conn.Remote
                },
            },
            Worker: {
                Pid: parseInt(Conn.WorkerPid),
                Proc: Conn.WorkerProcess,
            },
            CurrentNetwork: {
                BytesPerSec: parseInt(Conn.CurrentRate_bps),
                PacketsPerSec: parseInt(Conn.CurrentRate_pps),
                ByteTrend: Conn.Trend_bps,
                PacketTrend: Conn.Trend_pps,
            },

        };
    });
    async.map(Connections, function(C, CCB) {
            pidInfo.pidInfo(C.Worker.Pid, function(e, pidI) {
                C.LocalProcess = {};

                C.LocalProcess.Cwd = pidI[4].cwd;
                C.LocalProcess.Cmd = pidI[0].argv.join(' ');
                C.LocalProcess.Binary = trim(C.LocalProcess.Cmd).split(' ')[0],
                    pidI[0].argv.join(' ');
                C.LocalProcess.State = pidI[2].stat.state;
                C.LocalProcess.Processor = pidI[2].stat.processor;
                C.LocalProcess.Pid = C.Worker.Pid;
                delete C.Bytes;
                delete C.Worker.Pid;
                delete C.Worker.Proc;
                delete C.Worker;
                CCB(e, C);
            });
        },
        function(e, Connections) {
            cb(e, Connections);
        });
};
