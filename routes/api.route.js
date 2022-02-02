const router = require("express").Router();
const {
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
} = require("../controllers/api_controller");
const { checkSignIn } = require("../middlewares/signIn_middleware");


router.get("/", apiRouteCheck);
router.get("/checkAuth",checkSignIn, async(req,res,next) =>{
    res.status(200).json({message:"Authorization Sucessful!"});
});
//signUp
router.post("/signUp", signUp);
//signIn
router.post("/signIn", signIn);
// get student by id
router.get("/students/:roll", getStudentById);
// get tecaher by name prob
router.get("/teachers/:name", getTeacherById);
// get all student
router.get("/students",  checkSignIn,getAllStudents);
//get all teacher
router.get("/teachers", getAllTeachers);
//create student
router.post("/students", createAStudent);
//create teacher
router.post("/teachers", createATeacher);
//delete student
router.delete("/students/:roll", deleteAStudent);
//update student
router.patch("/students/:roll", updateAStudent);
module.exports = router;