const Discord = require("discord.js");
const steem = require("steem");
const config = require("./config.json");

const bot = new Discord.Client();

var curatorDb = require("./db/curator.js");
var membersDb = require("./db/steemitMember.js");
var modules = require("./actions/sendVote.js");
bot.login(config.token);

module.exports = {
    Vote: function(message) {
        if (message.content === "undefined" || message.content.length < 1) {
            return message.channel.send("Invalid data !");
        }
        let element = message.content.split(" ");
        url = element.pop();
        value = element.pop();
        let trueValue = value.split("/");
        curieValue = trueValue.pop();
        steemstemValue = trueValue.pop();
        let data = url.split("/");
        permlink = data.pop();
        author = data.pop();
        message.channel.send("I'm going to upvote this post !");
        return modules.sendVote(message, steemstemValue, curieValue, author, permlink);
    },

    community_init: function(message) {
        if (message.content === "undefined" || message.content.length < 1) {
            return message.channel.send("Invalid data !");
        }
        if (message.member.permissions.has("ADMINISTRATOR")) {
            let element = message.content.split(" ");
            username = element.pop();
            username.trim();
            id = username.substring(2, username.length - 1);
            if (bot.users.get(id) != undefined) {
                name = bot.users.get(id).username;
                if (name != undefined) {
                    return curatorDb.init(id, name, "community", message);
                } else {
                    return message.channel.send("User not found ! ");
                }
            } else {
                return message.channel.send("User not found !");
            }
        } else {
            return message.channel.send("Not authorized ! This action is reserved to admin's only !");
        }
    },
    general_init: function(message) {
        if (message.content === "undefined" || message.content.length < 1) {
            return message.channel.send("Invalid data !");
        }
        if (message.member.permissions.has("ADMINISTRATOR")) {
            let element = message.content.split(" ");
            username = element.pop();
            username.trim();
            id = username.substring(2, username.length - 1);
            if (bot.users.get(id) != undefined) {
                name = bot.users.get(id).username;
                if (name != undefined) {
                    return curatorDb.init(id, name, "general", message);
                } else {
                    return message.channel.send("User not found !");
                }
            } else {
                return message.channel.send("User not found !");
            }
        } else {
            return message.channel.send("Not authorized ! This action is reserved to admin's only !");
        }
    },
    delete_curator: function(message) {
        if (message.content === "undefined" || message.content.length < 1) {
            return message.channel.send("Invalid data !");
        }
        if (message.member.permissions.has("ADMINISTRATOR")) {
            let element = message.content.split(" ");
            username = element.pop();
            username.trim();
            id = username.substring(2, username.length - 1);
            if (bot.users.get(id) != undefined) {
                name = bot.users.get(id).username;
                if (name != undefined) {
                    return curatorDb.deleteUser(id, message);
                } else {
                    return message.channel.send("User not found !");
                }
            } else {
                return message.channel.send("User not found!");
            }
        } else {
            return message.channel.send("Not authorized ! This action is reserved to admin's only !");
        }
    },
    update_role: function(message) {
        if (message.content === "undefined" || message.content.length < 1) {
            return message.channel.send("Invalid data !");
        }
        if (message.member.permissions.has("ADMINISTRATOR")) {
            let element = message.content.split(" ");
            username = element.pop();
            username.trim();
            id = username.substring(2, username.length - 1);
            if (bot.users.get(id) != undefined) {
                name = bot.users.get(id).username;
                if (name != undefined) {
                    return curatorDb.updateRoleUser(id, name, message);
                } else {
                    return message.channel.send("User not found !");
                }
            } else {
                return message.channel.send("User not found !");
            }
        } else {
            return message.channel.send("Not authorized ! This action is reserved to admin's only !");
        }
    },
    display_role: function(message) {
        if (message.content === "undefined" || message.content.length < 1) {
            return message.channel.send("Invalid data !");
        }
        if (message.member.permissions.has("ADMINISTRATOR")) {
            let element = message.content.split(" ");
            username = element.pop();
            username.trim();
            id = username.substring(2, username.length - 1);
            if (bot.users.get(id) != undefined) {
                name = bot.users.get(id).username;
                if (name != undefined) {
                    return curatorDb.displayRoleUser(id, message);
                } else {
                    return message.channel.send("User not found !");
                }
            } else {
                return message.channel.send("User not found !");
            }
        } else {
            return message.channel.send("Not authorized ! This action is reserved to admin's only !");
        }
    },

    blacklist_member: function(message){
        if (message.content === "undefined" || message.content.length < 1) {
            return message.channel.send("Invalid data !");
        }

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send("Not authorized to do this!");
        }

        let username = message.content.trim().split(/\s+/)[1];

        steem.api.getAccounts([username], function(err, res){
            if (err){
                return message.channel.send("Error! Try again.");
            }
            if (res == ""){
                return message.channel.send("Apparently, that Steemit user doesn't exist.");
            }
            else {
                return membersDb.setMemberToAList(username, "blacklist", message);
            }
        });

    },

    unblacklist_member: function(message){
       if (message.content === "undefined" || message.content.length < 1) {
            return message.channel.send("Invalid data!");
        }

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send("Not authorized to do this!");
        }

        let username = message.content.trim().split(/\s+/)[1];

        steem.api.getAccounts([username], function(err, res){
            if (err){
                return message.channel.send("Error! Try again.");
            }
            if (res == ""){
                return message.channel.send("Apparently, that Steemit user doesn't exist.");
            }
            else {
                return membersDb.removeUserFromLists(username, message);
            }
        });        
    },

}; //End module