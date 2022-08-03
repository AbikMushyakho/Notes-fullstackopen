const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).send("Note not found!!");
  }
});
const generateId = () => {
  // const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  // return maxId + 1;
  const id =Math.floor(Math.random * 90000)
  return id
};
app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };
  notes = notes.concat(note);
  response.status(201).json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.put("/api/notes/:id",(request,response)=>{
  const id = Number(request.params.id);
  const data = request.body;

  // console.log(data);
  notes = notes.filter((note) => note.id !== id);
  notes.concat(data);
  // console.log(find);
  response.status(201).json(data)

})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
