const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {

    app.post('/api/stripe', requireLogin, async (req, res) => {

        const charge = await stripe.charges.create({
            amount: 500,
            currency: "usd",
            source: req.body.id, // obtained with Stripe.js
            description: "Charge for adding credits ($5)"
        });
        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });

};