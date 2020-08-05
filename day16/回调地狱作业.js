const fs = require('fs')
const path = require('path')
const {
    resolve
} = require('dns')
const {
    rejects
} = require('assert')
const {
    fstat
} = require('fs')




function readFile(address) {
    return new Promise((resolve,reject) => {
            fs.readFile(address, (error, content) => {
                    if (error) {
                        reject('error')
                    } else {
                        resolve(content.toString())
                    }
                })
            })
        }
function writeFile(address,content){
    return new Promise((resolve,reject)=>{
        fs.writeFile(address,content,(error)=>{
            if(error){
                reject('error');
            }else{
                resolve('success')
            }
        })
    })
}

// let content='';
// writeFile(path.join(__dirname,'1.txt'),'这是第一个文件')
// .then((data)=>{
//     console.log(data);
//     return readFile(path.join(__dirname,'1.txt'))
// })
// .then((data)=>{
//     console.log('1.txt===>',data);
//     content+=data+'\x0d';
//     return writeFile(path.join(__dirname,'2.txt'),'这是第二个文件')
// })
// .then((data)=>{
//     console.log(data);
//     return readFile(path.join(__dirname,'2.txt'))
// })
// .then((data)=>{
//     console.log('2.txt===>',data)
//     content+=data;
//     return writeFile(path.join(__dirname,'3.txt'),content)
// })
// .then((data)=>{
//     console.log('result===>',data)
//     console.log('3.txt===>',content)
    
// })

// .catch((e)=>{
//     console.log(e)
// })

async function main(){
    let writein=await Promise.all([writeFile(path.join(__dirname,'1.txt'),"这是文件1\x0d"),writeFile(path.join(__dirname,'2.txt'),'这是文件2')])
    let writeout=await Promise.all([readFile(path.join(__dirname,'1.txt')),readFile(path.join(__dirname,'2.txt'))])
    console.log(writeout)
    await writeFile(path.join(__dirname,'3.txt'),writeout[0]+writeout[1])
    let result=await readFile(path.join(__dirname,'3.txt'));
    console.log(result)
}
main();