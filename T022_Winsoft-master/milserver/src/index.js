const express = require('express');
const graph = require('./graph');
const bodyParser = require('body-parser');
const database = require('./database')
const authenticate = require('./authenticate')
const decrypt = require('./decrypt')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/finddesiredloc', (req, res) => {
    console.log(req.body);
    res.send(graph.findnode(req.body.target));
});

app.post('/decryptmsg', (req, res) => {
    console.log("hii")
    console.log(req.body.message, req.body.key);
    res.send(decrypt.decrypt(req.body.message, req.body.key));
});

app.post('/validate', authenticateToken, (req, res) => {
    res.send("success");
});

app.post('/logout', authenticateToken, (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    authenticate.logout(token);
    res.send("success");
});

app.post('/createNewUser', (req, res) => {
    // ...
    if(authenticate.valid(req.body.username, req.body.password))
    {
        const token = authenticate.generateAccessToken({ username: req.body.username });
        authenticate.sessionlive(token);
        res.send(token);
    }
    else{
    res.send("invalid");
    }
    // ...
  });

  function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
      if (!authenticate.validate(token)) return res.sendStatus(401)
    //   req.user = string
      next() // pass the execution off to whatever request the client intended
    }
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running!"));

