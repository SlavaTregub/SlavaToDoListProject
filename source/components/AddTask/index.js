//Core
import React, { Component } from "react";

export default class AddTask extends Component {
    constructor () {
        super();
        this.hangleTextAreaChange = ::this._hangleTextAreaChange;
        this.handleSubmit = ::this._handleSubmit;
        this.handleEnter = ::this._handleEnter;
    }

  state = {
      message: "",
  };

  _hangleTextAreaChange (e) {
      const { value } = e.target;

      this.setState({
          message: value,
      });
  }

  _handleSubmit (e) {
      e.preventDefault();
      const { message } = this.state;
      const { createToDo } = this.props;

      if (message) {
          createToDo(message);
          this.setState({ message: "" });
      } else {
          console.log("please enter value");
      }
  }

  _handleEnter (e) {
      const enterKey = e.keyCode === 13;

      if (enterKey) {
          this.handleSubmit(e);
      }
  }

  render () {
      const { message } = this.state;


      return (
          <form onSubmit = { this.handleSubmit }>
              <input
                  placeholder = 'Описание моей новой задачи'
                  size = '50'
                  type = 'text'
                  value = { message }
                  onChange = { this.hangleTextAreaChange }
                  onKeyDown = { this.handleEnter }
              />
              <button>Добавить задачу</button>
          </form>
      );
  }
}
