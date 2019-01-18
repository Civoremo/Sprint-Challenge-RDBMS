const db = require('../dbConfig.js');

module.exports = {
    getProjectbyId,
    getProjects,
    addProject,
    updateProject,
    deleteProject,
    getActionById,
    getActions,
    addAction,
    updateAction,
    deleteAction,
};


function getProjectbyId(id) {
    const project = db('projects')
        .where('id', id)
        .first();

    const actions = db('actions')
        .select('id', 'description', 'notes', 'complete')
        .where('project_id', id);

    return Promise.all([project, actions])
        .then(res => {
            console.log(res);
            let [project, actions] = res;

            let compProBool = 'false';
            if(project.complete === 0) {
                compProBool = 'false';
            } else {
                compProBool = 'true';
            }

            actions.forEach(element => {
                if(element.complete === 0) {
                    element.complete = 'false';
                } else {
                    element.complete = 'true';
                }
            });

            let result = { id: project.id, name: project.name, description: project.description, completed:  compProBool, actions: actions};
            console.log(result);
            return result;
        })
}

function getProjects() {
    const projects = db('projects')
        .select();

    return Promise.all([projects])
        .then(res => {
            console.log(res);
            let [projects] = res;

            projects.forEach(element => {
                if(element.complete === 0) {
                    element.complete = 'false';
                } else {
                    element.complete = 'true';
                }
            });

            let result = {projects};
            return result;
        })
}

function addProject(project) {
    return db('projects')
        .insert(project);
}

function updateProject(id, project) {
    return db('projects')
        .where('id', id)
        .update(project);
}

function deleteProject(id) {
    return db('projects')
        .where('id', id)
        .del();
}

function getActionById(id) {
    const action = db('actions')
        .where('id', id);

    return Promise.all([action])
        .then(res => {
            console.log(res);
            let [action] = res;

            action.forEach(element => {
                if(element.complete === 0) {
                    element.complete = 'false';
                } else {
                    element.complete = 'true';
                }
            });

            let result = {action};
            console.log(result);
            return result;
        })
}

function getActions() {
    const actions = db('actions')
        .select();

    return Promise.all([actions])
        .then(res => {
            console.log(res);
            let [actions] = res;

            actions.forEach(element => {
                if(element.complete === 0) {
                    element.complete = 'false';
                } else {
                    element.complete = 'true';
                }
            });

            let result = {actions};
            return result;
        })
}

function addAction(action) {
    return db('actions')
        .insert(action);
}

function updateAction(id, action) {
    return db('actions')
        .where('id', id)
        .update(action);
}

function deleteAction(id) {
    return db('actions')
        .where('id', id)
        .del();
}