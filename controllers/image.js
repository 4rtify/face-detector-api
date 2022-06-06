import Clarifai from 'clarifai';

const CLARIFAIAPI = process.env.CLARIFAIAPI;

const app = new Clarifai.App({
    apiKey: CLARIFAIAPI
});

export const handleApiCall = () => (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json("Unable to reach Clarifai"))
}

export const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', "=", id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0].entries))
    .catch(err => res.status(400).json("unable to get entries"))
}