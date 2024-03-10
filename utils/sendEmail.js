const nodemailer = require('nodemailer');
function sendEmail(email,OTP){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.LOGIN_MAIL,
          pass: process.env.PASS_MAIL
        }
    });
    
    const mailOptions = {
        from: process.env.LOGIN_MAIL,
        to: email,
        subject: 'Forget Password',
        text: `This is a code: ${OTP}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return false;
        } else {
            return true;
        }
      });
}

module.exports = sendEmail;