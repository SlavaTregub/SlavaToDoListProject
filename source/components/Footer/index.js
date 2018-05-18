//Core
import React, { Component } from "react";

//Component
import Checkbox from "theme/assets/Checkbox";

export default class Footer extends Component {
    render () {
        const {
            Styles,
            completeAll,
            allCompleted,
        } = this.props;
        const black = "#363636";
        const white = "#FFF";

        return (
            <footer>
                <Checkbox
                    checked = { allCompleted }
                    color1 = { black }
                    color2 = { white }
                    onClick = { completeAll }
                />
                <span className = { Styles.completeAllTasks }>Все задачи выполнены</span>
            </footer>
        );
    }
}
