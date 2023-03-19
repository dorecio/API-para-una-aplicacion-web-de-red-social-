const { User, Pensamiento } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            let data = await User.find({});
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            let data = await User.findById({ _id: req.params.userId });
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            let data = await User.create(req.body);
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            let data = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                req.body, 
                { new: true });
            if (!data) {
                res.status(404).json({ message: 'Usuario no encontrado!!' });
                return
            }
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            let data = await User.findByIdAndRemove(req.params.userId);
            if (!data) {
                res.status(404).json({ message: 'El usuario no existe!!' });
                return
            } else {
                deletePensamientos = await Pensamiento.deleteMany(
                    { _id: { $in:data.pensamientos } });
                res.status(200).json({ message: 'Usuario eliminado exitosamente!' });
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    
    async addAmigo(req, res) {
        try {
            let data = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $push: { amigos: req.params.amigoId } },
                { runValidators: true, new: true });
            
            if (!data) {
                res.status(404).json({ message: 'Usuario no encontrado!!' });
                return
            }
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteAmigo(req, res) {
        try {
            let data = await User.findByIdAndUpdate(
                { _id: req.params.userId },
                { $pull: { amigos: { $in: [req.params.amigoId] } } },
                { runValidators: true, new: true });
            if (!data) {
                res.status(404).json({ message: 'El usuario no existe!!' });
                return
            }
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }

};