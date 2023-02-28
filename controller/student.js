const { executeQuery } = require('../db/mySql')
const getStudentData = async (req, res) => {
    console.log("get student data");
    try {
        var sql = "select * from students";
        let getStdentsdata = await executeQuery(sql, [])
        res.send(getStdentsdata)
    }
    catch (err) {
        console.log('error in Accounts get')
        res.send(err.message)
    }
}

const upsertStudentData = async (req, res) => {
    try {
        let studentkeys = Object.keys(req.body)
        let studentvalues = Object.values(req.body)
        let result = {}
        const studentdata = async (fieldname, vlaue) => {
            for (let i = 0; i < fieldname.length; i++) {
                
                result[fieldname[i]] = vlaue[i]
            }
        }
        studentdata(studentkeys, studentvalues)
        console.log("result is >>>");
        console.log(result);
        var sql = 'REPLACE INTO students SET ?'
        let getStdentsdata = await executeQuery(sql, result)
        console.log(getStdentsdata);
        res.send("upsert student page")
    } catch (error) {
        res.send("error page " + error.message)
    }
}

const deleteStudentData =async (req,res)=>{
    try {
        console.log("inside delete Book Data");
        console.log('query:', request.query.code);
        let deletestudentdata = request.query.studentid
        var sql = 'DELETE FROM students WHERE _id = ' + deletestudentdata;
        let deletestudentResult = await executeQuery(sql, [])
        res.send("Student Deleted Successfully")
    }
    catch (err) {
        console.log("error happenend in Book deletion")
        res.send(err.message)
    }
}
module.exports = {getStudentData, upsertStudentData,deleteStudentData}