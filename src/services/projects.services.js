const prisma = require('../lib/prisma');

module.exports.createProject = async (data) => {
    const project = await prisma.project.create({data: data});
    return project;
};

module.exports.updateProject = async (filter, data) => {
    const project = await prisma.project.update({
        where: filter,
        data: data
    });
    return project;
};

module.exports.getProject = async (filter) => {
    const project = await prisma.project.findUnique({where: filter});
    return project;
};

module.exports.getProjects = async (filter) => {
    const project =  await prisma.project.findMany({where: filter});
    return project;
};

module.exports.deleteProject = async (filter) => {
    const project = await prisma.project.delete({where: filter});
    return project;
};
