var events=require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('Selam', function(isim){
    console.log("Merhaba "+ isim);
})
eventEmitter.emit('Selam', "Gökçe");