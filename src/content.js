import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./content.css";

let app = 0;
class Main extends Component {

    constructor() {
        super();

        this.state = {
            isShowing: true
        }
    }

    componentDidMount() {
        console.log("hey 1");
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
        document.body.removeChild(app);
    }

    render() {
        return (
            <div>
                <div className="modal-wrapper"
                    style={{
                        transform: this.state.isShowing ? 'translateY(0vh)' : 'translateY(-100vh)',
                        opacity: this.state.isShowing ? '1' : '0'
                    }}>
                    <div className="modal-header">
                        <h3>Modal Header</h3>
                        <span className="close-modal-btn" onClick={this.closeModalHandler}>×</span>
                    </div>
                    <div className="modal-body">
                        <p>
                            Maybe aircrafts fly very high because they don't want to be seen in plane sight!!
                            Maybe aircrafts fly very high because they don't want to be seen in plane sight?
                    </p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-cancel" onClick={this.closeModalHandler}>CLOSE</button>
                        <button className="btn-continue">CONTINUE</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
app = document.createElement('div');
app.id = "my-extension-root";
document.body.style.opacity = "0.6";
document.body.appendChild(app);
ReactDOM.render(<Main />, app);