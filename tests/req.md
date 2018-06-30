# TODO

- implement project startDate - moment.js
- implement project sessions

## Data Structure

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
          date: number_timestamp,
          seconds: number,
          note: string
        }
      ]
    }
  ],
}
```

- move format time up in the app and pass it down through props
- display total time - all sessions on project page
- btn to delete project on project page
- finish project
- display archived projects
- cancel session - dont save, just stop it
- display warning - cant leave the tab while session active
- active menu button
- style

- on archived project page - display single project info - print or generate PDF to download



- data persistance - localStorage
- add redux
- add search - project
- add auth
- connect to firebase
