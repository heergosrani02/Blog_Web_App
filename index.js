import express from 'express';
import methodOverride from 'method-override';

const app = express();
const PORT = 3000;

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));

let data = [
    {
        id: 1,
        title: "Necessary things to take with you for traveling",
        date: new Date().toDateString(),
    },

    {
        id: 2,
        title: "Best Places for traveling",
        date: new Date().toDateString(),
    },
]

app.get("/", (req, res) => {
    res.render('index.ejs', { data });
});

app.get("/page/:id", (req, res) => {
    const {id} = req.params;

    let post = data.find(item => item.id === parseInt(id));

    if(!post){
        res.status(404).send("Post Not Found");
    }

    res.render('page.ejs', {post});
});

app.post("/write", (req, res) => {
    
})

app.put("/edit/:id", (req, res) => {
    
});

app.delete("/:id", (req, res) => {
    const {id} = req.params;

    data = data.filter(item => item.id !== parseInt(id));

    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})