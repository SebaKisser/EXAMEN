/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {Typography, Box, Paper, Button} from "@mui/material";
import UserNavbar from "../components/UserNavbar";

const initialState = {
	titulo: '',
	artista: '',
	lanzamiento: '',
	genero: '',
	pistas: 0
}

const AlbumView = () => {


    const {id} = useParams();
    const [album, setAlbum] = useState(initialState);
    const [error, setError] = useState({});
	const navigate = useNavigate();


    //Obtenemos los detalles del album
    const getAlbumById = async () => {
        try {
            const response = await axios.get(`/api/albums/${id}`);
            setAlbum(response.data);
        } catch (error) {
            setError("Album no encontrado:", error);
        }
    };


	const handleDeleteUser = async () => {
		try {
			const response = await axios.delete(`/api/albums/${id}`);
			navigate('/dashboard');
		}
		catch(error){
			setError('Error al eliminar el album', error);
		}
	}


	//Montamos el componente
    useEffect(() => {
        getAlbumById();
    }, []);


	//Formateamos la fecha de lanzamiento para mostrarla
	const fechaFormateada = new Date(album.lanzamiento).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	
    return (
		
		<div>
			<UserNavbar></UserNavbar>
			<Box sx={{maxWidth: 600, margin: "0 auto", mt: 4}}>

				<Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3, backgroundColor: '#f5f5f5' }}>

					<Typography
						variant="h4"
						gutterBottom
					>
						{album.titulo}
					</Typography>

					<Typography variant="h6">
						Artista: {album.artista}
					</Typography>

					<Typography variant="h6">
						Fecha de lanzamiento: {fechaFormateada}
					</Typography>

					<Typography variant="h6">
						Género: {album.genero}
					</Typography>

					<Typography variant="h6">
						Cantidad de pistas: {album.pistas}
					</Typography>

					<Button 
						variant="contained" 
						color="error"
						sx={{ mt: 4, borderRadius: 10}}
						onClick={handleDeleteUser}>Eliminar</Button>

				</Paper>
			</Box>

		</div>
    );
};

export default AlbumView;
