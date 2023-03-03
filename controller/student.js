const { executeQuery } = require('../db/mySql')
const getStudentData = async (req, res) => {
    console.log("get student data");
    try {
        var sql = "select * from students";
        let getStdentsdata = await executeQuery(sql, [])
        res.send(getStdentsdata)
    }
    catch (err) {
        console.log('error in students get')
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

const deleteStudentData = async (request, res) => {
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

const lookupStudent = async (request, res) => {
    try {
        console.log(request.query);
        if (!request.query.searchKey) {
            console.log("inside iff");
            var sql = "select * from students limit 5"
            let getStudentsname = await executeQuery(sql, [])
            let studentName = [];
            getStudentsname.forEach(element => {
                console.log(element);
                studentName.push({
                    studentName: element.FirstName,
                    id: element._id,
                    Department:element.Department,
                    Year:element.Year
                })
            });
            console.log(studentName);
            res.send(studentName)
        }

        else if (request.query.searchKey) {
            console.log("inisde else " + request.query.searchKey);
            var sql = 'REPLACE INTO students SET ?'
            let getStdentsdata = await executeQuery(sql, [])
            let studentName = [];
            getStdentsdata.forEach(element => {
                studentName.push({
                    studentName: element.FirstName,
                    id: element._id,
                    Department:element.Department,
                    Year:element.Year
                })
            });
            console.log(studentName);
            res.send(studentName)
        }
    } catch (error) {
        console.log("error in look up students " + error.message);
        res.send(error.message)

    }
}
const updateStudentBookId = async (req, res) => {

    try {
        console.log('update student book id');
        console.log(req.body);
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
        var sql = 'REPLACE INTO studentBook SET ?'
        let getStdentsdata = await executeQuery(sql, result)
        res.send("Student got that book succesfully")
        // res.send(getStdentsdata)
    }


    catch (err) {
        console.log('error in Accounts get')
        res.send(err.message)
    }
}

const getStudentbybookid = async (req, res) => {
    console.log("get student by book id  data");
    console.log(req.query);
    const bookRecordId = req.query.searchId;
    console.log(bookRecordId);
    try {

        var sql = 'select * from studentbook  where  bookRecordId = ' + bookRecordId
        let getsingleStudentbybookid = await executeQuery(sql, []);
        console.log(getsingleStudentbybookid);
        res.send(getsingleStudentbybookid)
        // res.send(getStdentsdata)
    }
    catch (err) {
        console.log('error in get students by book id get')
        res.send(err.message)
    }
}
module.exports = { getStudentData, upsertStudentData, deleteStudentData, lookupStudent, updateStudentBookId, getStudentbybookid }