
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddAlbum from "./pages/AddAlbum";
import AlbumView from "./pages/AlbumView";
import EditView from "./pages/EditView";

const App = () => {

	return (
		<BrowserRouter>

			<Routes>
				<Route path='/' element={<Register></Register>}></Route>
				<Route path='/login' element={<Login></Login>}></Route>
				<Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
				<Route path="/agregar" element={<AddAlbum></AddAlbum>}></Route>
				<Route path='/album/:id' element={<AlbumView></AlbumView>}></Route>
				<Route path='/album/editar/:id' element={<EditView></EditView>}></Route>
			</Routes>

		</BrowserRouter>
	);
}

export default App;
