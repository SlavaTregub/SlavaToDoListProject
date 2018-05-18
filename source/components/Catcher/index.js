//Core
import React, { Component } from 'react';

import Styles from './styles.m.css';

export default class Catcher extends Component {


    state = {
        error: false,
    };

    componentDidCatch () {
        this.setState(() => ({
            error: true,
        }));
    }

    render () {
        const { error } = this.state;
        const { children } = this.props;

        if (error) {
            return (
                <section className = { Styles.catcher }>
                    <span>A mysterious error occurred.</span>
                    <p>
                        Our engineers team is already working in order to fix that for you!
                    </p>
                </section>
            );
        }

        return children;
    }
}
