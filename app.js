const storage = require("node-persist");
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

            }
        }).help('help');
    })
    .argv;
let command = argv._[0];

if( command === 'create'
    && typeof argv.name !== 'undefined' && argv.name.length > 0
    && typeof argv.username !== 'undefined' && argv.username.length > 0
    && typeof argv.password !== 'undefined' && argv.password.length > 0 ) {

   let createdAccount = createAccount({
        name : argv.name,
        username : argv.username,
        password : argv.password,
    });

   console.log('Account created successfully...');

}else if(command === 'get' && typeof argv.name !== 'undefined' && argv.name.length > 0) {
    let account = getAccount(argv.name);

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
