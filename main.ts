#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import { writeHeapSnapshot } from "v8";

let balance = 100054; 
const pin = 1234;

let answers = await inquirer.prompt([{
    name: 'pin',
    type: 'number',
    message: 'Enter your pin code.'
}])

if(answers.pin === pin){
    console.log("correct pin");
    let options = await inquirer.prompt([{
        name:'options',
        type: 'list',
        message: 'please select an option.',
        choices: ['withdraw', 'check_balance', 'fast cash']
    }])

    // for fast cash
    if(options.options === 'fast cash'){
        const fast_cash = await inquirer.prompt([{
            name: 'amounts',
            type:'list',
            message: 'select your amount',
            choices: ['10000', '15000', '20000', '25000']
        }])
        if (fast_cash.amounts <= balance){
            balance -= fast_cash.amounts;
            console.log(chalk.green(`You have withdrawn ${fast_cash.amounts}. Your remaining balance is ${balance}`));
        }
        else{
            console.log(chalk.red('Insufficient balance!'));
        }
    }
    else if(options.options === 'check_balance'){
        console.log(`your current balance is ${chalk.greenBright(balance)}`);
    }
    else if(options.options === 'withdraw'){
        let amount = await inquirer.prompt([{
            name: 'amounts',
            type: 'number',
            message: 'please enter amount'
        }])
        if (amount.amounts <= balance){
            balance -= amount.amounts;
            console.log(chalk.green(`You have withdrawn ${amount.amounts}. Your remaining balance is ${balance}`));
        }
        else{
            console.log(chalk.red('Insufficient balance!'));
        }    
    }
}
else {
    console.log("not valid pin");
}
