const sgMail = require('@sendgrid/mail')
const { text } = require('express')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomeMail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'lokeshwaran.c@gmail.com',
		subject: 'Welcome to Task App',
		text: `Hi ${name}!, Your account created successfully`,
	})
}

const sendUnsubscribeMail = (email, name) =>{
	sgMail.send({
		to: email,
		from: 'lokeshwaran.c@gmail.com',
		subject: 'Bye bye to Task App',
		text: `Hi ${name}!, Your account deleted successfully`
	})
}

module.exports = {
	sendWelcomeMail,
	sendUnsubscribeMail
}