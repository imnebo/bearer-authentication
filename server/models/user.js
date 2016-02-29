module.exports = function (app, mongoose) {

    var userSchema = new mongoose.Schema({
        userFirstName: {type: String, required: true},
        userLastName: {type: String, required: true},
        userEmail: {type: String, unique: true, required: true},
        userPassword: {type: String, required: true}
    });

    app.db.model('User', userSchema);
};
