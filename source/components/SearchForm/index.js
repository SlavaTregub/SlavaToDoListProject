//Core
import React, { Component } from 'react';

export default class SearchForm extends Component {
    render () {
        const {
            searchToDo,
            filterToDo,
        } = this.props;


        return (
            <header>
                <h1>Планировщик задач</h1>
                <input
                    placeholder = 'Поиск'
                    type = 'text'
                    value = { filterToDo }
                    onChange = { searchToDo }
                />

            </header>
        );
    }


}
