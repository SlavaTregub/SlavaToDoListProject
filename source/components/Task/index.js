//Core
import React, { Component } from "react";

//Styles
import Styles from "./styles.m.css";

//Components
import Checkbox from "theme/assets/Checkbox";
import Edit from "theme/assets/Edit";
import Remove from "theme/assets/Remove";
import Star from "theme/assets/Star";

export default class Task extends Component {
    static getDerivedStateFromProps ({ message }, { newMessage }) {

        return message !== newMessage ? { newMessage: message } : null;
    }

    constructor () {
        super();
        this.deleteToDo = ::this._deleteToDo;
        this.updateToDo = ::this._updateToDo;
        this.handleChecked = ::this._handleChecked;
        this.handleFavorite = ::this._handleFavorite;
        this.handleEditMode = ::this._handleEditMode;
        this.handleNewMessage = ::this._handleNewMessage;
        this.handleKeyDown = ::this._handleKeyDown;
    }

    state = {
        newMessage: '',
        editing:    false,
    };

    _changeToDo = ({
        id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _deleteToDo () {
        const {
            id,
            deleteToDo,
        } = this.props;

        deleteToDo(id);
    }

    _updateToDo (toDo) {
        const {
            id,
            message,
            favorite,
            completed,
        } = toDo;

        const { updateToDo } = this.props;

        updateToDo({
            id,
            message,
            favorite,
            completed,
        });
    }

    _handleChecked () {
        const {
            id,
            completed,
        } = this.props;

        this.updateToDo(this._changeToDo({
            id,
            completed: !completed,
        }));
    }

    _handleFavorite () {
        const {
            id,
            favorite,
        } = this.props;

        this.updateToDo(this._changeToDo({
            id,
            favorite: !favorite,
        }));
    }

    _handleEditMode () {
        this.setState(({ editing }) => ({
            editing: !editing,
        }));
    }

    _handleNewMessage (e) {
        this.setState({
            newMessage: e.target.value,
        });
    }

    _handleKeyDown (e) {
        const { id } = this.props;
        const { newMessage } = this.state;

        if (e.key === 'Enter') {
            this.setState({
                editing: false,
            });
            this.updateToDo(this._changeToDo({
                id,
                message: e.target.value,
            }));
        }

        if (e.key === 'Escape') {
            this.setState({
                message: newMessage,
                editing: false,
            });
        }

    }

    render () {
        const {
            message,
            completed,
            favorite,
        } = this.props;

        const {
            editing,
            newMessage,
        } = this.state;

        const blue = "#3B8EF3";
        const white = "#FFF";
        const black = "#000";


        const currentMessage = editing && newMessage ? newMessage : message;

        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        color1 = { blue }
                        color2 = { white }
                        onClick = { this.handleChecked }
                    />
                    <input
                        disabled = { !editing }
                        ref = { editing && ((input) => input && input.focus()) }
                        size = '50'
                        type = 'text'
                        value = { currentMessage }
                        onChange = { this.handleNewMessage }
                        onKeyDown = { this.handleKeyDown }

                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.setPriority }
                        color1 = { blue }
                        color2 = { black }
                        color3 = { white }
                        onClick = { this.handleFavorite }
                    />
                    <Edit
                        inlineBlock
                        checked = { editing }
                        className = { Styles.edit }
                        color1 = { blue }
                        color2 = { black }
                        color3 = { white }
                        onClick = { this.handleEditMode }
                    />
                    <Remove
                        inlineBlock
                        color1 = { blue }
                        color2 = { black }
                        color3 = { white }
                        onClick = { this.deleteToDo }
                    />
                </div>
            </li>
        );
    }
}
