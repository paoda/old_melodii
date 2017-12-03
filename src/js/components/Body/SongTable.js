'use strict';
import React from 'react';

export default class SongTable extends React.Component {
    constructor(props) {
        super(props);

        this.parseJSON.bind(this);
        this.parseHead.bind(this);
        this.parseBody.bind(this);
    }
    parseJSON(json) {
        let headJSX = this.parseHead(json.thead.tr);
        let bodyJSX = this.parseBody(json.tbody);

        console.log(headJSX);
        console.log(bodyJSX);
    }
    parseHead(arr) {
        let temp = []
        for (let i = 0; i < arr.length; i++) {
            temp.push(<th> {arr[i]} </th>);
        }
        return temp;
    }
    parseBody(arr) {
        let tr = [];
        for (let i = 0; i < arr.length; i++) {
            let tr = [];
            for (let j = 0; j < 6; j++) {
                tr[i].push(arr[j].artist);
                tr[i].push(arr[j].title);
                tr[i].push(arr[j].album);
                tr[i].push(arr[j].year);
                tr[i].push(arr[j].genre);
                tr[i].push(arr[j].time);
            }
        }

        return tr;
    }
    render() {
        this.parseJSON(this.props.json);
        return (
            <table id='songTable'></table>
        )
    }
}