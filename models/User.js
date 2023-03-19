const { Schema, model } = require('mongoose');
const { formatoDate } = require('../utils/formatoDate.js');

const userSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true,
            uppercase: true
        },
        email: {
            type: String,
            unique: true,
            required:true
        },
        pensamientos: [
            {
                type: Schema.Types.ObjectId,
                ref :'Pensamiento'
            }
        ],    
        amigos: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.amigos.length;
    });

const User = model('user', userSchema);

module.exports = User;