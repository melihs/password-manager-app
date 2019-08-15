const storage = require("node-persist");
const crypto = require("crypto-js");
storage.initSync();

const argv = require("yargs")
    .command('create','cretae new account',function(yargs){
        yargs.options({
            name : {
                demand : true,
                description : 'Account name!',
                alias : 'n',
                type : 'string'
            },
            username : {
                demand : true,
                description : 'Account owner name!',
                alias : 'u',
                type : 'string'
            },
            password : {
                demand : true,
                description : 'Account password',
                alias : 'p',
                type : 'string'
            },
            masterPassword : {
                demand : true,
                description : 'Your account with masterPassword',
                alias :  "k",
                type : "string"
            }
        }).help('help');
    })
    .command('get','Get Account',function(yargs){
        yargs.options({
            name : {
                demand :true,
                description : 'Account name',
                alias : 'n',
                type : 'string'

            },
            masterPassword : {
                demand : true,
                description : 'Your account with masterPassword',
                alias :  "k",
                type : "string"
            }
        }).help('help');
    })
    .argv;
let command = argv._[0];

if( command === 'create'
    && typeof argv.name !== 'undefined' && argv.name.length > 0
    && typeof argv.username !== 'undefined' && argv.username.length > 0
    && typeof argv.masterPassword !== 'undefined' && argv.masterPassword.length > 0
    && typeof argv.password !== 'undefined' && argv.password.length > 0 ) {
   let createdAccount = createAccount({
        name : argv.name,
        username : argv.username,
        password : argv.password
    },argv.masterPassword);

   console.log('Account created successfully...');

}else if(command === 'get'
    && typeof argv.name !== 'undefined' && argv.name.length > 0
    && typeof argv.masterPassword !== 'undefined' && argv.masterPassword.length > 0 ) {
    let account = getAccount(argv.name,argv.masterPassword);

    if(typeof account !== 'undefined') {
        console.log(account);
    } else {
        console.log('Opps! not found');
    }
} else {
    console.log('Please enter current command!');
}

/**
 *
 * @param masterPassword
 * @returns {[]}
 */
function getAccounts(masterPassword)
{
    let encryptedAccounts = storage.getItemSync("accounts");
    let accounts = [];

    if(typeof encryptedAccounts !== 'undefined') {
        let bytes = crypto.AES.decrypt(encryptedAccounts,masterPassword);
        accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
    }

    return accounts;
}

/**
 *
 * @param masterPassword
 * @returns {*}
 */
function saveAccounts(accounts,masterPassword)
{
    let encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts),masterPassword);
    storage.setItemSync("accounts",encryptedAccounts.toString());

    return accounts
}


/**
 *
 * @param account
 * @returns {*}
 */
function createAccount(account,masterPassword)
{
    let accounts = getAccounts(masterPassword);
    accounts.push(account);
    saveAccounts(accounts,masterPassword);

    return account;
}

/**
 *
 * @param accountName
 * @returns {*}
 */
function getAccount(accountName,masterPassword)
{
    let accounts = getAccounts(masterPassword);

    let matchedAccount;

    accounts.forEach(function(account) {
        if(account.name == accountName) {
            matchedAccount = account;
        }
    });

    return matchedAccount;
}
