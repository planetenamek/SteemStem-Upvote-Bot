const Discord = require("discord.js");
const steem = require("steem");
const config = require("./../config.json");

module.exports = {
    isComment: function(author, permlink) {
        return new Promise((resolve, reject) => {
            steem.api.getContentReplies(author, permlink, function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    var users = []
                    result.forEach(function(element) {
                        if (element.author === config.bot_comment[0].username) {
                            users.push(element.author)
                        }
                    })
                    setTimeout(function() {
                        if (users.length > 0) {
                            resolve(false);
                        } else {
                            resolve(true)
                        }
                    }, 1500)
                }
            });
        })
    }

} // End module
