const express = require('express')
const router = express.Router()
const { getStudentData, upsertStudentData, deleteStudentData, lookupStudent , updateStudentBookId,getStudentbybookid} = require('../controller/student')
const { getBooksData, upsertBooksData, deleteBooksData,lookupBook,updateBookstudentId,getBooksbystudentid } = require('../controller/book')
const { deleteStudentBook } = require('../controller/studentBook')

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.post('/getStudentData', getStudentData)
router.post('/upsertSudentData', upsertStudentData)
router.post('/deleteStudentData', deleteStudentData)
router.post('/lookupStudent', lookupStudent)
router.post('/updateStudentBook',updateStudentBookId)
router.post('/getStudentsbyBookId',getStudentbybookid)

router.post('/getBookData', getBooksData)
router.post('/upsertBookData', upsertBooksData)
router.post('/deleteBookData', deleteBooksData)
router.post('/lookupBook',lookupBook)
router.post('/updateBookstudent', updateBookstudentId)
router.post('/getBooksbyStudentId', getBooksbystudentid)

router.post('/deletestudentbook',deleteStudentBook)




module.exports = router     // studentID, FirstName, LastName, Address, City, Department, Year

 //BookName, Author, price, Quantity, category, description