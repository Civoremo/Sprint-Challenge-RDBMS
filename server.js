const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const projectDB = require('./data/helpers/projectsDB.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(morgan('short'));

server.get('/', (req, res) => {
    res.send('server sanity check');
});

server.get('/api/projects/:id', (req, res) => {
    projectDB.getProjectbyId(req.params.id)
        .then(result => {
            if(!result) {
                res.status(404).json({ message: 'Project by ID could not be found' });
            } else {
                res.status(200).json(result);
            }
        })
        .catch(err => {
            res.status(500).json({err: 'Server error, try again'});
        });
});

server.post('/api/projects', (req, res) => {
    if(req.body) {
        projectDB.addProject(req.body)
            .then(id => {
                res.status(201).json(id)
            })
            .catch(err => {
                res.status(500).json({ error: 'Server error adding new project' });
            });
    } else {
        res.status(409).json({error: 'Required: "name", Optional: "description", "complete"' });
    }
});

server.post('/api/actions', (req, res) => {
    if(req.body) {
        projectDB.addAction(req.body)
            .then(id => {
                res.status(201).json(id);
            })
            .catch(err => {
                res.status(500).json({ error: 'Server error adding new action'});
            })
    } else {
        res.status(409).json({error: 'Required: "description", "project_id", Optional: "notes", "complete"'})
    }
});

module.exports = server;