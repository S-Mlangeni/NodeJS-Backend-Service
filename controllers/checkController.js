const models = require("../models");
const bcrypt = require("bcrypt");

const watch_check = async (req, res) => {
    const user = await models.User.findAll({
        where: {
            email: req.body.user_email
        }
    });
    if (user.length > 0) {
        const isMatch = await bcrypt.compare(req.body.user_password, user[0].dataValues.password);
        if (isMatch) {
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
        };
    } else {
        res.send({
            updated: false,
            message: "Invalid credentials."
        })
    }

}

const close_check = async (req, res) => {
    const user = await models.User.findAll({
        where: {
            email: req.body.user_email
        }
    });
    if (user.length > 0) {
        const isMatch = await bcrypt.compare(req.body.user_password, user[0].dataValues.password);
        if (isMatch) {
            if (user[0].dataValues.videosWatched > 0) {
                videoCount = user[0].dataValues.videosWatched - 1;
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
                        message: "Video closed successfully.",
                        videos_watched: user_updated[0].dataValues.videosWatched
                    })
                } else {
                    res.send({
                        message: "Video not closed successfully."
                    })
                }
            } else {
                res.send({
                    message: "No videos being watched."
                })
            }
        } else {
            res.send({
                message: "Invalid credentials."
            })
        }
    } else {
        res.send({
            message: "Invalid credentials."
        })
    }

}

module.exports = {
    watch_check,
    close_check
}