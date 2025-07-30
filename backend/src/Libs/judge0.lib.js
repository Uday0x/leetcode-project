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
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{
        submissions
        })

    console.log("submisiion results",data)

    return data // data will return in the form od array [{token1},{token2},{token3}] //depending the language intake
}