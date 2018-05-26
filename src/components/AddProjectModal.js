import React from "react";

export default class AddProject extends React.Component {
  state = {
    errorMessage: null
  };

  handleSubmit = e => {
    e.preventDefault();
    const project = e.target.elements.name.value.trim();

    // if handleAddProject fires a validation - the if statement will return a string
    // else will return undefined -> errorMessage = undefined
    const errorMessage = this.props.handleAddProject(project);

    // if handleAddProject returns an errorMessage update the state
    this.setState(() => {
      return { errorMessage };
    });

    // clear the form
    e.target.elements.name.value = "";
  };

  render() {
    return (
      <section className="add-project" onSubmit={this.handleSubmit}>
        {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
        <form>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />

          <input type="submit" value="Create Project" />
        </form>
      </section>
    );
  }
}
