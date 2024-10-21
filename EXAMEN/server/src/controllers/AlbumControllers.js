import Album from "../models/AlbumModels.js";

const createAlbum = async (req, res) => {

	try {
        const data = req.body;
        const newElement = await Album.create(data);
        res.status(201).json(newElement);
        return;
		
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
        return;
    }

}

const getAlbums = async (req, res) => {

	try {
        const elements = await Album.find();
        res.status(200).json(elements);
        return;

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
        return;
    }

}

const getOneAlbum = async (req, res) => {

	try {
        const {id} = req.params;
        const element = await Album.findById(id);

        if (!element) {
            res.status(404).json("NOT FOUND");
            return;
        }

        res.status(200).json(element);
        return;

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
        return;
    }

}

const updateAlbum = async (req, res) => {
    try {
        const data = req.body;
        const {id} = req.params;
        const element = await Album.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        if (!element) {
            res.status(404).json("NOT FOUND");
            return;
        }

        res.status(200).json(element);
        return;

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
        return;
    }
};

const deleteAlbum = async (req, res) => {
    try {
        const {id} = req.params;
        const element = await Album.findByIdAndDelete(id);

        if (!element) {
            res.status(404).json("NOT FOUND");
            return;
        }

        res.status(200).json(element);
        return;

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
        return;
    }
};

export default { createAlbum, getAlbums, getOneAlbum, updateAlbum, deleteAlbum };