import * as nodemailer from 'nodemailer';
import * as SMTPConnection from 'nodemailer/lib/smtp-connection';
import { once } from 'lodash';

const generateTransport = once(async () => {
  if (
    !process.env.MAIL_HOST
    && !process.env.MAIL_PORT
    && !process.env.MAIL_USER
    && !process.env.MAIL_PASS
  ) {
    if (process.env.NODE_ENV !== 'development') {
      throw new Error('No mail host specified.');
    }
    // eslint-disable-next-line no-console
    console.warn('Using test mailer.');
    const testAccount = await nodemailer.createTestAccount();
    const testTransportOptions = {
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    };
    return nodemailer.createTransport(testTransportOptions);
  }
  const transportOptions: SMTPConnection.Options = {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  };

  return nodemailer.createTransport(transportOptions);
});


const makeANiceEmail = (text: string) => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <p>${text}</p>
  </div>
`;

export { generateTransport, makeANiceEmail };
