const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(email,code) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();
    console.log(code);
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: 'amirm.azarbashi@gmail.com', // generated ethereal user
      pass: 'b747400400@', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'amirm.azarbashi@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Verification Code ✔", // Subject line
    text: code.toString(), // plain text body
    html: `<b>Verification code is : ${code.toString()}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

module.exports = main;
