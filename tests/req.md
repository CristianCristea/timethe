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
