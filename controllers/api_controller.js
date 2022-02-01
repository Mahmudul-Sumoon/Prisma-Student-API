const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
    rejectOnNotFound: {
        findUnique: true,
    },
});

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const signUp = async(req,res,next)=>{
try {
    const saltRounds = 10;
   // console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password,saltRounds);
    let obj = {
        name:req.body.name,
        username:req.body.username,
        password:hashedPassword,
    }
   await prisma.user.create({
    data:obj
});
res.status(200).json({
    message:"signup Successful!",
});
} catch (error) {
    res.status(500).json({
        message:"signup failed!",
    });
}
};


const signIn = async(req,res,next)=>{
    try {
       // console.log(req.body.username);
      const users = await prisma.user.findUnique({   
       where:{
        username:req.body.username,
       },
      });
      const isValid = await bcrypt.compare(req.body.password,users.password);
     // console.log(isValid);
      if (isValid) {
          //generate token
          const token = jwt.sign({
            username:users.username,
            userId:users._id,
          },process.env.JWT_SECRET,{
            expiresIn:'7d'
          });
          res.status(200).json({
              "access-token":token,
              "message":"signIn Successfull"
          })
          
      } else {
        res.status(500).json({
            message:"authentication failed",
        });
          
      }

    } catch{
        res.status(500).json({
            message:"authentication failed",
        });
    }
    };


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
    signUp,
    signIn,
};