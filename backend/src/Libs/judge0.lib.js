import axios from "axios";

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


const sleep =(ms)=> new Promise((resolve)=>setTimeout(resolve,ms))

export const pollBatchResults = async (tokens)=>{
    while(true){
        
        const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
                tokens:tokens.join(","),
                base64_encoded:false,
            }
        })

        const results = data.submissions;

        const isAllDone = results.every(
            (r)=> r.status.id !== 1 && r.status.id !== 2
        )

        if(isAllDone) return results
        await sleep(1000)
    }
}