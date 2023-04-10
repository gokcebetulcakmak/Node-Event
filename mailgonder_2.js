var http = require('http');
var url = require('url');
var fs = require('fs');
var mysql = require('mysql');

var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "nodedb"
    }
);
con.connect(function (err) {
    if (err) throw err;
    console.log("Baglandi!");
});

http.createServer(function (req, res) {

    fs.readFile('giris_form.html', function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end();
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
  
    var bilgi = url.parse(req.url, true).query;

    if (bilgi.ad && bilgi.sifre) {

        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport(
            {
                service: 'Hotmail',
                auth: {
                    user: 'your_email',
                    pass: 'your_password'
                }
            }
        );
        var mailOption =
        {
            from: 'your_email',
            to: bilgi.ad,
            subject: 'Başarısız giriş',
            text: "Adınıza giriş yapılmak isteniyor"
        }
        
        var sql = "SELECT * FROM user WHERE username = '" +bilgi.ad+ "' AND password = '" + bilgi.sifre + "'";

        var sql_notpass = "SELECT * FROM user WHERE username = '" +bilgi.ad+ "' AND password != '" + bilgi.sifre + "'";

        con.query(sql, function(err, result){


            var giris = false;

            if(result.length > 0){
                giris = true;
            }
            
            if(giris == true)
            {
                console.log("Giris Yapildi");
            }
            else if(giris == false)
            {
               
                con.query(sql_notpass, function(err, result){
                    console.log("Kullanici adi dogru ancak sifre hatali!");

                    transporter.sendMail(mailOption, function(err, info){
                        if(err) throw err;
                        console.log("Mail gonderildi.");
                    })
                })
            }
            

        });

    }


}).listen(8080);
