const User=require("../models/users.js")

module.exports.renderSignUpForm=(req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup=async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log("Registered user ", registeredUser);

        req.login(registeredUser, (err) => { //req.login() is asynchronous and so redirect should be done after login only
            if (err) {
                next(err);
            }
            console.log("Session saved successfully:", req.session);
            req.flash("success", "Welcome to Wonderplaces!");
            // console.log("req user ",req.user);
            // console.log("req session ",req.session);
    //         res.locals.currUser = req.user;
    // console.log("This is locals.currUser signup ", res.locals.currUser);
            
            res.redirect("/listings");
        });

    } catch (err) {
        req.flash("error", err.message); // using boilerplate and includes/flash.ejs
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm=(req, res) => {
    res.render("users/login.ejs");
};

module.exports.loginSuccess=async (req, res) => {
        req.flash("success", "welcome back to wonderplaces");
        res.redirect(res.locals.redirectUrl);
    };

module.exports.logout=(req, res) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "logged out successfully!")
        res.redirect("/listings");
    });
};
