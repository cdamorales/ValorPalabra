const cleanData=(arrayValue)=>{
        let setValue = new Set(arrayValue);
        return setValue;
}

const countCharacters=(character,characters)=>{
    let charCount=characters.filter(currentCharacter => currentCharacter === character);
    return charCount.length;
}

const orderData=(setValue,characters)=>{
    let countByCharacter=[];
    setValue.forEach((currentCharacter)=>{
        let count= countCharacters(currentCharacter,characters);
        countByCharacter.push({[currentCharacter]:count});
    })
    return countByCharacter;
}

const getWordMaxValue=(countByCharacter)=>{
    countByCharacter.sort((a, b) => (a[Object.keys(a)[0]] > b[Object.keys(b)[0]]) ? -1 : 1);
    let maxValue=26;
    let wordValue=0;
    countByCharacter.map((curentCharacter)=>{
        let characterCount=curentCharacter[Object.keys(curentCharacter)[0]];
        wordValue+=(characterCount*maxValue);
        maxValue--;
    })
    return wordValue;
}

exports.handler = async (event) => {
    let value=event.word?event.word.trim().toUpperCase():"";
    let characters=value.split("");
    let setValue=cleanData(value);
    let countByCharacter= orderData(setValue,characters);
    let wordMaxValue=getWordMaxValue(countByCharacter);
    console.log(wordMaxValue);
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify({wordMaxValue}),
    };
    return response;
};
