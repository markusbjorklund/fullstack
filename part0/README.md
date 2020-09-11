## Part 0

### Tasks

- [ ] 0.4
- [ ] 0.5
- [ ] 0.6

#### 0.4 New note

```
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
server-->browser: 302 URL Redirect
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/favicon.ico
server-->browser: favicon.ico
```

#### 0.5 Single page app

```
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: spa.js

note over browser:
The code fetches the notes 
from the server as JSON-data 
and adds HTML elements for displaying 
the notes to the page using the DOM-API 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]
browser->server: HTTP GET https://studies.cs.helsinki.fi/favicon.ico
server-->browser: favicon.ico
```

#### 0.6 New note

```
note over browser
... we make a POST request to new_note_spa 
that contains the new note as JSON-data 
with content and date.
end note

browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
note right of browser
PAYLOAD {content: "this is a new test note", date: "2020-09-11T07:12:55.273Z"}
end note
server-->browser: 201 Created
```
