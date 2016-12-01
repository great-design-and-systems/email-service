import Mailer from '../control/mailer';
export default class EmailService {

  sendEmail(data, callback) {
    new Mailer(data, callback);
  }

}