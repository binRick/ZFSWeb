var bar = require('terminal-bar');


console.log(bar([
    [1, 2, 3, 4, 5],
    [8, 7, 6, 5, 4],
    [3, 3, 3, 3, 3]
], {
    height: 8,
    width: 30,
    color: true,
    title: 'ZFS Transfers',
    color: ['red', 'green', 'blue', 'cyan', 'yellow']
}))