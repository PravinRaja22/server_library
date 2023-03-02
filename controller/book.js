const { executeQuery } = require('../db/mySql');
const { getStudentbybookid } = require('./student');
const getBooksData = async (req, res) => {
    try {
        var sql = "select * from Books";
        let getBooksdata = await executeQuery(sql, [])
        res.send(getBooksdata)
    }
    catch (err) {
        console.log('error in Books get')
        res.send(err.message)
    }
}

const upsertBooksData = async (req, res) => {
    try {
        let bookkeys = Object.keys(req.body)
        let bookvalues = Object.values(req.body)
        let result = {}
        const bookData = async (fieldname, vlaue) => {
            for (let i = 0; i < fieldname.length; i++) {
                result[fieldname[i]] = vlaue[i]
            }
        }
        bookData(bookkeys, bookvalues)
        console.log("result is >>>");
        console.log(result);
        var sql = 'REPLACE INTO Books SET ?'
        let upsertbookdata = await executeQuery(sql, result)
        console.log(upsertbookdata);
        res.send("Book Inserted successfully")
    } catch (error) {
        res.send("error page " + error.message)
    }
}

const deleteBooksData = async (req, res) => {
    try {
        console.log("inside delete Book Data");
        console.log('query:', req.query.code);
        let deleteBookdata = req.query.bookid
        var sql = 'DELETE FROM Books WHERE _id = ' + deleteBookdata;
        let deleteBookResult = await executeQuery(sql, [])
        res.send("Book Deleted Successfully")
    }
    catch (err) {
        console.log("error happenend in Book deletion")
        res.send(err.message)
    }
}

const lookupBook = async (request, res) => {
    try {
        console.log(request.query);
        if (!request.query.searchKey) {
            console.log("inside iff lookup book");
            var sql = "select BookName,_id from Books limit 5"
            let getbookname = await executeQuery(sql, [])
            let bookName = [];
            getbookname.forEach(element => {
                console.log(element);
                bookName.push({
                    BookName: element.BookName,
                    id: element._id
                })
            });
            res.send(bookName)
        }

        else if (request.query.searchKey) {
            console.log("inisde else book look up " + request.query.searchKey);
            var sql = "select _id,BookName from Books WHERE BookName like '%" + request.query.searchKey + "%'"
            let getbookname = await executeQuery(sql, [])
            let bookName = [];
            getbookname.forEach(element => {
                bookName.push({
                    BookName: element.BookName,
                    id: element._id
                })
            });
            console.log(bookName);
            res.send(bookName)
        }
    } catch (error) {
        console.log("error in look up Books " + error.message);
        res.send(error.message)

    }
}

const updateBookstudentId = async (req, res) => {
    console.log("get single student data");
    const { bookName, bookRecordId, studentName, studentRecordId } = req.body;
    console.log(bookRecordId);
    try {
        var sql = 'UPDATE Books SET studentRecordId = ' + studentRecordId + ' WHERE _id = ' + bookRecordId
        let getBooksdata = await executeQuery(sql, [])
        console.log(getBooksdata);
        // var sql ='select * from students where bookRecordId = ' +bookRecordId
        // let getsindleStdentsdata = await executeQuery(sql, []);
        // console.log(getsindleStdentsdata);
        res.send("Book Assigned to the Student Successfully")
        // res.send(getStdentsdata)
    }
    catch (err) {
        console.log('error in Accounts get')
        res.send(err.message)
    }
}

const getBooksbystudentid = async (req, res) => {
    console.log("get Book by student id  data");
    console.log('=========================================');
    console.log(req.query);
    const bookRecordId = req.query.searchId;
    console.log(bookRecordId);
    try {

        var sql = 'select studentbook.*,students.FirstName from students ,studentbook where studentbook.studentRecordId = students._id and studentbook.studentRecordId =  ' + bookRecordId
        let getsinglebookid = await executeQuery(sql, []);
        console.log(getsinglebookid);
    

        res.send(getsinglebookid)


    }
    catch (err) {
        console.log('error in get students by book id get')
        res.send(err.message)
    }
}
module.exports = { getBooksData, upsertBooksData, deleteBooksData, lookupBook, updateBookstudentId, getBooksbystudentid }