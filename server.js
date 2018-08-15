const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb: //serduch:password1@ds141221.mlab.com:41221/database-1");

const userSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: Boolean,
    created_at: Date,
    update_at: Date
});
userSchema.methods.manify = function (next) {
    this.name = this.name + "-boy";
    return next(null, this.name);
};
userSchema.pre("save", function (next) {
    const currentDate = new Date();
    this.update_at = currentDate;
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});
const User = mongoose.model("User", userSchema);



const kenny = new User({
    name: "Kenny",
    username: "Kenny_the_boy",
    password: "password"
});
kenny.manify(function (err, name) {
    if (err) throw err;
    console.log("twoje nowe imie:" + name);
});
const benny = new User({
    name: "Benny",
    username: "Benny_the_boy",
    password: "password"
});
benny.manify(function (err, name) {
    if (err) throw err;
    console.log("twoje nowe imie:" + name);
});
const mark = new User({
    name: "Mark",
    username: "Mark_the_boy",
    password: "password"
});
mark.manify(function (err, name) {
    if (err) throw err;
    console.log("twoje nowe imie:" + name);
});

const findAllUsers = function () {
    return User.find({}, function (err, res) {
        if (err) throw err;
        console.log('Actual database records are ' + res);
    });
}
const findSpecificRecord = function () {
    return User.find({
            username: 'Kenny_the_boy'
        },
        function (err, res) {
            if (err) throw err;
            console.log('Record: ', res);
        })
}
const updateUserPassword = function () {
    return User.findOne({
        username: 'Kenny_the_boy'
    }).then(function (user) {
        console.log('Old password: ' + user.password);
        console.log('Name' + user.name);
        user.password = 'newPassword';
        console.log('New password ' + user.password);
        return user.save(function (err) {
            if (err) throw err;
            console.log('uzytkownik ' + user.name + ' zaktualizowany');
        })
    })
}
const updateUsername = function () {
    return User.findOneAndUpdate({
        username: 'Benny_the_boy'
    }, {
        username: 'Benny_the_man'
    }, {
        new: true
    }, function (err, user) {
        if (err) throw err;
        console.log('nowa nazwa uzytk.' + user.username);
    })
}
const findMarkAndDelete = function () {
    return User.findOne({
        username: 'Mark_the_boy'
    }).then(function (user) {
        return user.remove(function () {
            console.log('User deleted');
        });
    })
}
const findKennyAndDelete = function () {
    return User.findOne({
            username: 'Kenny_the_boy'
        })
        .then(function (user) {
            return user.remove(function () {
                console.log('User deleted');
            });
        });
}
const findBennyAndDelete = function () {
    return User.findOne({
            username: 'Benny_the_man'
        })
        .then(function (user) {
            return user.remove(function () {
                console.log('User deleted');
            });
        });
}




Promise.all([kenny.save(), mark.save(), benny.save()])
    .then(findAllUsers)
    .then(findSpecificRecord)
    .then(updateUserPassword)
    .then(updateUsername)
    .then(findMarkAndDelete)
    .then(findKennyAndDelete)
    .then(findBennyAndDelete)
    .catch(console.log.bind(console))
// findAllUsers();
// findMarkAndDelete();
// findBennyAndDelete();
// findKennyAndDelete();