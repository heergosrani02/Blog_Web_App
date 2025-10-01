import express from "express";
import methodOverride from "method-override";

const app = express();
const PORT = 3000;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

let data = [
  {
    title: "Necessary things to take with you for traveling",
    date: new Date().toDateString(),
  },

  {
    title: "Best Places for traveling",
    date: new Date().toDateString(),
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs", { data });
});

app.get("/page/:index", (req, res) => {
  const { index } = req.params;

  let post = data[parseInt(index)];

  if (!post) {
    return res.status(404).send("Post Not Found");
  }

  res.render("page.ejs", { post, index });
});

app.get("/edit/:index", (req, res) => {
  const { index } = req.params;
  const post = data[parseInt(index)];

  if (!post) {
    return res.status(404).send("Post Not Found");
  }

  res.render("edit.ejs", { post, index });
});

app.get("/write", (req, res) => {
  res.render("write.ejs");
});

app.post("/write", (req, res) => {
    const {title} = req.body;
    
    data.push({title, date : new Date().toDateString()});

    res.redirect('/');
});

app.put("/edit/:index", (req, res) => {
  const { index } = req.params;
  const { title } = req.body;

  const post = data[parseInt(index)];
  
  if (!post) {
    return res.status(404).send("Post Not Found");
  }

  data[parseInt(index)].title = title;
  res.redirect("/");
});

app.delete("/:index", (req, res) => {
  const { index } = req.params;

  data.splice(parseInt(index), 1);

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
