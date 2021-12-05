class Calculator{
    constructor(){}
//[{(15-5)*5}/2]+(8-2)*{25+2}
    async evaluate(value = ''){
        let element = value;
        let stack = [];
        if(_validateSyntax(element)){
            for(let i = 0; i < element.length; i++){
                let substr = '';
                if(element.charAt(i) === '['){
                    substr = element.substring(i, _findSymbol(value,']'));
                    element.replace(substr, '');
                    stack.push(substr);
                }else{
                    if(element.charAt(i)=== '{'){
                        substr = element.substring(i, _findSymbol(value,'}'));
                        stack.push(substr);
                    }else{
                        if(element.charAt(i) === '('){
                            substr = element.substring(i, _findSymbol(value,')'));
                            stack.push(substr);
                        }
                    }
                }
            }
            return stack;
        }
        return 'Syntax Error';
    };
}

function _findSymbol(array, symbol){
    for (let index = 0; index < array.length; index++) {
        if(array.charAt(index) === symbol){
            return index + 1;
        }
    }
}

function _validateSyntax(value = ''){
    let stack = [];
    for(let i = 0; i< value.length;i++){
        let char = value.charAt(i);
        
        if(char === '{' || char === '[' || char === '('){
            stack.push(char);
        }else{
            if(char === '}' || char === ']' || char === ')'){
                stack.pop();
            }
        }
    }
    if(stack.length > 0){
        return false;
    }
    return true;
};

module.exports = Calculator;