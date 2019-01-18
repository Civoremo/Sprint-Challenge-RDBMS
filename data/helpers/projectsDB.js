const db = require('../dbConfig.js');

module.exports = {
    getProjectbyId,
    getProjects,
    addProject,
    updateProject,
    deleteProject,
    addAction,
};


function getProjectbyId(id) {
    const project = db('projects')
        .where('id', id)
        .first();

    const actions = db('actions')
        .select()
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

            let result = { id: project.id, name: project.name, description: project.description, completed:  compProBool, actions: actions };
            console.log(result);
            return result;
        })
}

function getProjects() {
    return db('projects')
        .select();
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

function addAction(action) {
    return db('actions')
        .insert(action);
}