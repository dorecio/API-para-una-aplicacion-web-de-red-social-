const { User, Pensamiento } = require('../models');

module.exports = {
    async getPensamientos(req, res) {
        try {
            let data = await Pensamiento.find({});
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async getSinglePensamiento(req, res) {
        try {
            let data = await Pensamiento.findOne({ _id: req.params.pensamientoId });

            if (!data) {
               return res.status(404).json({ message: 'Pensamiento no encontrado!!' });
            }
                res.status(200).json(data);
            
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    async addPensamiento(req, res) {
        try {
            const data = await Pensamiento.create(req.body);
            
            const usuario = await User.findOneAndUpdate(
                { _id: req.body.usuarioId },
                { $push: { pensamientos: data._id } },
                { new: true });
              if (!usuario) {
                res.status(404).json({ message: 'Usuario no encontrado!!' });
                } else {
                res.status(200).json(usuario);
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async updatePensamiento(req, res) {
        
        try {
            const data = await Pensamiento.findByIdAndUpdate(
                { _id: req.params.pensamientoId },
                { $set:{ texto: req.body.texto }},
                { new: true });
            console.log('SI PASAS POR AQUI');
            if (!data) {
                res.status(404).json({ message: 'Pensamiento no encontrado!!' });
                return
            }
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async deletePensamientos(req, res) {
        try {
            let data = await Pensamiento.findByIdAndDelete(
                { _id: req.params.pensamientoId });
            if (!data) {
                res.status(404).json({ message: 'El pensamiento no existe!!' });
                return
            }
            const usuario = await User.findOneAndUpdate(
                { _id: req.body.usuario },
                { $pull: { pensamientos: req.params.pensamientoId } },
                { new: true });
            if (!usuario) {
                res.status(404).json({ message: 'El usuario de este pensamiento no existe!!' });
                return
            }
            return res.status(200).json({ message: 'Pensamiento eliminado exitosamente!' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaccion(req, res) {
        try {
           
            let data = await Pensamiento.findByIdAndUpdate(
                { _id: req.params.pensamientoId },
                { $push: { reacciones: req.body} },
                { new: true });
            if (!data) {
                res.status(404).json({ message: 'Pensamiento no encontrado!!' });
                return
            }
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaccion(req, res) {
        try {
         
            const data = await Pensamiento.findByIdAndUpdate(
                { _id: req.params.pensamientoId },
                { $pull: { reacciones:  req.params.idReaccion  } },
                { runValidators: true, new: true });
            console.log(data);
            if (!data) {
                res.status(404).json({ message: 'Pensamiento no encontrado!!' });
                return
            }
            res.status(200).json(data);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
};

