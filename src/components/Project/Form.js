import React from "react";
import uuid from "uuid";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "./form.css";

// TODO: FIX ADD PROJECT PROCESS - CHANGED TO CONTROLLED FORM
// TODO: FIX VALIDATION

export default class ProjectForm extends React.Component {
  state = {
    errorMessage: null
  };

  handleSubmit = e => {
    e.preventDefault();
    let errorMessage = "";

    if (!this.props.edit) {
      const project = {
        id: uuid(),
        name: this.state.name,
        description: this.state.description,
        sessions: []
      };

      // if handleAddProject fires a validation - the if statement will return a string
      // else will return undefined -> errorMessage = undefined
      errorMessage = this.props.handleAddProject(project);
    } else if (this.props.edit) {
      const updatedProject = {
        ...this.props.existingProject,
        name: this.state.name,
        description: this.state.description
      };
      errorMessage = this.props.handleEditProject(updatedProject);
    }

    // if handleAddProject returns an errorMessage update the state
    this.setState(() => {
      return { errorMessage };
    });

    // redirect to dashboard after form submision
    console.log(this.state.error);
    if (this.state.error) {
      this.props.history.push("/");
    }

    // clear the form
    e.target.elements.name.value = "";
    e.target.elements.description.value = "";
  };

  handleTextChange = e =>
    this.setState({ [e.target.name]: e.target.value.trim() });

  render() {
    if (this.props.edit) {
      const project = this.props.filterProject(
        "name",
        this.props.match.params.name,
        this.props.projects
      );
    }

    return (
      <section className="create-project">
        <Container>
          <Row>
            <Col>
              {this.state.errorMessage && (
                <p className="create-project__error">
                  {this.state.errorMessage}
                </p>
              )}
              <Form id="projectForm" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.name}
                    aria-describedby="project name"
                    placeholder={"Project Name"}
                    onChange={this.handleTextChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={this.state.description}
                    aria-describedby="Project Description"
                    placeholder={"Project Description"}
                    onChange={this.handleTextChange}
                  />
                </FormGroup>

                <Button
                  color="primary"
                  type="submit"
                  className="create-project__submit"
                >
                  {this.props.edit ? "Update" : "Create"} project
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}
