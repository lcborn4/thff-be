/**
 * EmailController
 *
 * @description :: Server-side logic for managing emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    // create: async function (req, res) {

    //     sails.log('email create')

    //     const email = req.body
    //     sails.hooks.email.send(
    //         "resetPassword",
    //         {
    //             Name: email.name,
    //         },
    //         {
    //             to: email.to,
    //             subject: "THFF: Reset Password Email"
    //         },
    //         function (err) {
    //             console.log(err || "Mail Sent!");
    //         }
    //     )
    // },

    sendResetPasswordEmail: async function (req, res) {

        sails.log("sendResetPasswordEmail")

        const email = req.body;

        sails.log(req.body);
        sails.log("email.name = " + email.name);
        sails.log("email.resetCode = " + email.resetCode);

        var resetURL = '';

        sails.log(sails.config.environment);

        if (sails.config.environment === 'production') {
            resetURL = 'http://www.hagen.foundation'
        }
        else {
            resetURL = 'http://localhost:4200'
        }

        sails.log(resetURL)

        await sails.helpers.sendTemplateEmail.with({
            to: email.to,
            subject: "THFF: Reset Password Email",
            template: 'email-reset-password',
            templateData: {
                Name: email.name,
                resetCode: email.resetCode,
                resetURL: resetURL + '/type-new-password/' + email.name + '/' + email.resetCode
            },
            layout: false
        });

        return res.status(200).json(
            { message: 'Mail Sent!' })

    } //sendResetEmail

    ,
    sendResetPasswordConfirmationEmail: async function (req, res) {

        sails.log("sendResetPasswordConfirmationEmail")

        sails.log(req.body);
        const email = req.body;

        await sails.helpers.sendTemplateEmail.with({
            to: email.to,
            subject: "Your THFF Password has Changed",
            template: 'email-reset-password-confirm',
            templateData: {
                Name: email.name,
                //To: email.to
                // fullName: inputs.fullName,
                // token: newUserRecord.emailProofToken
            },
            layout: false
        });

        return res.status(200).json(
            { message: 'Mail Sent!' })

    }
    ,
    sendUserNameEmail: async function (req, res) {

        sails.log("sendUserNameEmail")

        sails.log(req.body);
        const email = req.body;

        await sails.helpers.sendTemplateEmail.with({
            to: email.to,
            subject: "Your THFF Username",
            template: 'email-username',
            templateData: {
                Name: email.name,
                //To: email.to
                // fullName: inputs.fullName,
                // token: newUserRecord.emailProofToken
            },
            layout: false
        });

        return res.status(200).json(
            { message: 'Mail Sent!' })

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

        return res.status(200).json(
            { message: 'Mail Sent!' })

    },
    sendRegisterOrgEmail: async function (req, res) {

        sails.log("sendRegisterOrgEmail")

        sails.log(req.body);
        const email = req.body;

        // Send "confirm account" email
        await sails.helpers.sendTemplateEmail.with({
            to: email.to,
            subject: "Thank You For Registering An Org Account",
            template: 'email-register-org',
            templateData: {
                Name: email.name, //username that registered the org
                OrgName: email.orgName
            },
            layout: false
        });

        return res.status(200).json(
            { message: 'Mail Sent!' })

    },
    sendUserEmailChangeEmail: async function (req, res) {

        sails.log("sendUserEmailChangeEmail")

        sails.log(req.body);
        const email = req.body;

        await sails.helpers.sendTemplateEmail.with({
            to: email.to,
            subject: "Your THFF Email has Changed",
            template: 'email-user-email-change',
            templateData: {
                Name: email.name, //username
                OldEmail: email.oldEmail, //old email
                NewEmail: email.newEmail
            },
            layout: false
        });

        return res.status(200).json(
            { message: 'Mail Sent!' })

    }

};

