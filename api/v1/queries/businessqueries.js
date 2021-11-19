const viewAll = "SELECT * FROM tblcomplaints WHERE userid = $1";
const addComplain = "INSERT INTO tblcomplaints (category, state, userid, complaindetails, company) VALUES ($1, $2, $3, $4, $5)";
const viewQueried = "SELECT * FROM tblcomplaints WHERE state = $1 AND userid = $2";
const getOne = "SELECT * FROM tblcomplaints WHERE complaintnumber = $1";
const makeStateProcessing = "UPDATE tblcomplaints SET state = $1 WHERE complaintnumber = $2";
const makeStateClosed = "UPDATE tblcomplaints SET state = $1 WHERE complaintnumber = $2";
const makeRemark = "UPDATE tblcomplaints SET remarks = $1 WHERE complaintnumber = $2";
const addChat = "UPDATE tblcomplaints SET chatid = $1 WHERE complaintnumber = $2";

const getSolved = "SELECT * FROM tblcomplaints WHERE state=2"
const getprocessing = "SELECT * FROM tblcomplaints WHERE state=1"
const getPending = "SELECT * FROM tblcomplaints WHERE state=0"

module.exports = {
    addComplain,
    viewAll,
    viewQueried,
    getOne,
    makeStateProcessing,
    makeStateClosed,
    makeRemark,
    addChat,
    getPending,
    getSolved,
    getprocessing,

}