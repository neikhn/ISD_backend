const nodemailer = require('nodemailer');

const sendEmailCreateOrder = async (email, orderItems) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'leminhtu17062003@gmail.com',
        pass: 'LeMinhtu17062003',
      },
    });

    const mailOptions = {
      from: 'leminhtu17062003@gmail.com',
      to: email,
      subject: 'Order Confirmation',
      text: `Your order has been placed successfully. Order details: ${JSON.stringify(orderItems)}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmailCreateOrder };
