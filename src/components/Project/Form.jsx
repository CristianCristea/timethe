import React from 'react';
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
import { connect } from 'react-redux';
import { addProject, editProject } from '../../actions/projects';
import './form.css';

class ProjectForm extends React.Component {
  state = {
    name: this.props.currentProject.name,
    description: this.props.currentProject.description,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description } = this.state;
    const {
      addProject,
      editProject,
      edit,
      history,
      match,
    } = this.props;

    // add new Project
    if (!edit) {
      addProject({ name, description });
    }

    // edit Project
    if (edit) {
      const project = {
        name: name.toLowerCase(),
        description,
      };

      editProject(match.params.id, project);
    }

    // redirect to dashboard after form submision
    history.push(`/projects/${this.state.name.toLowerCase()}`);
  }

  handleTextChange = e => (this.setState({ [e.target.name]: e.target.value }));

  isFormCompleted = () => (this.state.name.length > 2);

  render() {
    const { edit } = this.props;
    const { name, description } = this.state;

    return (
      <section className="ProjectForm">
        <Container>
          <Row>
            <Col sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>
              <Form id="projectForm" onSubmit={this.handleSubmit}>
                <FormGroup className="mb-5">
                  <h3>{edit ? 'Update' : 'Create'} project</h3>
                </FormGroup>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
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
                    value={description}
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
                  {edit ? 'Update' : 'Create'} project
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (ownProps.edit) {
    return {
      currentProject: state.projects.find(p => p.id === ownProps.match.params.id),
    };
  }

  return {};
};

const mapDispatchToProps = {
  addProject,
  editProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);

ProjectForm.propTypes = {
  edit: PropTypes.bool,
  currentProject: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

ProjectForm.defaultProps = {
  edit: false,
  currentProject: {
    name: '',
    description: '',
  },
};
