const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const {body, validationResult} = require('express-validator');

// Router 1 : fetchData GET: /api/notes.fetchdata
router.get('/fetchdata', fetchuser, async(req,res)=>{
    try{
        const user = await Note.find({user: req.user.id})
        res.json(user) 
    }catch(error){
        console.error({error: error.message})
        res.status(500).send("internal error occured")
    }
})

// Router 2: ADD data in notes POST: /api/notes/adddata
router.post('/adddata', fetchuser, [
    body('title', "Title must be atleast 3 words").isLength({min: 3}),
    body('description', "Description must be atleast 5 words").isLength({min: 5})
], async(req, res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: "Fill up the following details"})
    }

    try{
        const {title, description, tag} = req.body;

        let note = await new Note({
            title, description, tag, user: req.user.id
        })

        const savedData = await note.save();

        res.send(savedData)
    }catch(error){
        console.error({error: error.message})
        res.status(500).send('Internal error occured')
    }
})

// Router 3 : Update the data PUT: /api/notes/updateData/id
router.put('/updatedata/:id', fetchuser, async(req, res)=>{
    try{
        const {title, description, tag} = req.body;
        const newNotes = {}
        if(title){newNotes.title = title}
        if(description){newNotes.description = description}
        if(tag){newNotes.tag = tag}

        let note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).json({error: "Not Found"})
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).json({error: "Not Allowed"})
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNotes}, {new: true})

        res.json(note)

    }catch(error){
        console.error({error: error.message})
        res.status(500).send("Internal error occured")
    }
})

// Router 4 : Delete Notes from db DELETE: /api/notes/deletedata/:id
router.delete('/deletenotes/:id', fetchuser, async(req, res)=> {
    try{
            
        let note = await Note.findById(req.params.id)
        if(!note){
            return res.status(404).send("Not found")
        }
    
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
    
        note = await Note.findByIdAndDelete(req.params.id)
    
        res.json({"success": "your data has been deleted" , note: note})

    }catch(error){
        console.error({error: error.message})
        res.status(500).send("Internal error occured")
    }
    
})
module.exports = router;