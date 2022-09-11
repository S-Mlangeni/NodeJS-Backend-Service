const models = require("../models");

const watch_check = async (req, res) => {
    console.log(req.body.user_email);
    console.log(req.body.user_password);
    const user = await models.User.findAll({
        where: {
            email: req.body.user_email,
            password: req.body.user_password
        }
    });
    if (user.length > 0) {
        if (user[0].dataValues.videosWatched < 3) {
            videoCount = user[0].dataValues.videosWatched + 1;
            const updateSuccessfully = await models.User.update({videosWatched: videoCount}, {
                where: {
                    id: user[0].dataValues.id
                }
            })
            if (updateSuccessfully == 1) {
                const user_updated = await models.User.findAll({
                    where: {
                        id: user[0].dataValues.id
                    }
                });
                res.send({
                    updated: true,
                    message: "Videos watched updated successfully.",
                    videos_watched: user_updated[0].dataValues.videosWatched
                })
            } else {
                res.send({
                    updated: false,
                    message: "Videos watched not updated successfully."
                })
            }
        } else {
            res.send({
                updated: false,
                message: "You cannot exceeded the video watch limit of 3."
            })
        }
    } else {
        res.send({
            updated: false,
            message: "Invalid credentials."
        })
    }

}

module.exports = {
    watch_check
}