/**
 * EmailController
 *
 * @description :: Server-side logic for managing emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    create: function (req, res) {

        sails.log('email create')

        const email = req.body
        sails.hooks.email.send(
            "resetPassword",
            {
                Name: email.name,
            },
            {
                to: email.to,
                subject: "THFF: Reset Password Email"
            },
            function (err) {
                console.log(err || "Mail Sent!");
            }
        )
    },

    sendResetEmail: function (req, res) {

        sails.log("sendResetEmail")

        const email = req.body;

        sails.log(req.body);
        sails.log("email.name = " + email.name);
        sails.log("email.resetCode = " + email.resetCode);
        //sails.log("email.resetTime = " + email.resetTime);

        var resetURL = '';

        sails.log(sails.config.environment);

        if (sails.config.environment === 'production') {
            resetURL = 'http://www.hagen.foundation'
        }
        else {
            resetURL = 'http://localhost:4200'
        }

        sails.log(resetURL)

        sails.hooks.email.send(
            "resetPassword",
            {
                Name: email.name,
                resetCode: email.resetCode,
                resetURL: resetURL + '/type-new-password/' + email.name + '/' + email.resetCode

            },
            {
                to: email.to,
                subject: "THFF: Reset Password Email"
            },
            function (err) {
                console.log(err || "Mail Sent!");
            }
        )

        //res.send(200);
    } //sendResetEmail

    ,
    sendResetEmailConfirmation: function (req, res) {

        sails.log("sendResetEmailConfirmation")

        sails.log(req.body);
        const email = req.body;

        sails.hooks.email.send(
            "resetPasswordConfirm",
            {
                Name: email.name,
            },
            {
                to: email.to,
                subject: "Your THFF Password has Changed"
            },
            function (err) {
                console.log(err || "Mail Sent!");
            }
        )

    }
    ,
    sendUserNameEmail: function (req, res) {

        sails.log("sendUserNameEmail")

        sails.log(req.body);
        const email = req.body;

        sails.hooks.email.send(
            "username",
            {
                Name: email.name,
                To: email.to
            },
            {
                to: email.to,
                subject: "Your THFF Username"
            },
            function (err) {
                console.log(err || "Mail Sent!");
            }
        )

    },

    sendRegisterUserEmail: async function (req, res) {

        sails.log("sendRegisterUserEmail")

        sails.log(req.body);
        const email = req.body;

        // Send "confirm account" email
        await sails.helpers.sendTemplateEmail.with({
            to: email.to,
            subject: 'Thank You For Registering A User Account', //Please confirm your account
            template: 'email-register-user',
            templateData: {
                Name: email.name,
                //To: email.to
                // fullName: inputs.fullName,
                // token: newUserRecord.emailProofToken
            },
            layout: false
        });


        // sails.hooks.email.send(
        //     "registerUserEmail",
        //     {
        //         Name: email.name,
        //         To: email.to
        //     },
        //     {
        //         to: email.to,
        //         subject: "Thank You For Registering A User Account"
        //     },
        //     function (err) {
        //         console.log(err || "Mail Sent!");
        //     }
        // )

        return res.status(200).json(
            { message: 'Mail Sent!' })

    },
    sendRegisterOrgEmail: function (req, res) {

        sails.log("sendRegisterOrgEmail")

        sails.log(req.body);
        const email = req.body;

        sails.hooks.email.send(
            "registerOrgEmail",
            {
                Name: email.name, //username that registered the org
                OrgName: email.orgName,
                To: email.to
            },
            {
                to: email.to,
                subject: "Thank You For Registering A Org Account"
            },
            function (err) {
                console.log(err || "Mail Sent!");
            }
        )

    }

};

