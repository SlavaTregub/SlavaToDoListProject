//Core
import React, { Component } from 'react';

//Styles
import Styles from './styles.m.css';

//Components
import { withApi } from '../HOC/withApi';
import SearchForm from '../SearchForm';
import AddTask from '../AddTask';
import TaskList from '../TaskList';
import Footer from '../Footer';

@withApi
export default class Scheduler extends Component {
    render () {
        const {
            createToDo,
            completeAll,
            toDoes,
            searchToDo,
            deleteToDo,
            updateToDo,
            allCompleted,
            filterToDo,
        } = this.props;

        const filteredToDo = toDoes.filter((toDo) => toDo.message.includes(filterToDo))

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <SearchForm
                        filterToDo = { filterToDo }
                        searchToDo = { searchToDo }
                    />
                    <section>
                        <AddTask createToDo = { createToDo } />
                        <TaskList
                            deleteToDo = { deleteToDo }
                            Styles = { Styles }
                            toDoes = { filteredToDo }
                            updateToDo = { updateToDo }
                        />
                    </section>
                    <Footer
                        allCompleted = { allCompleted }
                        completeAll = { completeAll }
                        Styles = { Styles }
                    />
                </main>

            </section>
        );
    }
}
