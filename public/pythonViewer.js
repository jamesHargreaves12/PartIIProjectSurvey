pythonKwords = ['class','False', 'None', 'True', 'and', 'as', 'assert', 'break', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']

function prettyPrintPython(text) {
    text = highlightKeywords(text);
    text = cheatToIncludeFirstDef(text);
    return replaceSpaces(text)
}

function replaceSpaces(text){
    text = text.replace(new RegExp('    ','g'), ' &emsp; ');
    return text.replace(new RegExp('<>','g'), '<br>');
}
function highlightKeywords(text){
    var i;
    for (i = 0; i < pythonKwords.length; i++){
        var matches = new Set(text.match(new RegExp("[^a-zA-Z]"+pythonKwords[i]+"[^a-zA-Z0-9]", 'g')))

        matches.forEach(function (value, value2, set) {
            var firstChar = value.substring(0,1);
            var lastChar = value.substring(value.length-1,value.length);
            var kword = value.substring(1,value.length-1)
            value.replace('(','\(')
            text = text.replace(new RegExp(value,'g'),firstChar+"<tag class='keyword'>"+kword+"</tag>"+lastChar)

        })
    }
    return text;
}

function cheatToIncludeFirstDef(text){
    return text.replace("def", "<tag class='keyword'>def</tag>")
}