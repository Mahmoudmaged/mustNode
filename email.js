

const nodeoutlook = require('nodejs-nodemailer-outlook')

function sendEmail(destEmail, message) {
    nodeoutlook.sendEmail({
        auth: {
            user: "mustDay3@outlook.com",
            pass: "1478530123M"
        },
        from: 'mustDay3@outlook.com',
        to: destEmail,
        subject: 'check email',
        html:message,

        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    });
}

module.exports = sendEmail
