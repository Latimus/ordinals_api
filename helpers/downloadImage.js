const {execSync} = require("child_process");

const download = async(cid, fileName)=>{
    const command = `sudo ipfs get --output /home/ord_api/build/img ${cid}/${fileName}`
    const child = execSync(command).toString();
    console.log(download);       
}
module.exports = {download};