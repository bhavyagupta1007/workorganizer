const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Task = require('./models/list');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));






app.get('/', function(req, res){


    Task.find({}, function(err, tasks){
        if(err){
            console.log("error in fetching contacts from db");
            return;
        }
        return res.render('home',{
            title: "To Do List",
            tasks_list: tasks
        });

    })
  
})
app.post('/create-list', function(req, res){
    
    
    Task.create({
        description: req.body.description,
        category: req.body.category,
        duedate: req.body.duedate
    }, function(err, newContact){
        if(err){
            console.log(req.body)
            console.log('Error in creating a contact!')
            return;
        }
            console.log('******', newContact);
            return res.redirect('back');
    })
  

});

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})


app.get('/delete-list', function(req, res){
    console.log(req.query);
    var id=req.query;

    //finding the no of selected checkboxes
    var count=Object.keys(id).length;
    
    for(let i=0;i<count;i++)
    {
        Task.findByIdAndDelete(Object.keys(id)[i],function(err)
        {
            if(err)
            {
                console.log("Error on deleting the task from list");
                return;
            }
        })
    }
    return res.redirect("back");

   
});
