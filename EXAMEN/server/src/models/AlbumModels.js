
import { model, Schema } from 'mongoose';

const AlbumSchema = new Schema({

	titulo: {
		type: String,
		required: [true, 'Por favor, proporciona el titulo del album'],
		minlength: [5, 'El titulo debe tener al menos 5 caracteres'],
		unique: [true, 'Titulo ya existente']
	},

	artista: {
		type: String,
		required: [true, 'Proporciona el nombre del artista'],
		minlength: [5, 'El nombre debe tener al menos 5 caracteres']
	},

	lanzamiento: {
		type: Date,
		required: [true, 'Proporciona la fecha de lanzamiento'],
		validate: {
			validator: function(v) {
				const year = v.getFullYear();
				const currentYear = new Date().getFullYear();
				return year >= 1900 && year <= currentYear;
			},
			message: 'El año de lanzamiento no es una fecha valida'
		}
	},

	genero: {
		type: String,
		required: [true, 'Proporciona el genero'],
		minlength: [3, 'El genero debe tener al menos 3 caracteres']
	},

	pistas: {
		type: Number,
		required: [true, 'Proporciona la cantidad de pistas que posee el album'],
		min: [1, 'El album debe tener al menos una pista'],
		max: [10, 'El album no debe de tener más de 10 pistas']
	}

}, {timestamps: true});

const Album = model('Album', AlbumSchema);

export default Album;

