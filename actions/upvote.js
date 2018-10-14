const steem = require("steem");

module.exports = {
    upvote: function(wif, voter, author, permlink, weight) {
        return new Promise((resolve, reject) => {
            steem.broadcast.vote(wif, voter, author, permlink, weight, function(err, result) {
                if (err) {
                    console.log('------ Erreur : ' + err)
                    reject(err)
                } else {
                    console.log(`------ Vote de @${voter} envoyé !`);
                    resolve(true)
                }
            });
        })
    }

} // End module