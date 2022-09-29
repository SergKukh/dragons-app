const ApiError = require("../exceptions/apiError");
const dragonsService = require("../service/dragonsService");

class DragonsControllers {
    async getFavourites(req, res, next) {
        try {
            const data = await dragonsService.getFavourites(req.user.id);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async addFavourite(req, res, next) {
        try {
            const { id } = req.body;
            if (!id) {
                return next(ApiError.BadRequest('id is required'))
            }
            const data = await dragonsService.addFavourite(req.user.id, id);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async deleteFavourite(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest('id is required'))
            }
            const data = await dragonsService.deleteFavourite(req.user.id, id);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new DragonsControllers();