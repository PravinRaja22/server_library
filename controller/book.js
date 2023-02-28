const { executeQuery } = require('../db/mySql')
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
        const studentdata = async (fieldname, vlaue) => {
            for (let i = 0; i < fieldname.length; i++) {
                result[fieldname[i]] = vlaue[i]
            }
        }
        studentdata(bookkeys, bookvalues)
        console.log("result is >>>");
        console.log(result);
        var sql = 'REPLACE INTO Books SET ?'
        let getStdentsdata = await executeQuery(sql, result)
        console.log(getStdentsdata);
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



module.exports = { getBooksData, upsertBooksData, deleteBooksData }