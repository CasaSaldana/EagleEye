import React from 'react';
import { render } from "react-dom";
import { Ajax } from 'pan.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <h2>Yeah</h2>
            </div>
        );
    }
}

render(<App/>, document.getElementById("root"));