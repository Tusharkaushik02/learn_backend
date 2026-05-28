const express = require('express');
const app = express();

app.use(express.json());
const notes =[];

app.post('/data', (req, res) => {
    const data =req.body;
    console.log('Received data:', data);
    notes.push(data);
    res.status(201).json({
        message: 'Data received',
        data
    });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/data', (req, res) => {
    res.status(200).json({
        message: 'This is the data page',
        notes:notes
    });
});

app.delete('/data/:id', (req,res)=>{
    const id =Number(req.params.id);
    let found =false;
    notes.forEach(innerArray=>{
        const index=innerArray.findIndex(note=>note.id===id);
    
    if(index!==-1){
        innerArray.splice(index,1);
        found = true;
        }
    });
    
    if(found){

        res.status(200).json({
            message: 'Data deleted successfully',
            notes
        });

    } else {

        res.status(404).json({
            message: 'Data not found'
        });
    }
})

app.patch('/data/:id', (req,res)=>{
    const id =Number(req.params.id);
    const description =req.body.description
    let found =false;
    notes.forEach(innerArray=>{
        const notes =innerArray.find(note=>note.id===id);
        console.log(innerArray);
        console.log(notes);
        if(notes){
            found = true;
            notes.description =description;
        }
    });
    if(found){
        res.status(200).json({
            message: 'Data updated successfully',
        });
    } else {
        res.status(404).json({
            message: 'Data not found'
        });
    }
})

module.exports = app