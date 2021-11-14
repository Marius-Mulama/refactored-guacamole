const viewAll = "SELECT * FROM tblcomplaints WHERE userid = $1";
const addComplain = "INSERT INTO tblcomplaints (category, state, userid, complaindetails, company) VALUES ($1, $2, $3, $4, $5)";
const viewQueried = "SELECT * FROM tblcomplaints WHERE state = $1 AND userid = $2";
const getOne = "SELECT * FROM tblcomplaints WHERE complaintnumber = $1 AND userid = $2";


module.exports = {
    addComplain,
    viewAll,
    viewQueried,
    getOne,

}