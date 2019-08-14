let storage = require("node-persist");

storage.initSync();


function createAcount(account)
{
    let accounts = storage.getItemSync("accounts");

    if(typeof accounts === "undefined") {
        accounts = [];
    }
    accounts.push(account);
    storage.setItemSync("accounts",accounts);

    return account;
}

createAcount({
    name: "facebook",
    username: "melihsahin24@gmail.com",
    password: "123456",
});

function getAcount(acountName)
{

}
