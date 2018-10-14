var mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

var CuratorSchema = new Schema({
    username: String,
    user_id: String,
    role: String
});

exports.CuratorSchema = CuratorSchema