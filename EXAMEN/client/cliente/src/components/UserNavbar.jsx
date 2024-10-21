
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserNavbar = () => {

	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const response = await axios.delete('/api/session/', { withCredentials: true});
			const data = response.data;
			console.log(data);
			navigate('/login');
		}
		catch(error){
			console.log('Error al intentar hacer logout:', error);
		}
	}


	return (
		<AppBar position='static'>

			<Toolbar>

				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Albums
				</Typography>

				<Box sx={{ display: 'flex', gap: 2}}>

					<Button color='inherit' component={Link} to='/dashboard'>
						Mostrar Albums
					</Button>

					<Button color='inherit' component={Link} to='/agregar'>
						Agregar Album
					</Button>

					<Button color='inherit' onClick={handleLogout}>
						Logout
					</Button>

				</Box>

			</Toolbar>

		</AppBar>
	);
};

export default UserNavbar;