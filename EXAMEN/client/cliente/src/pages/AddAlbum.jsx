import { useState } from "react";
import axios from 'axios';
import { Box, TextField, Typography, Button} from '@mui/material';
import { useNavigate } from "react-router-dom";
import UserNavbar from '../components/UserNavbar';

const initialState = {
	titulo: '',
	artista: '',
	lanzamiento: '',
	genero: '',
	pistas: 0
};

const AddAlbum = () => {

	const [form, setForm] = useState(initialState);

	const [errors, setErrors] = useState({});

	const navigate = useNavigate();


	const handleAdd = async (e) => {

		e.preventDefault();

		try {
			const response = await axios.post('./api/albums', form);
			const data = response.data;
			console.log(data);
			setErrors({});
			setForm(initialState);
			navigate('/dashboard');
		}
		catch(error){
			if (error.response && error.response.data) {
				setErrors(error.response.data.errors);
			}
		}
	};

	const handleChange =  (e) => {
		setForm({ ...form, [e.target.name]: e.target.value});
	}


	return (

		<div>
			<UserNavbar></UserNavbar>
			<Box sx={{ width: '300px', margin: 'auto', paddingTop: '50px' }}>

				<Typography variant='h4' component='h1' sx={{marginBottom: '20px'}}>
					Agregar Album
				</Typography>

				<form onSubmit={handleAdd} style={styles.formDisplay}>

					<TextField
						label='Titulo'
						name='titulo'
						value={form.titulo}
						onChange={handleChange}
						error={errors.titulo}
						helperText={errors.titulo ? errors.titulo.message : ''}
					></TextField>

					<TextField
						label='Artista'
						name='artista'
						value={form.artista}
						onChange={handleChange}
						error={errors.artista}
						helperText={errors.artista ? errors.artista.message : ''}
					></TextField>

					<TextField
					type="date"
						label='Fecha de Lanzamiento'
						name='lanzamiento'
						value={form.lanzamiento}
						onChange={handleChange}
						error={errors.lanzamiento}
						helperText={errors.lanzamiento ? errors.lanzamiento.message : ''}
						InputLabelProps={{shrink: true,}}
					></TextField>

					<TextField
						label='Genero'
						name='genero'
						type='genero'
						value={form.genero}
						onChange={handleChange}
						error={errors.genero}
						helperText={errors.genero ? errors.genero.message : ''}
					></TextField>

					<TextField
						type='number'
						label='Numero de Pistas'
						name='pistas'
						value={form.pistas}
						onChange={handleChange}
						error={errors.pistas}
						helperText={errors.pistas ? errors.pistas.message : ''}
					></TextField>

					<Button type='submit' variant='contained' color='primary'>
						Agregar
					</Button>

				</form>
			</Box>
		</div>
	);
};

const styles = {
	formDisplay: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		gap: '20px'
	}
}

export default AddAlbum;
