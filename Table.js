var Table = require('cli-table');
var table = new Table({
    chars: {
        'mid': '',
        'left-mid': '',
        'mid-mid': '',
        'right-mid': ''
    }
});
table.push(
    ['PID', 'Local', 'Remote', 'Local ZFS', 'Remote ZFS', 'Rate', 'Completed', 'Total']
);

console.log(table.toString());