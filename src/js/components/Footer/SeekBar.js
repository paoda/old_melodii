'use strict';
import React from 'react';
import MusicPlayer from '../../melodii/MusicPlayer';

const mp = new MusicPlayer();

const refreshRate = 30; //30fps

//https://github.com/souporserious/react-media-player
//Also the ReactJS State Tutorial
export default class SeekBar extends React.Component {
    constructor(props) {
        super(props);
        
        var rekai;
        var self = this;
        this.state = {
            currentTime: mp.currentTime(),
            duration: mp.duration()
        };
        this.isPlayingOnMouseDown = false;
        this.onChangeUsed = false;
    }
    test(input) {
        this.setState({currentTime: input});
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.check(),1000/refreshRate); //Maybe Fix This
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    check() {
        this.setState({
            currentTime: mp.currentTime(),
            duration: mp.duration()
        });
    }
    handleChange(e) {
        console.log(e.target.value);
        mp.seek(+e.target.value);
        this.onChangeUsed = true;
    }
    handleMouseDown(e) {
        this.isPlayingOnMouseDown = !(mp.ispaused);
        mp.pause();
    }
    handleMouseUp(e) {
        if (!this.onChangeUsed) {
            console.log(e.target.value);
            mp.seek(+e.target.value);
        }

        if (this.isPlayingOnMouseDown) {
            mp.play();
        }
    }
    render() {
        return ( 
            <div className="seekBar">
            <input type='range' style={{backgroundSize: this.state.currentTime * 100 / this.state.duration + '% 100%'}} value={this.state.currentTime} max={this.state.duration} id='seekRange' className='melodiiSlider' onChange={this.handleChange.bind(this)} onMouseDown = {this.handleMouseDown.bind(this)} onMouseUp = {this.handleMouseUp.bind(this)}/>
            </div>
        )
    }
}