const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
);
const app = express();

// Create a new item in the museum: takes a title and a path to an image.
var db = firebase.firestore();
var itemsRef = db.collection('items');


app.post('/api/items', async (req, res) => {
  try {
    let querySnapshot = await itemsRef.get();
    let numRecords = querySnapshot.docs.length;
    
    console.log (querySnapshot.docs);
    let item = {
      id: req.body.title,
      title: req.body.title,
      path: req.body.path,
      description: req.body.description,
    };
    itemsRef.doc(item.id.toString()).set(item);
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try{
    let querySnapshot = await itemsRef.get();
    res.send(querySnapshot.docs.map(doc => doc.data()));
  }catch(err){
    res.sendStatus(500);
  }
});

//deletes the item in the list

app.delete('/api/items/:id', async (req, res) => {
  try {
    let id = req.params.id.toString();
    var toDelete = itemsRef.doc(id);
    var pic = await toDelete.get();

    if(!pic.exists) {
      res.status(404).send("that item was not found");
      return;
    }
    else {
      toDelete.delete();
      res.sendStatus(200);
      return;
    } 
  }catch(error) {
      res.status(500).send("An error occured durring deletion of image num" + id);
  }
});

//edit items
app.put('/api/items/:id', async (req, res) => {
  let id = req.params.id.toString();
  var toEdit = itemsRef.doc(id);
  
  try {
    var pic = await toEdit.get();
    let item = {
      id: toEdit.id,
      title: req.body.title,
      path: req.body.path,
      description: req.body.description,
    };
    if(!pic.exists) {
      res.status(404).send("That picture does not exist!");
      return;
    }
    else {
      itemsRef.doc(item.id.toString()).set(item);
      res.send(item);
    }
  } catch (error) {
    res.sendStatus(500).send("Could not edit image number " + id);
  }
});


exports.app = functions.https.onRequest(app);