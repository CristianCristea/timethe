export const selectProject = (projects, projectName) => (
  projects.find(project => project.name === projectName));
