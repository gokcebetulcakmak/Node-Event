var events = require('events');
var eventEmitter = new events.EventEmitter();


eventEmitter.on('miyav', function(sayi){
    console.log(sayi +" kedi duydum sanki!");
});
eventEmitter.emit('miyav',5);
