import React from 'react';
import { render } from "react-dom";
import { Ajax } from 'pan.js';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            addressLines: []
        };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    componentWillUnmount() {

    }

    componentDidMount() {
        const ajax = new Ajax();
        const lat = this.props.lat;
        const lng = this.props.lng;
        // 
        ajax.getJson('https://api.apple-mapkit.com/v1/reverseGeocode?loc=' + lat + '%2C' + lng + '&lang=en').then(
            (value) => {
                var infos = value.results[0];
                let arr = [];
                for (let line of infos.formattedAddressLines) {
                    arr.push(line);
                }
                this.setState({
                    addressLines: arr
                });
            }, (reason) => {

            }
        )
    }

    toggleMenu() {

        this.setState({
            opened: !this.state.opened
        });

        const el = document.getElementById('info');

        setTimeout(() => {
            if (this.state.opened) {
                el.style.display = 'flex';
            } else {
                el.style.display = 'none';
            }

            setTimeout(() => {
                el.classList.toggle('opened');
            }, 16);
        }, 0);
    }

    render() {
        const isOpened = this.state.opened;

        const addressInfo = [];
        let lines = this.state.addressLines;
        for (let i = 0; i < lines.length; i++) {
            addressInfo.push(
                <span key={i}>{lines[i]}</span>
            )
        }
        return (
            <div id="ui">
                <div className="menu" onClick={this.toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div id="info">
                    <div id="data">
                        {addressInfo}
                    </div>
                </div>
            </div>
        )
    }
}
