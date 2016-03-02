module.exports = function (app, mongoose) {
    var productSchema = new mongoose.Schema({
        productName: String,
        productType: String,
        productPrice: Number,
        productQuantity: Number,
        productUser: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    });
    app.db.model('Product', productSchema);
};