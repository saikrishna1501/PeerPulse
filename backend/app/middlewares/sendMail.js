import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const subject = {
    sendVerification: 'Peer Pulse Email Verification',
    passwordResetRequest: 'Peer Pulse password reset'
}


export const sendEmail = (email, url, firstName, type="sendVerification")=>{
    var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth:{
            user: process.env.SENDER_EMAIL_ADD,
            pass:process.env.PASS
        }
    });

    const source = fs.readFileSync(path.join(__dirname, `../templates/${type}.handlebars`), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const mailOptions = {
             from: process.env.SENDER_EMAIL_ADD,
             to: email,
             subject: subject[type],
             html:compiledTemplate({ url, firstName})
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