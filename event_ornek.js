var fs=require('fs');
var events = require('events');

var dosyaOku = fs.createReadStream('a.html'); //Dosyayı açıyor ve bekliyor

//Dosya açıldığında
dosyaOku.on('open', function(){  
    console.log("Dosya açık!");
}); 