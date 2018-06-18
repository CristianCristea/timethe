import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import './form.css';

export default class ProjectForm extends React.Component {
  state = {
    name: this.props.currentProject.name,
    description: this.props.currentProject.description,
    sessions: [],
    errorMessage: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // add new Project
    if (!this.props.edit) {
      const { name, description, sessions } = this.state;

      const project = {
        name: name.trim(),
        description: description.trim(),
        sessions,
        id: uuid(),
      };

      this.props.handleAddProject(project);
    }

    // edit Project
    if (this.props.edit) {
      const { name, description } = this.state;
      const project = {
        ...this.props.currentProject,
        name,
        description,
      };

      this.props.handleEditProject(project);
    }

    // redirect to dashboard after form submision
    this.props.history.push('/');
  }

  handleTextChange = e => (this.setState({ [e.target.name]: e.target.value }));

  isFormCompleted = () => (this.state.name.length > 2);

  render() {
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
                    aria-describedby="name"
                    placeholder="Minimum 3 letters"
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
                    placeholder="Optional Description"
                    onChange={this.handleTextChange}
                  />
                </FormGroup>

                <button
                  type="submit"
                  className="btn btn-primary create-project__submit"
                  disabled={!this.isFormCompleted()}
                >
                  {this.props.edit ? 'Update' : 'Create'} project
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

ProjectForm.propTypes = {
  edit: PropTypes.bool,
  currentProject: PropTypes.object,
  handleAddProject: PropTypes.func,
  handleEditProject: PropTypes.func,
  history: PropTypes.object.isRequired,
};

ProjectForm.defaultProps = {
  edit: false,
  currentProject: {
    name: '',
    description: '',
  },
  handleAddProject: null,
  handleEditProject: null,
};
