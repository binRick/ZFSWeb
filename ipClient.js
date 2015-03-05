#!/usr/bin/env node

var args = process.argv.slice(2);

args[1] = args[1] || '',
    chalk = require('chalk'),
    clear = require("cli-clear"),
    p = require('prettyjson'),
    IPQuery = require('./IPQuery'),
    Filter = require('./Filter'),
    Mapper = require('./Mapper'),
    Log = function(O) {
        var op = {
            keysColor: 'yellow',
            dashColor: 'white',
            stringColor: 'white',
            numberColor: 'green',
            emptyArrayMsg: '(an empty array)',
            defaultIndentation: 2,
            inlineArrays: true,
        };
        var out = p.render(O, op);
        console.log(out);
    };
IPQuery.query(function(e, IPInfo) {
    if (e) throw e;
    if (IPInfo.length == 0) return;
    Filter.Filter(IPInfo, function(e, IPInfo) {
        if (e) throw e;
        Mapper.Mapper(IPInfo, function(e, IPInfo) {
            if (e) throw e;
            var D = IPInfo[0];
            if (args[1] != 'debug')
                clear();
            //           console.log('\n');
            var c = chalk.red('ZFS Snapshot', chalk.underline.bgBlue('chi') + ' - ');
            var cc = chalk.green(
                'I am a green line ' +
                chalk.blue.underline.bold('with a blue substring') +
                ' that becomes green again!'
            );
            //var error = chalk.bold.red;
            //console.log(chalk.green('Process: %s'), chalk.blue.bgRed.bold(IPInfo.LocalProcess.LocalProcessPID));
            Log(D);
        });
    });
    //Log(IPInfo);
    //    console.log(IPInfo);
    //   process.exit();
});