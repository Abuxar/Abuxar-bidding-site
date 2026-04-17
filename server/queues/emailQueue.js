const Queue = require('bull');
const nodemailer = require('nodemailer');

const emailQueue = new Queue('email-queue', process.env.REDIS_URI || 'redis://127.0.0.1:6379');

emailQueue.process(async (job) => {
  const { type, email, data } = job.data;
  
  if (type === 'outbid') {
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
      subject: `You have been outbid on ${data.auctionTitle}`,
      html: `<p>A higher bid of $${data.newPrice} was placed.</p>`,
    };

    await transporter.sendMail(mailOptions);
  }
});

module.exports = emailQueue;
