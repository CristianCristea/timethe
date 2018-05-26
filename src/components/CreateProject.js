import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default class CreateProject extends React.Component {
  state = {
    modal: false,
    errorMessage: null
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleSubmit = e => {
    console.log("submit");
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
      <div>
        <Button color="primary" size="lg" onClick={this.toggle}>
          Create Project
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Create a Project</ModalHeader>
          <ModalBody>
            {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  aria-describedby="name"
                  placeholder="Project Name"
                  required
                  minLength="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Description:
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  id="description"
                  rows="3"
                  required
                  minLength="10"
                />
              </div>
              <Button className="btn" onClick={this.toggle} type="reset">
                Close
              </Button>
              <Button color="primary" onClick={this.toggle} type="submit">
                Create
              </Button>
            </form>
          </ModalBody>>
        </Modal>
      </div>
    );
  }
}
