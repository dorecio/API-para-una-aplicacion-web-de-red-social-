const { Schema, Types } = require('mongoose');
const { formatoDate } = require('../utils/formatoDate.js');

const reaccionSchema = new Schema(
    {
        _idReaccion: {
            type: Schema.Types.ObjectId,
            default:()=>Types.ObjectId()
        },        
        textoReaccion: {
            type: String,
            maxlength: 280
        },
        userReaccion: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => { return formatoDate(date) }
        },
       
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);


module.exports = reaccionSchema;
