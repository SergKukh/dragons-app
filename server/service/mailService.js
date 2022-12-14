const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }

    async sendActiovationMail(email, actiovationLink) {
        const link = `${process.env.URL}/api/activate/${actiovationLink}`;
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Account activation for ' + process.env.NAME,
            text: '',
            html:
                `
            <div>
                <h1>Follow the link to activate</h1>
                <a href="${link}">${link}</a>
            </div>
            `
        })
    }
}

module.exports = new MailService();