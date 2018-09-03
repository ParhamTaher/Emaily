const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys.js');

// Sendgrid
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        // constructor in Mail class gets executed as well
        super();

        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatEmailAddresses(recipients);

        // base class
        this.addContent(this.body);

        // Implemented here
        this.addClickTracking();
        this.addRecipients();
    }

    formatEmailAddresses(recipients) {
        return recipients.map((email) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });

        this.addPersonalization(personalize);
    }

}

module.exports = Mailer;