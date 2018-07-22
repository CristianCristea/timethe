# Data Structure

```js
{
  projects: [
    {
      name: string,
      description: string,
      startDate: string_date,
      archiveDate: string_date,
      sessions: [
        {
          date: number_timestamp,
          seconds: number,
          note: string
        }
      ]
    }
  ],
}
```

## TODO

- move format time up in the app and pass it down through props
- display total time - all sessions on project page
- btn to delete project on project page
- finish project
- display archived projects
- cancel session - dont save, just stop it
- display warning - cant leave the tab while session active
- active menu button
- style
- on archived project page - display single project info - print
- data persistance - localStorage
- generate PDF to download
- add redux
  - added projects action creators, reducer, createStore

### DONE

- dispatch action creators on user interaction
- connect components to store
- rethink how a project is edited based on the action
- connect homepage - display projects based on active or archive
- edit project
- sessions:
- timer component state
  - connect timer to state
  - toggle-isSessonActive on cancel
  - cancel session - toggle isSessionActive: boolean
- add session to project sessions - see EndSessionModal component
- create selector for currentProject
- display sessions
- display project total worked time
- archive single project - update page view
- test projects action creators
- test projects reducer

### TODO:

- connect to firebase
- add auth
- add filters: text search, date
- tests
