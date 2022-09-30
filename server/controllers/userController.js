const userService = require("../service/userService");
const { validationResult } = require('express-validator');
const ApiError = require("../exceptions/apiError");

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(`Validation error`, errors.array()));
            }
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None' });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None' });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(`ok`);
        } catch (error) {
            next(error);
        }
    }

    async activate(req, res, next) {
        try {
            const actiovationLink = req.params.link;
            await userService.activate(actiovationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (error) {
            next(error);
        }
    }

    async sendmail(req, res, next) {
        try {
            const user = req.user;
            const data = await userService.sendmail(user);
            return res.json('ok');
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None' });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async editEmail(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest(`Validation error`, errors.array()));
            }
            const { email } = req.body;
            const data = await userService.editEmail(req.user, email);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getUserInformation(req, res, next) {
        try {
            const user = req.user;
            const data = await userService.getUserInformation(user);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();