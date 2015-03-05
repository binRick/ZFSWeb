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
    ['Src', 'Dst', 'Completed', 'Size', 'Runtime', 'Rate']
);
console.log(table.toString());


var zpoolTable = new Table({
    chars: {
        'mid': '',
        'left-mid': '',
        'mid-mid': '',
        'right-mid': ''
    }
});
zpoolTable.push(
    ['Src', 'Dst', 'Completed', 'Size', 'Runtime', 'Rate']
);
console.log(zpoolTable.toString());