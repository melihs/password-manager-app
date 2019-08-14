let storage = require("node-persist");

storage.initSync();


/**
 *
 * @param account
 * @returns {*}
 */
function createAccount(account)
{
    let accounts = storage.getItemSync("accounts");

    if(typeof accounts === "undefined") {
        accounts = [];
    }
    accounts.push(account);
    storage.setItemSync("accounts",accounts);

    return account;
}

/**
 *
 * @param accountName
 * @returns {*}
 */
function getAccount(accountName)
{
    let accounts = storage.getItemSync("accounts");
    let matchedAccount;

    accounts.forEach(function(account) {
            if(account.name == accountName) {
                matchedAccount = account;
            }
    });

    return matchedAccount;
}


// createAccount({
//     name: "twitter",
//     username: "test@gmail.com",
//     password: "123!sfsf",
// });

let twitterAccount = getAccount("twitter");

console.log(twitterAccount);