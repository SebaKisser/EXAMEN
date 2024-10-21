/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from 'axios';
import { Box, TextField, Typography, Button} from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import UserNavbar from '../components/UserNavbar';


const EditView = () => {

	const { id } = useParams();

	const [form, setForm] = useState({
		titulo: '',
		artista: '',
		lanzamiento: '',
		genero: '',
		pistas: 0
	});

	const [errors, setErrors] = useState({});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value});
	}

	//Obtenemos los detalles del album
    const getAlbumById = async () => {
        try {
            const response = await axios.get(`/api/albums/${id}`);
            setForm(response.data);
        } catch (error) {
            setErrors("Album no encontrado:", error);
        }
    };

	const handleEdit = async (e) => {
		e.preventDefault();

		try{
			const response = await axios.put(`/api/albums/${id}`, form);
			console.log(response.data);
			navigate('/dashboard');
		}
		catch(error){
			if (error.response && error.response.data) {
				setErrors(error.response.data.errors);
			}
		}
	};

	//Montamos el form con los datos
	useEffect( () => {
		getAlbumById();
	}, []);


	
	return (
		
		<div>
			<UserNavbar></UserNavbar>
			<Box sx={{ width: '300px', margin: 'auto', paddingTop: '50px' }}>

				<Typography variant='h4' component='h1' sx={{marginBottom: '20px'}}>
					Editar Album
				</Typography>

				<form onSubmit={handleEdit} style={styles.formDisplay}>

					<TextField
						label='Titulo'
						name= 'titulo'
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
						value={form.lanzamiento.split('T')[0]}
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
						Actualizar
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

export default EditView;
