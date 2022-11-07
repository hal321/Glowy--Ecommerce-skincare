const check = require("../models/userSchema");
 


const checkIsLoggedIn = (req, res, next) => {
    console.log(req.session)
}
module.exports=checkIsLoggedIn
    //if (req.session.currentUser != undefined) {
      //res.locals.isLoggedIn = true
      //check.find({username})
    //   const sql = `select * from users where id = $1`
    //   db.query(sql, [req.session.userId], (err, dbRes) => {
    //     if (err) {
    //       console.log(err)
    //       res.redirect('/')
    //       return
    //     }
        //res.locals.currentUser = dbRes.rows[0]
//         next()
//       })
//     } else {
//       res.locals.isLoggedIn = false
//       res.locals.currentUser = {}
//       res.redirect('/')
//     }
//   }