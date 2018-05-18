//Core
import React, { Component } from 'react';

//Instruments
import { url, token } from 'config/api';

export const withApi = (Enhanced) =>
    class WithApi extends Component {
        static getDerivedStateFromProps () {
            const toDoes = JSON.parse(localStorage.getItem('toDoes'));

            return toDoes ? { toDoes } : null;
        }

        constructor () {
            super();
            this.createToDo = ::this._createToDo;
            this.updateToDo = ::this._updateToDo;
            this.deleteToDo = ::this._deleteToDo;
            this.completeAll = ::this._completeAll;
            this.allCompleted = ::this._allCompleted;
            this.searchToDo = ::this._searchToDo;
        }

        state = {
            toDoes:           [],
            isToDoesFetching: false,
            filterToDo:       '',
        };

        componentDidMount () {
            this._readToDo();
        }

        componentDidUpdate () {
            localStorage.setItem('toDoes', JSON.stringify(this.state.toDoes));
        }

        _searchToDo = (e) => {
            this.setState({
                filterToDo: e.target.value,
            });
        };

        _allCompleted = () => this.state.toDoes.every((toDo) => toDo.completed);

        _completeAll = () => {
            this._setToDoesFetchingState(true);
            try {
                for (const toDo of this.state.toDoes) {
                    toDo.completed = true;
                    this._updateToDo(toDo);
                }
            } catch (error) {
                console.log('complete all to do failed');
            } finally {
                this._setToDoesFetchingState(false);
            }
        };

        _sortToDoesList = (toDoes) => {
            const favorite = toDoes.filter((toDo) => toDo.favorite && !toDo.completed);
            const regular = toDoes.filter((toDo) => !toDo.favorite && !toDo.completed);
            const completedFavorite = toDoes.filter((toDo) => toDo.favorite && toDo.completed);
            const completedRegular = toDoes.filter((toDo) => !toDo.favorite && toDo.completed);

            return [
                ...favorite,
                ...regular,
                ...completedFavorite,
                ...completedRegular
            ];
        };

        async _createToDo (message) {
            this._setToDoesFetchingState(true);
            try {
                const response = await fetch(url, {
                    method:  'POST',
                    headers: {
                        Authorization:  token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                });

                if (response.status !== 200) {
                    throw new Error('create to do failed');
                }

                const { data } = await response.json();

                this.setState(({ toDoes }) => ({
                    toDoes: this._sortToDoesList([data, ...toDoes]),
                }));
            } catch ({ error }) {
                console.log('to do was not created');
            } finally {
                this._setToDoesFetchingState(false);
            }
        }

        async _deleteToDo (id) {
            try {
                const response = await fetch(`${url}/${id}`, {
                    method:  'DELETE',
                    headers: {
                        Authorization: token,
                    },
                });

                if (response.status !== 204) {
                    throw new Error('delete to do failed');
                }

                this.setState(({ toDoes }) => ({
                    toDoes: toDoes.filter((toDo) => toDo.id !== id),
                }));
            } catch ({ message }) {
                console.error(message);
            }
        }

        async _updateToDo (updatedToDo) {
            try {
                const response = await fetch(url, {
                    method:  'PUT',
                    headers: {
                        Authorization:  token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify([updatedToDo]),
                });

                if (response.status !== 200) {
                    throw new Error('update to do failed');
                }

                const { data: [updatedToDoFromServer] } = await response.json();

                this.setState(({ toDoes }) => {
                    const updatedToDoes = toDoes.map((toDo) => toDo.id === updatedToDo.id ? updatedToDoFromServer : toDo);

                    return {
                        toDoes:           this._sortToDoesList(updatedToDoes),
                        isToDoesFetching: false,
                    };
                });
            } catch ({ message }) {
                console.error(message);
            }
        }


        _readToDo = async () => {
            this._setToDoesFetchingState(true);
            try {
                const response = await fetch(url, {
                    method:  'GET',
                    headers: {
                        Authorization: token,
                    },
                });

                if (response.status !== 200) {
                    throw new Error('fetch to do failed');
                }

                const { data } = await response.json();

                this.setState({
                    toDoes: this._sortToDoesList([...data]),
                });

            } catch ({ message }) {
                console.error(message);
            } finally {
                this._setToDoesFetchingState(false);
            }
        };

        _setToDoesFetchingState = (state) => {
            this.setState(() => ({
                isToDoesFetching: state,
            }));
        };

        render () {
            return (
                <Enhanced
                    { ...this.state }
                    { ...this.props }
                    allCompleted = { this.allCompleted() }
                    completeAll = { this.completeAll }
                    createToDo = { this.createToDo }
                    deleteToDo = { this.deleteToDo }
                    searchToDo = { this.searchToDo }
                    updateToDo = { this.updateToDo }
                />
            );
        }
    };
