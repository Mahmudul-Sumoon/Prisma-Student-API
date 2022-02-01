const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
    rejectOnNotFound: {
        findUnique: true,
    },
});
const apiRouteCheck = async(req, res, next) => {
    res.status(200).json({ message: "api working" });
};

const getStudentById = async(req, res, next) => {
    try {
        const students = await prisma.student.findUnique({
            where: {
                roll: Number(req.query.roll),
            },
            include: { teacher: true },
        });
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
};

const getTeacherById = async(req, res, next) => {
    try {
        const teachers = await prisma.teacher.findUnique({
            where: {
                name: req.query.name,
            },
            //include:{student:true},
        });
        res.status(200).json(teachers);
    } catch (error) {
        next(error);
    }
};

const getAllStudents = async(req, res, next) => {
    try {
        //const teacher = await prisma.student.findUnique();
        const students = await prisma.student.findMany({
            include: { teacher: true },
        });
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
};

const getAllTeachers = async(req, res, next) => {
    try {
        //const teacher = await prisma.student.findUnique();
        const teachers = await prisma.teacher.findMany({
            include: { students: true },
        });
        res.status(200).json(teachers);
    } catch (error) {
        next(error);
    }
};
const createAStudent = async(req, res, next) => {
    try {
        const students = await prisma.student.create({
            data: req.body,
        });
        res.status(200).json({ message: "Created Succesfully" });
    } catch (error) {
        next(error.meta.target);
    }
};

const createATeacher = async(req, res, next) => {
    try {
        const teachers = await prisma.teacher.create({
            data: req.body,
        });
        res.status(200).json({ message: "Created Succesfully" });
    } catch (error) {
        next(error.meta.target);
    }
};

const deleteAStudent = async(req, res, next) => {
    try {
        const students = await prisma.student.delete({
            where: {
                roll: Number(req.query.roll),
            },
        });
        res.status(200).json({ message: "Deleted Succesfully" });
    } catch (error) {
        next(error);
    }
};

const updateAStudent = async(req, res, next) => {
    try {
        const students = await prisma.student.update({
            where: {
                roll: Number(req.query.roll),
            },
            data: req.body,
        });
        res.status(200).json({ message: "Updated Succesfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    apiRouteCheck,
    getStudentById,
    getTeacherById,
    getAllStudents,
    getAllTeachers,
    createAStudent,
    createATeacher,
    deleteAStudent,
    updateAStudent,
};