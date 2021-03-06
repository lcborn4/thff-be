/**
 * LOIInfoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async function (req, res, next) {

        sails.log("loi info create");

        sails.log('req.body', req.body)

        var loiInfo = req.body;

        //create loiInfoID
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        var loiInfoID = text;
        //add loiInfoID to loiInfo object

        loiInfo.loiInfoID = loiInfoID;

        let validInfo = true;

        //validate the loiInfo
        if (req.body.projectTitle == '') {
            //bad
            sails.log('bad projectTitle');

            validInfo = false;
        }

        if (req.body.purpose == '') {
            //bad
            sails.log('bad purpose');

            validInfo = false;
        }

        //leave these for the date check
        // //start date
        // if (req.body.projectTitle == '') {
        //     //bad
        //     sails.log('bad');
        // }

        // //end date
        // if (req.body.projectTitle == '') {
        //     //bad
        //     sails.log('bad');
        // }

        if (req.body.amountRequested == '') {
            //bad
            sails.log('bad amountRequested');

            validInfo = false;

        }

        if (req.body.totalProjectCost == '') {
            //bad
            sails.log('bad totalProjectCost');

            validInfo = false;

        }


        if (validInfo) {

            loiInfo.validLOIInfo = true;

        }
        else {

            loiInfo.validLOIInfo = false;

        }

        LOIInfo.create(loiInfo).then(function (newloiInfo, err) {
            sails.log("LOIInfo.create")

            if (err) {
                return res.status(err.status).json({ err: err });
            }

            return res.json({ 'status': true, 'result': newloiInfo });

        })

    },

};

