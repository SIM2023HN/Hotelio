const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

const mongoURI = 'mongodb+srv://Hotelio:Malwiederon05118117847!@cluster0.xygccyg.mongodb.net/'; // Verbindungs-URI zur MongoDB
const dbName = 'inHouse';

app.use(express.json());
app.use(cors());













// Endpunkt zum Speichern der Formulardaten in der MongoDB
app.post('/api/formdata', (req, res) => {
  const formData = req.body;

  // Connect to MongoDB
  MongoClient.connect(mongoURI, { useUnifiedTopology: true })
    .then((client) => {
      const db = client.db(dbName);
      const collection = db.collection('formdata');

      // Save the form data to MongoDB
      collection.insertOne(formData)
        .then(() => {
          res.json({ message: 'Data saved successfully' });
        })
        .catch((err) => {
          console.error('Error inserting data:', err);
          res.status(500).json({ error: 'Database error' });
        })
        .finally(() => {
          client.close();
        });
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).json({ error: 'Database error' });
    });
});

// Endpunkt zum Löschen der Formulardaten anhand der Raumnummer
app.delete('/api/formdata/:roomNumber', (req, res) => {
  const roomNumber = req.params.roomNumber;

  // Connect to MongoDB
  MongoClient.connect(mongoURI, { useUnifiedTopology: true })
    .then((client) => {
      const db = client.db(dbName);
      const collection = db.collection('formdata');

      // Delete the form data with the specified room number
      collection.deleteOne({ roomNumber })
        .then(() => {
          res.json({ message: 'Data deleted successfully' });
        })
        .catch((err) => {
          console.error('Error deleting data:', err);
          res.status(500).json({ error: 'Database error' });
        })
        .finally(() => {
          client.close();
        });
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).json({ error: 'Database error' });
    });
});

// Endpunkt zum Abrufen aller Formulardaten
app.get('/api/formdata', (req, res) => {
  MongoClient.connect(mongoURI, { useUnifiedTopology: true })
    .then((client) => {
      const db = client.db(dbName);
      const collection = db.collection('formdata');

      collection.find({}).toArray()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.error('Error fetching data:', err);
          res.status(500).json({ error: 'Database error' });
        })
        .finally(() => {
          client.close();
        });
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).json({ error: 'Database error' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
