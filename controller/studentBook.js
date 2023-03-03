const { executeQuery } = require('../db/mySql')
const deleteStudentBook =async (req,res)=>{
    try{
        console.log('query:', req.query.code);
        let deleteStudentBookdata = req.query.code;
        var sql = 'DELETE FROM studentbook WHERE _id = ' + deleteStudentBookdata;
        let deletestudentsdata= await executeQuery(sql, [])
        res.send(deletestudentsdata)


    }
    catch(error){
        console.log("error in delete studentbookobject");
        res.send(error.message)
    }

}
module.exports ={deleteStudentBook}