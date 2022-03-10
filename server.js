const Sequelize = require('sequelize')
sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_react_webpack');
const express = require('express');
const app = express();

const Song = sequelize.define('song', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
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