class Params{
    constructor(type, data){
        let headers;
        if(type=='json'){
            headers = {
                'Content-type':'application/json'
            }
        }else if(type=='html'||type=='text'){
            headers = {
                'Content-type':'text/html'
            }
        }
        this.method = 'post';
        this.headers =headers;
        this.body = JSON.stringify(data);
    }
}
function getInpValue(id){
    return document.getElementById(id).value;
}
function isEmpty(obj){
    let result = false;
    for(i in obj){
        if(obj[i]===''){
            result = true;
        }
    }
    return result;
}
function includes(mainStr, includedStr){
    return mainStr.indexOf(includedStr) !== -1;
}