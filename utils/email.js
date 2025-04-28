const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (options) => {
  // Create a transporter

  var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },

    //TO USE THIS ACTIVATED IN YOUR GMAIL ACCOUNT
    // 1. Go to your Google Account settings.
    // 2. Click on "Security" in the left sidebar.
    // 3. Scroll down to "Less secure app access" and click on it.
    // 4. Toggle the switch to allow less secure apps to access your account.
    // 5. Confirm the changes if prompted.
  });
  // Define the email options
  const mailOptions = {
    from: 'Mohmad Murtaza <anusha@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
