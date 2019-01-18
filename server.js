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

server.get('/api/projects', (req, res) => {
    projectDB.getProjects()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => {
            res.status(500).json({ error: 'Server error retrieving projects' });
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

server.put('/api/projects/:id', (req, res) => {
    if(req.body) {
        projectDB.updateProject(req.params.id, req.body)
            .then(count => {
                res.status(200).json(count);
            })
            .catch(err => {
                res.status(500).json({ error: 'Server error updating project' });
            });
    } else {
        res.status(409).json({ error: 'Please provide required info to update project' });
    }
})

server.delete('/api/projects/:id', (req, res) => {
    projectDB.deleteProject(req.params.id)
        .then(count => {
            if(count !== 0) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ error: 'Project could not be found for deletion' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Server error deleting project' });
        })
});



server.get('/api/actions/:id', (req, res) => {
    projectDB.getActionById(req.params.id)
        .then(action => {
            if(action.length !== 0) {
                res.status(200).json(action);
            } else {
                res.status(404).json({ error: 'Could not find Action by ID' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Server error' });
        });
})

server.get('/api/actions', (req, res) => {
    projectDB.getActions()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({ error: 'Server error' });
        });
})

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

server.put('/api/actions/:id', (req, res) => {
    if(req.body) {
        projectDB.updateAction(req.params.id, req.body)
            .then(count => {
                res.status(200).json(count);
            })
            .catch(err => {
                res.status(500).json({ error: 'Server error' });
            });
    } else {
        res.status(409).json({ error: 'Server error' });
    }
});

server.delete('/api/actions/:id', (req, res) => {
    projectDB.deleteAction(req.params.id)
        .then(count => {
            if(count !== 0) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ error: 'Could not find action by ID for deletion' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Server error' });
        });
});

module.exports = server;