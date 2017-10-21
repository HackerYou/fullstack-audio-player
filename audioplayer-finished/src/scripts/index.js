import React from 'react';
import ReactDOM from 'react-dom';

import tracks from './data/tracks.js';

class AudioPlayer extends React.Component {
    constructor() {
        super();
        this.state = {
            currentTrack: tracks[0],
            status: 'stopped',
            file: null,
        };
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.resume = this.resume.bind(this);
    }
    pause() {
        this.state.file.pause();
        this.setState({
            status: 'paused',
        });
    }
    resume() {
        this.state.file.play();
        this.setState({
            status: 'playing'
        });
    }
    play(track) {
        if (this.state.status === 'playing' && this.state.currentTrack === track) {
           this.pause();
        } else if (this.state.status === 'paused' && this.state.currentTrack === track) {
            this.resume();
        } else {
            this.state.file && this.state.file.pause();            
            const newState = Object.assign({}, this.state);
            const audio = new Audio(`public/assets/${track.file}`);
            this.setState({
                currentTrack: track,
                status: 'playing',
                file: audio
            }, () => {
                this.state.file.play();
            });
        }
    }
    render() {
        return (
            <div>
                <div className="tracks">
                    {tracks.map((track, i) => <Track 
                        key={`track-${i}`}
                        active={track === this.state.currentTrack}
                        track={track}
                        play={this.play}
                        pause={this.pause}
                        status={this.state.status}  
                    />)}
                </div>
            </div>
        );
    }
}



const Track = (props) => {
    const renderButton = () => {
        if (props.active === false) {
            return (<button onClick={() => props.play(props.track)}>
                <i className="fa fa-play" aria-hidden="true"/>
            </button>);
        }
        if (props.status === "playing") {
            return (<button onClick={props.pause}>
                <i className="fa fa-pause" aria-hidden="true"/>
            </button>)
        } else if (props.status === "paused" || props.status === "stopped") {
            return (<button onClick={() => props.play(props.track)}>
                <i className="fa fa-play" aria-hidden="true"/>
            </button>)
        } 
    }
    return (
        <div className="track">
            <div className="poster" style={{backgroundImage: `url(public/assets/${props.track.artwork})`}} />            
            <div className="track-details">
                <p>
                    <strong className="title">{props.track.title}</strong> <em className="artist">{props.track.artist}</em>
                </p>
                <div>
                {renderButton()}
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(<AudioPlayer />, document.getElementById('app'));