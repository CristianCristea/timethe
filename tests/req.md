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
- data persistance - localStorage#


- generate PDF to download
- add redux
- add search - project
- add auth
- connect to firebase
