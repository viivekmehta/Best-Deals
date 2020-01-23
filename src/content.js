/*global chrome*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./content.css";
import axios from 'axios';
import $ from 'jquery';
import App from './App'

let modall = 0;
let show = false;
let whichWebsite = 0;
class Main extends Component {
    state = {
        isShowing: true,
        productDetails: [],
        anyProductsFound: false,
        showModal: false
    }

    componentDidMount() {
        let product = null;

        let productFlipkart1 = document.getElementsByClassName('_35KyD6')[0];
        if (productFlipkart1 != null) {
            document.getElementById("container").style.opacity = "0.2";
            whichWebsite = 1;
            product = productFlipkart1.innerText;
        }

        let productFlipkart = document.getElementsByClassName('_2J4LW6')[0];
        if (productFlipkart != null) {
            let productFlipkartIn = document.getElementsByClassName('_35KyD6')[0];
            if (productFlipkartIn != null) {
                document.getElementById("container").style.opacity = "0.2";
                whichWebsite = 1;
                product = productFlipkart.innerText + productFlipkartIn.innerText;
            }
        }

        let productMyntra = document.getElementsByClassName('pdp-title')[0];
        if (productMyntra != null) {
            let productMyntraIn = document.getElementsByClassName('pdp-name pdp-bb1')[0];
            if (productMyntraIn != null) {
                document.getElementById("desktop-header-cnt").style.opacity = "0.2";
                document.getElementById("mountRoot").style.opacity = "0.2";
                whichWebsite = 2;
                product = productMyntra.innerText + productMyntraIn.innerText;
            }
        }

        if (product != null) {
            document.getElementById("my-extension-root").style.width = "500px";
            chrome.runtime.sendMessage(
                { product: product }, (response) => {
                    console.log(response.productDetails);
                    this.setState({ productDetails: response.productDetails });
                    this.setState({ anyProductsFound: response.anyProductsFound });
                    this.setState({ showModal: true });
                });
            this.setState({
                isShowing: true
            });
        } else {
            console.log("No product!!");
            this.setState({
                isShowing: false
            });
        }

    }

    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
        if (whichWebsite === 1) {
            document.getElementById("container").style.opacity = "1";
        } else if (whichWebsite === 2) {
            document.getElementById("desktop-header-cnt").style.opacity = "1";
            document.getElementById("mountRoot").style.opacity = "1";
        }
        document.body.removeChild(modall);
    }

    render() {
        const { isShowing } = this.state;
        return isShowing ? (

            <div style={{ marginTop: '-40px' }}>
                <div className="modal-wrapper"
                    style={{
                        transform: this.state.isShowing ? 'translateY(0vh)' : 'translateY(-100vh)',
                        opacity: this.state.isShowing ? '1' : '0'
                    }}>
                    <div className="modal-header">
                        <center><h3>Similar deals in Amazon :) {this.state.totalProducts}</h3></center>
                    </div>
                    {this.state.showModal ? (
                        this.state.anyProductsFound ? (
                            <div className="modal-body">
                                <ol style={{ display: 'table-row-group' }}>
                                    {this.state.productDetails.map(productDetails => <li style={{ borderBottom: 'outset', padding: '2%', listStyleType: 'none' }}><img src={productDetails.image} height="42px" /><a href={productDetails.link} target="_blank" style={{ display: 'block' }}>{productDetails.title} ( Rs. {productDetails.price} )</a></li>)}
                                </ol>
                            </div>
                        ) : (
                                <div className="modal-body">
                                    <h2>Sorry! No similar Products found :(</h2>
                                </div>
                            )
                    ) : (
                            <div>
                                <img src="https://media.giphy.com/media/3ohzdOrcdpiD26TPt6/giphy.gif" style={{ height: '26vh', marginBottom: '-5px', width: '100%' }} />
                            </div>
                        )}
                    <div className="modal-footer">
                        <center>
                            <button className="btn-cancel" style={{ marginLeft: '35%' }} onClick={this.closeModalHandler}>CLOSE</button>
                        </center>
                    </div>
                </div>
            </div>
        ) : "";
    }
}

modall = document.createElement('div');
modall.id = "my-extension-root";
document.body.appendChild(modall);
export default Main;
ReactDOM.render(<Main />, modall);
