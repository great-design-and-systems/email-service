import EmailService from './emails';
import {
  GDSDomainDTO,
  GDSDomainPaginateHelper
} from 'gds-config';

const API = process.env.API_NAME || '/api/email/';

export default class EmailResource {
  constructor(app) {
    const emailService = new EmailService();

    app.get('/', (req, res) => {
      const domain = new GDSDomainDTO();
      domain.addPost('sendEmail', 'http://' + req.headers.host + API + 'send-email');
      res.status(200).send(domain);
    });

    app.post(API + 'send-email', (req, res) => {
      emailService.sendEmail(req.body, (err, result) => {
        if (err) {
          res.status(500).send(new GDSDomainDTO('ERROR_MESSAGE',
            err.message
          ))
        } else {
          const domain = new GDSDomainDTO('SEND-EMAIL', 'Email has been sent.');
          res.status(200).send(domain);
        }
      });
    });
  }
}