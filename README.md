# Socket Code Editor Assignment

A full stack home assignment.

To view the front end app click [Here](https://socket-code-editor.vercel.app/). :point_left:
To view the server click [Here](https://socket-code-editor-server.onrender.com/). :point_left:

Note that this might take a minute to load, since I am hosting this on a free serverless provider :)

## Demo

https://github.com/nitzanpap/socket-code-editor/assets/87342833/296e0f76-7238-416f-8a2a-2defcf231609

## Local installation

1. **Clone the repo**

```
git clone https://github.com/nitzanpap/socket-code-editor.git
```

2. **Install all the dependencies**

```
npm run init-p
```

3. **Run server**

```
npm run server
```

4. **Run Client**

```
npm run client
```

5. **Open <http://localhost:3000> in your preferred browser**

## Description

Tom is Josh’s mentor for JS, but while Covid is still out there he prefers to do remote sessions.
Tom wants to share with Josh a piece of code, observe him while he is writing and changing the code in real time.

Help Tom creating an online coding web application with the following pages and features :

#### Lobby page (no need for authentication) :

The page should contain the title “Choose code block” and a list of at least 4 items which represents code blocks, each item can be represented by a name (for example - “Async case”)
Clicking on an item should take the user to the code block page with the details of the code block he chooses.

#### Code block page :

Both users should enter this page. (2 different clients)
Assume that the first user who opens the code block page is the mentor, after that, any other user will be counted as a student.

The mentor will see the code block he choose with a read only mode
The student will see the code block with the ability to change the code
Code changes should be displayed in real-time (Socket)
Use highlight.js to highlight the syntax (you can use any other library)
(Support JS code only)

#### General guidelines:

Code blocks should be created manually, no need for API or UI.
A code block should have the fields ‘title’ and ‘code’ (code is a string which represent JS code)
Add clear comments to the code where needed.
This task involves client server and DB, you can use any framework/language you want.

**_Submission instructions:_**
Deploy the project and supply the url.
You can use any service you would like for hosting your deployment.

**_Bonus:_**
Have a “solution” on a codeblock object (also insert manually), once the student changes the code to be equal to the solution, show a big smiley face on the screen :)

If you have any questions regarding the assignment do not hesitate to contact me over email or phone.

Good luck!
