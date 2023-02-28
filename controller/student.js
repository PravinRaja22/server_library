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

const deleteStudentData =async (request,res)=>{
    try {
        console.log("inside delete Book Data");
        console.log('query:', request.query.code);
        let deletestudentdata = request.query.studentid
        var sql = 'DELETE FROM students WHERE _id = ' + deletestudentdata;
        let deletestudentResult = await executeQuery(sql, [])
        res.send("Student Deleted Successfully")
    }
    catch (err) {
        console.log("error happenend in student deletion")
        res.send(err.message)
    }
}

const lookupStudent =async (req,res)=>{
    try {
        if(!req.query){
            var sql ="select FirstName from students limit 5"
            let getStudentsname = await executeQuery(sql, [])
            res.send(getStudentsname)
        }

        else if(req.query.searchKey){
            var sql ="select _id,FirstName from students WHERE FirstName like '%" + request.query.searchKey + "%'"
            let getSudentsdata = await executeQuery(sql, [])
            let studentName=[];
            getSudentsdata.forEach(element => {
                studentName.push({
                    studentName:element.firstName,
                    id:element._id
                })
            });
            res.send(studentName)
        }
    } catch (error) {
console.log("error in look up students");
res.send(error.message)
        
    }
}
module.exports = {getStudentData, upsertStudentData,deleteStudentData,lookupStudent}