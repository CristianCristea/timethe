# Data Structure

```js
{
  projects: [
    {
      name: string,
      description: string,
      startDate: number_timestamp,
      archiveDate: number_timestamp,
      sessions: [
        {
          start: number_timestamp,
          end: number_timestamp,
          note: string
        }
      ]
    }
  ],
  activeProject: boolean
}
```

App.js - handleAddProject(project) - if a form field is empty or name is duplicate return a string else add the project to the state
Homepage.js - renders FormModal, pass handleAddProject
FormModal.js - renders Btn, render Form, handles form submit, creates project, store the errorMessage in the state if it exists, display error if it exists

App.js handleEditProject(project)
check if fields are valid - not empty not the same as prev
replace the old project with the new one
