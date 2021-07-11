//reference:
//https://stackoverflow.com/questions/94037/convert-character-to-ascii-code-in-javascript


let btn = document.querySelector("#submit");
let textbox = document.querySelector("#new-pass");


//if exclude similar char is true, will not include this list of chars
function range(start, end){
    list = [];
    for(let i = start; i <= end; i++){
        list.push(String.fromCharCode(i));
    }
    
    return list;
}

function createSymbolList(){
    list = [];
    symbolRanges = [[33,47], [58, 64], [91,96], [123, 126]];
    symbolRanges.forEach(symrange => {
        list = list.concat(range(symrange[0], symrange[1]));
    });

    return list;
}

symbollist = createSymbolList();
numberlist = range(48, 57);
charLowercaselist = range(97, 122);
charUppercaseList = range(65,90);
similarcharslist = ["i, l, 1, L, o, 0, O,`,'"];
AmbiguousCharslist = ["{","[", "]", "(", ")", "/", "\\", "'", "\"","`", "~", ",", ";", ":", ".", "<", ">"];


function optionsGenerator(){
    optionsList = [];
    let symbols = document.getElementById("symbols");
    let numbers = document.getElementById("numbers");
    let charsLower = document.getElementById("char-lowercase");
    let charsUpper = document.getElementById("char-uppercase");
    let similarChars = document.getElementById("exclude-similar");
    let ambChars = document.getElementById("exclude-amb");


    if(symbols.checked){
        //from 33 to 47
        optionsList = optionsList.concat(symbollist);
    }
    if(numbers.checked){
        optionsList = optionsList.concat(numberlist);
    }
    if(charsLower.checked){
        optionsList = optionsList.concat(charLowercaselist);
    }
    if(charsUpper.checked){
        optionsList = optionsList.concat(charUppercaseList);
    }
    if(similarChars.checked){
        optionsList.forEach(element => {
            if(similarcharslist.includes(element)){
                optionList.splice(optionsList.indexOf(element), 1);
            }
        });
    }
    if(ambChars.checked && symbollist.checked){
        optionsList.forEach(element => {
            if(AmbiguousCharslist.includes(element)){
                optionsList.splice(optionsList.indexOf(element), 1);
            }
        });
    }

    return optionsList;
    
}

function generate(list, lenInt){
    let password = '';
    for(let i = 0; i < lenInt; i++){
        number = list[Math.floor(Math.random() * list.length)];
        // console.log(number);
        list.splice(list.indexOf(number), 1);
        password = password + number;
    }
    // console.log(password);
    return password;
}
btn.addEventListener("click", (e)=>{
    e.preventDefault();

    let length = document.querySelector("#password_length").value;

    lenInt = parseInt(length);
    list = optionsGenerator();
    let password = generate(list, lenInt);
    
    textbox.value = password;
});

