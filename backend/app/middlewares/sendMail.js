import nodemailer from 'nodemailer';

export const sendEmail = (email, url, firstName)=>{
    var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth:{
            user: "harisriya03@gmail.com",
            pass:process.env.pass
        }
    });

    const mailOptions = {
             from: process.env.SENDER_EMAIL_ADD,
             to: email,
             subject: "Peer Pulse Email Verification",
             html:`<div>Hi ${firstName}
             <h1>Welcome to Peer Pulse!</h1>
             Please verify your email by clicking the link below and become a member now:</div>
             <div><a href=${url}>here</a></div>`
         }
    
    Transport.sendMail(mailOptions,function(error,response){
        if(error){
            console.log(error)
        }
        else{
            console.log("Message sent")
        }
    })
    
}