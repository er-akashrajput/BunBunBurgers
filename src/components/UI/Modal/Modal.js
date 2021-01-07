import React, { Component } from 'react';

import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }
    componentWillupdate() {
        console.log('[Modal] Will Update');
    }
    render() {
        return (
            <Auxiliary>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'tran slateY(-100vh)',
                        display: this.props.show ? 'block' : 'none'
                    }}>
                    {this.props.children}
                </div>
            </Auxiliary>
        );
    }
}

export default Modal;