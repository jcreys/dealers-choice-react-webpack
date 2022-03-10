const Sequelize = require('sequelize')
sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_react_webpack');
const express = require('express');
const app = express();
const path = require('path');


const Song = sequelize.define('song', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
const playlist = [
    {title: 'Started From the Bottom'},
    {title: 'Nonstop'},
    {title: 'HYFR'},
    {title: 'Earned it'},
    {title: 'Often'},
]
Song.addSong = function() {

    let outputSong = playlist.pop();
    return this.create(outputSong);
}
app.use('/dist', express.static(path.join(__dirname,'dist')));
app.get('/',(req,res)=> res.sendFile(path.join(__dirname, 'index.html')));
app.get('/api/songs', async(req, res, next) => {
    try{
        res.send(await Song.findAll());
    }
    catch(ex) {
        next(ex);
    }
});

app.post('/api/songs/', async(req, res, next) => {
    try{
        res.status(201).send(await Song.addSong());
    }
    catch(ex) {
        next(ex);
    }
});


const start = async()=> {
    await sequelize.sync( {force: true} );
    try{
        await Promise.all([
            Song.create({title: 'Red'}),
            Song.create({title: 'Views'}),
            Song.create({title: 'Out of Time'}),
        ]);

        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`));

    }
    catch(ex) {
        console.log(ex);
    }
}

start();