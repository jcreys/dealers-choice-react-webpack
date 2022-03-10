import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
class App extends React.Component{
    constructor(){
        super();
        this.state = {
            songs: []
        };
        this.addSong = this.addSong.bind(this);
    }
    async componentDidMount(){
        const response = await axios.get('/api/songs');
        const songs = response.data;
        console.log(songs);
        this.setState( {songs});
    }
    async addSong(){
        const response = await axios.post('/api/songs');
        const song = response.data;
        const songs = [...this.state.songs, song];
        this.setState( {songs} );
    }
    render(){
        const songs = this.state.songs;
        return(
            <div>
                <h1>Songs({songs.length})</h1>
                <button onClick={this.addSong}>Add Song</button>    
                <ul>
                    {
                        songs.map( song => {
                            return (
                                <li>{ song.title }</li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }   
}
const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
