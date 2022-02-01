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
} = require("../controllers/api_controller");

router.get("/", apiRouteCheck);
// get student by id
router.get("/students/:roll", getStudentById);
// get tecaher by name prob
router.get("/teachers/:name", getTeacherById);
// get all student
router.get("/students", getAllStudents);
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