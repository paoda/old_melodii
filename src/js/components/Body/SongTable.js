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
        this.headJSX = this.parseHead(json.thead.tr);
        this.bodyJSX = this.parseBody(json.tbody);

        console.log(this.headJSX);
        console.log(this.bodyJSX);
    }
    parseHead(arr) {
        return arr.map((string) => <th key={string}> {string} </th>);
    }
    parseBody(arr) {
        let temp = arr.map( (obj) => <tr> <td>{obj.artist}</td> <td>{obj.title}</td> <td>{obj.album}</td> <td>{obj.year}</td> <td>{obj.genre[0]}</td> <td>{obj.time}</td> </tr>);
        return temp;
    }
    render() {
        this.parseJSON(this.props.json);
        return (
            <table id='songTable'>
                <thead>
                    <tr>
                        {this.headJSX}
                    </tr>
                </thead>
                <tbody>
                    {this.bodyJSX}
                </tbody>
            </table>
        )
    }
}