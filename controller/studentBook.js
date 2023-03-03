const deleteStudentBook =async (req,res)=>{
    try{
        console.log('query:', req.query.code);
        let deleteStudentBookdata = req.query.code;
        
    }
    catch(error){
        console.log("error in delete studentbookobject");
        res.send(error.message)
    }

}