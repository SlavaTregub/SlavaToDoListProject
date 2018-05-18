//Core
import React, { Component } from 'react';

//Component
import Task from 'components/Task';
import Catcher from 'components/Catcher';

export default class TaskList extends Component {

    render () {
        const {
            toDoes,
            deleteToDo,
            updateToDo,
        } = this.props;
        const renderToDoList = toDoes.map((toDo) =>
            (
                <Catcher
                    key = { toDo.id }>
                    <Task
                        { ...toDo }
                        deleteToDo = { deleteToDo }
                        updateToDo = { updateToDo }
                    />

                </Catcher>
            )
        );

        const { Styles } = this.props;


        return (
            <div className = { Styles.overlay }>
                <ul>
                    <div>
                        {renderToDoList}
                    </div>
                </ul>
            </div>
        );
    }
}
