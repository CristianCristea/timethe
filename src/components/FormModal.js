import React from "react";
import uuid from "uuid";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

export default class FormModal extends React.Component {
  state = {
    modal: false,
    errorMessage: null
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  // TODO: prepopulate form fields on edit
  loadPrevProject = () => {};

  handleSubmit = e => {
    e.preventDefault();
    let errorMessage = "";

    if (!this.props.edit) {
      const project = {
        id: uuid(),
        name: e.target.elements.name.value.trim(),
        description: e.target.elements.description.value.trim(),
        sessions: []
      };

      // if handleAddProject fires a validation - the if statement will return a string
      // else will return undefined -> errorMessage = undefined
      errorMessage = this.props.handleAddProject(project);
    }

    // if handleAddProject returns an errorMessage update the state
    this.setState(() => {
      return { errorMessage };
    });

    // toggle the modal only if the input is valid
    if (!errorMessage) {
      this.toggle();
    }

    // clear the form
    e.target.elements.name.value = "";
    e.target.elements.description.value = "";
  };

  render() {
    return (
      <section className="create-project">
        <Container>
          <Row>
            <Col>
              {this.props.edit ? (
                <Button
                  color="danger"
                  onClick={() => {
                    this.toggle();
                    this.loadPrevProject();
                  }}
                >
                  Edit Project
                </Button>
              ) : (
                <Button color="primary" size="lg" onClick={this.toggle}>
                  Create Project
                </Button>
              )}
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
              >
                <ModalHeader toggle={this.toggle}>
                  {this.props.edit ? "Edit" : "Create"} project
                </ModalHeader>
                <ModalBody>
                  {this.state.errorMessage && (
                    <p className="create-project__error">
                      {this.state.errorMessage}
                    </p>
                  )}
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        aria-describedby="project name"
                        placeholder="Project Name"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input
                        type="textarea"
                        name="description"
                        id="description"
                        aria-describedby="Project Description"
                        placeholder="Project Description"
                      />
                    </FormGroup>

                    <Button className="btn" onClick={this.toggle} type="reset">
                      Close
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      className="create-project__submit"
                    >
                      {this.props.edit ? "Update" : "Create"} project
                    </Button>
                  </Form>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
