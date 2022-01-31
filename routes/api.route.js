const req = require('express/lib/request');

const router = require('express').Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient({
    rejectOnNotFound: {
      findUnique: true,
    },
  })
// import { ObjectId }  from('bson');
// const id = new ObjectId()

router.get('/',async(req,res,next)=>{
    res.send({message:'api working',});
    });

// get student by id 
router.get('/students/:roll',async(req,res,next)=>{
    try {
        const students = await prisma.student.findUnique({
            where:{
                roll:Number(req.query.roll)
            },
            include:{teacher:true},
        })
        res.json(students)
        
    } catch (error) {
        next(error)
    }
    });

// get tecaher by name prob 
router.get('/teachers/:name',async(req,res,next)=>{
    try {
        const teachers = await prisma.teacher.findUnique({
            where:{
                name:req.query.name
            },
            //include:{student:true},
        })
        res.json(teachers)
        
    } catch (error) {
        next(error)
    }
    });    

// get all student

router.get('/students',async(req,res,next)=>{
 try {
     //const teacher = await prisma.student.findUnique();
     const students= await prisma.student.findMany({
         include:{teacher:true}
     });
     res.json(students)
     
 } catch (error) {
     next(error)
 }
});

//get all teacher

router.get('/teachers',async(req,res,next)=>{
    try {
        //const teacher = await prisma.student.findUnique();
        const teachers= await prisma.teacher.findMany({
            //include:{student:true}
        });
        res.json(teachers)
        
    } catch (error) {
        next(error)
    }
   });

//creat student
router.post('/students',async(req,res,next)=>{
try {
    const students= await prisma.student.create({
        data: req.body,
    })
    res.status(200).json({message:"Created Succesfully"})
} catch (error) {
    next(error.meta.target)
}
});

//create teacher
router.post('/teachers',async(req,res,next)=>{
    try {
        const teachers= await prisma.teacher.create({
            data: req.body,
        })
        res.status(200).json({message:"Created Succesfully"})
    } catch (error) {
        next(error.meta.target)
    }
    });

//delete student
router.delete('/students/:roll',async(req,res,next)=>{
    try {
        const students = await prisma.student.delete({
            where:{
                roll:Number(req.query.roll)
            }
        })
        res.status(200).json({message:"Deleted Succesfully"});
        
    } catch (error) {
        next(error)
    }
});


//update student
router.patch('/students/:roll',async(req,res,next)=>{
    try {
        const students = await prisma.student.update({
            where:{
                roll:Number(req.query.roll)
            },
            data:req.body,
        })
        res.status(200).json({message:"Updated Succesfully"})
        
    } catch (error) {
        next(error)
    }
});
module.exports = router;