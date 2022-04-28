const SHA256 = require('crypto-js/sha256');

//Define what a block consists of
class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }
    //we need a function to calculate the hash
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    //the genesis block has arbitrary values
    createGenesisBlock(){
        return new Block(0, "01/02/2020", "Genesis Block", "0")
    }

    getLastBlock(){
        return this.chain[this.chain.length -1];
    }
    //before gettin new block the previous hash of the last block must be set
    addBlock(newBlock){
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock)
    }
    //check if the chain is valid by comparing the hashes
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[1];
            const previosBlock = this.chain[i - 1];
            //check if the hash function is working
            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            //check if the previos hash is correct
            if(currentBlock.previousHash !== previosBlock.hash){
                return false
            }
            //return true if chain is valid
            return true;
        }
    }
}

let coin = new Blockchain();
coin.addBlock(new Block(1, "01/03/2020", {amount: 4}));
coin.addBlock(new Block(2, "01/09/2020", {amount: 11}));

console.log('Is chain valid? ' + coin.isChainValid());

coin.chain[1].data = { amount: 100 };

console.log('Is chain valid? ' + coin.isChainValid());

console.log(JSON.stringify(coin, null, 4, "font-size: 50" ));
