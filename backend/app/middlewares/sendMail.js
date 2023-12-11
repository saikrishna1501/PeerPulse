import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EmailTemplateOptions {
    constructor(email, firstName) {
        this.firstName = firstName;
        this.email = email;
    }
}

export class VerificationEmailTemplateOptions extends EmailTemplateOptions {
    constructor(email, firstName, url) {
        super(email, firstName);
        this.url = url;
    }
}

export class InPersonEventConfirmationEmailTemplateOptions extends EmailTemplateOptions {
    constructor(email, firstName, eventTitle, date, time, location ) {
        super(email, firstName);
        this.eventTitle = eventTitle;
        this.date = date;
        this.time = time;
        this.location = location;
    }
}

export class VirtualEventConfirmationEmailTemplateOptions extends EmailTemplateOptions {
    constructor(email, firstName, eventTitle, date, time ) {
        super(email, firstName);
        this.eventTitle = eventTitle;
        this.date = date;
        this.time = time;
    }
}

export class EventUnRegisterationConfirmationEmailTemplateOptions extends EmailTemplateOptions {
    constructor(email, firstName, eventTitle) {
        super(email, firstName);
        this.eventTitle = eventTitle;
    }
}

export const subject = {
    sendVerification: 'Peer Pulse Email Verification',
    passwordResetRequest: 'Peer Pulse password reset',
    eventRegistrationInPersonConfirmation: 'Event registration confirmation',
    eventRegistrationVirtualConfirmation: 'Event registration confirmation',
    eventUnRegistrationConfirmation: "Cancellation Confirmation"
}

export const emailTypes = {
    SEND_VERIFICATION: "sendVerification",
    PASSWORD_RESET_REQUEST: "passwordResetRequest",
    EVENT_REGISTRATION_INPERSON_CONFIRMATION: "eventRegistrationInPersonConfirmation",
    EVENT_REGISTRATION_VIRTUAL_CONFIRMATION: "eventRegistrationVirtualConfirmation",
    EVENT_UNREGISTRATION_CONFIRMATION: "eventUnRegistrationConfirmation"
}

/**
 * Send an email.
 * @param {VerificationEmailTemplateOptions | InPersonEventConfirmationEmailTemplateOptions | VirtualEventConfirmationEmailTemplateOptions | EventUnRegisterationConfirmationEmailTemplateOptions} emailOptions - The email options.
 * @param {string} type - use emailTypes as enum
 * @returns {void} - Nothing will be returned
 */
export const sendEmail = (emailOptions , type="sendVerification")=>{
    const {email, ...otheremailOptions} = emailOptions
    var Transport = nodemailer.createTransport({
        service: "Gmail",
        auth:{
            user: process.env.SENDER_EMAIL_ADD,
            pass:process.env.PASS
        }
    });
    console.log("Type", type);
    const source = fs.readFileSync(path.join(__dirname, `../templates/${type}.handlebars`), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const mailOptions = {
             from: process.env.SENDER_EMAIL_ADD,
             to: email,
             subject: subject[type],
             html:compiledTemplate(otheremailOptions)
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