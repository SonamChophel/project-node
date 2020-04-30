var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    ejs                     = require("ejs"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    methodOverride          = require("method-override"),
    flash                   = require("connect-flash"),
    User                    = require("./models/user"),
    indexRoutes             = require("./routers/index");

var app = express();

mongoose.connect("mongodb://localhost/project-node",{useNewUrlParser:true, useUnifiedTopology:true});
mongoose.set('useCreateIndex', true);
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I love Bhutan",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success")
    next();
});

app.use("/",indexRoutes);

app.listen(3002 , function(){
    console.log("Server Started!!!");
});
