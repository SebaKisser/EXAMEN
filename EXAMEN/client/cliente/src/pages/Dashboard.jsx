
import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from '../components/UserNavbar';

const Dashboard = () => {

	const [albums, setAlbums] = useState([]);
	const navigate = useNavigate();

	const getAlbums = async () => {
		const response = await axios.get('./api/albums');
		const data = response.data;
		setAlbums(data);
	}

	const getUserInSession = async () => {
		try {
			const response = await axios.get('/api/session/me', { withCredentials: true });
			console.log(response.data); // Obtenemos los datos del usuario en sesion
		} catch (error) {
			console.error('Error obteniendo el usuario en sesión:', error);
		}
	};


	useEffect( () => {
		getAlbums();
		getUserInSession(); //Obtenemos la cuenta que esta logueada en este momento
	}, []);

	return (
		<div>
			<UserNavbar></UserNavbar>
			<Typography variant='h4' component='h2' sx={{ mt: 4, mb: 2, textAlign: 'center'}}>
				Bienvenido de vuelta!
			</Typography>

			<TableContainer component={Paper} sx={{ maxWidth: 800, margin: '0 auto'}}>
				
				<Table>

					<TableHead>
						<TableRow>
							<TableCell>Titulo</TableCell>
							<TableCell>Detalle</TableCell>
							<TableCell>Modificar</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>

						{albums.map( (album, index) => (

							<TableRow key={index}>

								<TableCell>{album.titulo}</TableCell>

								<TableCell>
									<Button variant="outlined" color="primary" onClick={() => navigate(`/album/${album._id}`)}>
										Ver album
									</Button>
								</TableCell>

								<TableCell>
									<Button variant='outlined' color="primary" onClick={() => navigate(`/album/editar/${album._id}`)}>
										Editar
									</Button>
								</TableCell>

							</TableRow>
						))}

					</TableBody>

				</Table>

			</TableContainer> 

		</div>
	);
}

export default Dashboard;
