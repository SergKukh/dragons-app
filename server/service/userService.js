const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const UserDto = require('../dto/user-dto');
const ApiError = require('../exceptions/apiError');

class UserService {
    async _saveToken(user) {
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto }
    }

    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`User is already exists`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const actiovationLink = uuid.v4();
        const user = await UserModel.create({
            email,
            password: hashPassword,
            actiovationLink
        });
        mailService.sendActiovationMail(email, actiovationLink);

        const data = await this._saveToken(user);
        return data;
    }

    async activate(actiovationLink) {
        const user = await UserModel.findOne({ actiovationLink });
        if (!user) {
            throw ApiError.BadRequest(`Incorrect activation link`);
        }
        user.isActivated = true;
        await user.save();
    };

    async sendmail(userData) {
        const user = await UserModel.findById(userData.id);
        const actiovationLink = uuid.v4();
        user.actiovationLink = actiovationLink;
        await user.save();
        mailService.sendActiovationMail(user.email, actiovationLink);
        return userData;
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest(`User not found`);
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest(`Wrong password`);
        }
        const data = await this._saveToken(user);
        return data;
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenData = await tokenService.findToken(refreshToken);
        if (!userData || !tokenData) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const data = await this._saveToken(user);
        return data;
    }

    async editEmail(userData, email) {
        const user = await UserModel.findById(userData.id);
        user.email = email;
        user.isActivated = false;
        const actiovationLink = uuid.v4();
        user.actiovationLink = actiovationLink;
        await user.save();
        mailService.sendActiovationMail(user.email, actiovationLink);
        return {
            id: user.id,
            email: user.email,
            isActivated: user.isActivated,
            favouritesDragons: user.favouritesDragons
        };
    }

    async getUserInformation(userData) {
        const user = await UserModel.findById(userData.id);
        return { ...userData, favouritesDragons: user.favouritesDragons }
    }
}

module.exports = new UserService();