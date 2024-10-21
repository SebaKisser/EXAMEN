
import express from 'express';
import AlbumControllers from '../controllers/AlbumControllers.js';
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

router.post('/', AlbumControllers.createAlbum);

router.get('/', authenticate, AlbumControllers.getAlbums);

router.get('/:id', authenticate, AlbumControllers.getOneAlbum);

router.put('/:id', authenticate, AlbumControllers.updateAlbum);

router.delete('/:id', authenticate, AlbumControllers.deleteAlbum);

export default router;