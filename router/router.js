const express = require('express')
const router = express.Router()
const {getStudentData,upsertStudentData,deleteStudentData} = require('../controller/student')
const {getBooksData, upsertBooksData,deleteBooksData}= require('../controller/book')
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.post('/getStudentData',getStudentData)
router.post('/upsertSudentData',upsertStudentData)
router.post('/deleteStudentData',deleteStudentData)

router.post('/getBookData',getBooksData)
router.post('/upsertBookData',upsertBooksData)
router.post('/deleteBookData',deleteBooksData)




module.exports = router     // studentID, FirstName, LastName, Address, City, Department, Year

 //BookName, Author, price, Quantity, category, description