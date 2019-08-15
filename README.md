# Account-manager-app

> fundemental console-based node.js application
![console-based node.js application](nodejs-app.gif)

## Dependencies in the Project
- node-persist https://github.com/simonlast/node-persist
- yargs https://github.com/yargs/yargs

## Build Setup

``` bash
# install dependencies
npm install
```

# Usage
Commands 

#####Create new account
```
 node app.js create -n <account-name> -u <user-name> -p <password>
```
#####Get account
```
 node app.js get -n <account-name>
```

#####Aliases
```
 create : "Cretae new account" command
 get    : "Get Account" command
 -n : "account name"
 -u : "username"
 -p : "password"
```

