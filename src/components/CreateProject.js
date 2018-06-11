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
    e.preventDefault();
    const project = {
      id: uuid(),
      name: e.target.elements.name.value.trim(),
      description: e.target.elements.description.value.trim()
    };

    // if handleAddProject fires a validation - the if statement will return a string
    // else will return undefined -> errorMessage = undefined
    const errorMessage = this.props.handleAddProject(project);

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
                      Create
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
