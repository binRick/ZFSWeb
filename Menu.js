var Menu = require('terminal-menu');
var menu = Menu({
    width: 29,
    x: 4,
    y: 2
});
menu.reset();
menu.write('SERIOUS BUSINESS TERMINAL\n');
menu.write('-------------------------\n');

menu.add('ADD TRANSACTION INVOICE');
menu.add('BUSINESS INTELLIGENCE');
menu.add('ACCOUNTS PAYABLE');
menu.add('LEDGER BOOKINGS');
menu.add('INDICATOR CHART METRICS');
menu.add('BACKUP DATA TO FLOPPY DISK');
menu.add('RESTORE FROM FLOPPY DISK');
menu.add('EXIT');

menu.on('select', function(label) {
    menu.close();
    console.log('SELECTED: ' + label);
});
process.stdin.pipe(menu.createStream()).pipe(process.stdout);

process.stdin.setRawMode(true);
menu.on('close', function() {
    process.stdin.setRawMode(false);
    process.stdin.end();
});