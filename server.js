let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

// Utilisation de la variable d'environnement pour l'URI de connexion
const uri = process.env.MONGO_URI || 'mongodb+srv://tseminara:020980@cluster0.dvf9g.mongodb.net/assignmentsDB?retryWrites=true&w=majority&appName=Cluster0';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez avec http://localhost:8010/api/assignments que cela fonctionne");
  },
  err => {
    console.log('Erreur de connexion: ', err);
  });

// Configuration de la politique de sécurité de contenu (CSP)
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'none'; " +
    "font-src 'self' https://theo-apiangularm1-2024.onrender.com; " +
    "script-src 'self'; " +
    "connect-src 'self'; " +
    "img-src 'self'; " +
    "style-src 'self' 'unsafe-inline';"
  );
  next();
});

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// Les routes
const prefix = '/api';
app.route(prefix + '/assignments')
  .get(assignment.getAssignments);
app.route(prefix + '/assignments/:id')
  .get(assignment.getAssignment)
  .delete(assignment.deleteAssignment);
app.route(prefix + '/assignments')
  .post(assignment.postAssignment)
  .put(assignment.updateAssignment);

// On démarre le serveur
app.listen(port, "0.0.0.0", () => {
  console.log('Serveur démarré sur http://localhost:' + port);
});

module.exports = app;