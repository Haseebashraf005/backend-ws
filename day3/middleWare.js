// let token = "4444"
// require("dotenv").config();

let token = process.env.myTokken;


let checkToken = (req, res, next) => {
    console.log("inside middleware");
    console.log(req.query);
    console.log(token)
    if (req.query.token == undefined || req.query.token == "") {
        return res.send("plz send a token")
    }
    if (req.query.token != token) {
        return res.send("plz send a valid token")
    }
    next()
}


module.exports = {checkToken}