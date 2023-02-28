const express = require('express')
const router = express.Router()
const {getStudentData,upsertStudentData,deleteStudentData} = require('../controller/student')
const {getBooksData, upsertBooksData,deleteBooksData}= require('../controller/book')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get('/getStudentData',getStudentData)
router.get('/upsertSudentData',upsertStudentData)
router.get('/deleteStudentData',deleteStudentData)

router.get('/getBookData',getBooksData)
router.get('/upsertBookData',upsertBooksData)
router.get('/deleteBookData',deleteBooksData)




module.exports = router     // studentID, FirstName, LastName, Address, City, Department, Year

 //BookName, Author, price, Quantity, category, description