var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport(
    {
        service:'Hotmail',
        auth:{
            user:'your_mail',
            pass:''
        }
    }
);
var mailOption = 
{
    from:'your_mail',
    to: 'to_mail',
    subject:'Node.js ile mail atıyorum',
    text:'Selam '
}
transporter.sendMail(mailOption, function(err,info){
    if(err) throw err;
    console.log("Mail gönderildi"+ info);
});