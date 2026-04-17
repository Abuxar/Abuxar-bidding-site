const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your Bidding Account',
      html: `<p>Please click the link to verify your email: <a href="http://localhost:3000/verify/${token}">Verify Email</a></p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendVerificationEmail };
