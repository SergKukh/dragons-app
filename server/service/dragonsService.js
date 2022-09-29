const UserModel = require('../models/user');

class DragonService {
    async getFavourites(userId) {
        const user = await UserModel.findById(userId);
        return user.favouritesDragons;
    }

    async addFavourite(userId, dragonId) {
        const user = await UserModel.findById(userId);
        if (!user.favouritesDragons.includes(dragonId)) {
            user.favouritesDragons.push(dragonId);
            user.save();
        }
        return dragonId;
    }

    async deleteFavourite(userId, dragonId) {
        const user = await UserModel.findById(userId);
        if (user.favouritesDragons.includes(dragonId)) {
            user.favouritesDragons = user.favouritesDragons.filter(id => id !== dragonId);
            user.save();
        }
        return dragonId;
    }
}

module.exports = new DragonService();