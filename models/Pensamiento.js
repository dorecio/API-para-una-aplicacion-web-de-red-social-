const { Schema, Types, model } = require('mongoose');
const reaccionSchema = require('./Reaccion')
const {formatoDate} = require('../utils/formatoDate')

const PensamientoSchema = new Schema(
    {
        texto: {
            type: String,
            minlength: 1,
            maxlength:280
        },
        usuario: {
            type: String,
            required:true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => { return formatoDate(date) }
        },
        reacciones:[reaccionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

PensamientoSchema
    .virtual(' reactionCount')
    // Getter
    .get(function () {
        return this.reacciones.length;
    });

const Pensamiento = model('Pensamiento', PensamientoSchema);
module.exports = Pensamiento;
