var express         = require("express"),
    router          = express.Router(),
    passport        = require("passport"),
    // passport        = require("./passport"),
    middlewareObj   = require("../middleware"),
    User            = require("../models/user");

router.get("/",function(req,res){
    res.render("home");
});

router.get("/admin",middlewareObj.isLoggedIn,function(req,res){
    res.render("admin");
});

router.get("/reception",middlewareObj.isLoggedIn,function(req,res){
    res.render("receptionist");
});

//register form display
router.get("/register",function(req,res){
    res.render("home");
 });


// handling register logic
router.post("/register",function(req,res){
        var userData = {
            username: req.body.username,
            cid: req.body.cid,
            dob: req.body.dob,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            address: req.body.address,
            acctype: req.body.acctype,
        }
        User.register(userData , req.body.password , function(err,user){
            if(err){
                 req.flash("error",err.message);
                 res.redirect("/register");
            } 
            passport.authenticate("local")(req,res,function(){
                req.flash("success","Welcome to Admin Page " + user.username);
                res.redirect("/admin");
            });
        });
    
    // }
 });
 


//login form display
router.get("/login",function(req,res){
    res.render("home");
});

// handling login logic

router.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user){
      if (err) {
          res.redirect("/");
      } else{
        User.findOne({email:req.body.email}, function(err, foundUser){
            if(err){
                res.redirect("/");
            } else {

                console.log("Email: " + foundUser.email);
                console.log("Acctype: " + foundUser.acctype);

                if(foundUser.acctype.toString() == "admin"){
                    res.redirect("/admin");
                } else if(foundUser.acctype.toString() == "reception"){
                    res.redirect("/reception");
                }
            }
          });
      }        
    })(req, res, next);
  });


//===========================================================================
    // router.post("/login",function(req,res){
    //     passport.authenticate("local",)
    // });

//===========================================================================




//logout
router.get("/logout",function(req,res){
    req.logOut();
    req.flash("error","You are successfully Logged Out!");
    res.redirect("/");
});

module.exports = router;
