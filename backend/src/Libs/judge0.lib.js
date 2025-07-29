export const getlanguageId =(language)=>{
    const languageMap ={
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63,
    }

    return languageMap[language.toUpperCase()] || null;

    //langaugeMap.python  //(value is not dynamic)
    //langaugeMap[language] //for dynamic values
}

export const submitBatch = async(submissions)=>{
    const {data} = await axios.post()
}