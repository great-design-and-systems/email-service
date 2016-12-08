import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport'
const HOST = process.env.MAIL_SERVER_HOST;
const PORT = process.env.MAIL_SERVER_PORT;
const SERVICE = process.env.MAIL_SERVICE || 'Gmail';
const USER = process.env.MAIL_AUTH_USER;
const PASS = process.env.MAIL_AUTH_PASSWORD;

export default class Mailer {
    constructor(opts, callback) {
        let transportOpts;
        if (HOST && PORT) {
            transportOpts = {
                host: HOST,
                port: PORT,
                secure: true,
                auth: {
                    user: USER,
                    pass: PASS
                }
            }
        } else {
            transportOpts = {
                service: SERVICE,
                auth: {
                    user: USER,
                    pass: PASS
                }
            }
        }
        console.log('transportOpts: ', transportOpts);
        let transporter = nodemailer.createTransport(smtpTransport(transportOpts));

        let mailOpts = {
            from: opts.sender,
            replyTo: opts.sender,
            to: opts.recipient,
            subject: opts.subject,
            html: opts.content
        };
        console.log('mailOpts: ', mailOpts);

        console.log('Sending Mail');
        transporter.sendMail(mailOpts, (err, response) => {
            if (err) {
                global.gdsLogger.logError(err);
                callback(err);
            } else {
                console.log('Message sent: ' + response);
                callback(null, response.message);
            }
        });
    }
}
