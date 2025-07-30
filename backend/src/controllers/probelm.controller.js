import { db } from "../Libs/db.js"
import { getlanguageId, pollBatchResults, submitBatch } from "../Libs/judge0.lib.js";

export const createProblem=async(req,res)=>{
    //get all data from req body
    const {tittle, description, diificulty, tags,examples,constraints,testcases,codeSnippets, referenceSolutions} = req.body;

    //validate if the user role is admin //just for the safe play
    if(req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    //keep an eye on how r u writing the messages these need to be  handled in the frontend

    
    //loop through each referance solution for different languages
        //get judge0 languageId for current language
        //prepare judge0 submission for all test cases 
        // sunmit all test cases in one batch 


        try {
            for(const [language,solutionCode] of Object.entries(referenceSolutions)){
                const langaugeId = getlanguageId(language)


                if(!langaugeId){
                    return res.status(400).json({
                        error:`Language ${language}is not supported`
                    })
                }

                const submissions = testcases.map(({input , output})=>({
                    source_code:solutionCode,
                    langauge_id:langaugeId,
                    stdin:input,
                    expected_output:output,
                }))


                const submissionResults= await submitBatch(submissions)


                const tokens = submissionResults.map((res)=>res.token)

                const result =await pollBatchResults(tokens)

                for(let i = 0;i<result.length;i++){
                    const result = result[i];



                    if(result.status.id !== 3){
                        return res.status(400).josn({
                            error:`Testcase ${i+1} failed for langauge ${language}`
                        })
                    }
                }

                const newProblem = await db.problem.create({
                    data:{  tittle, description, diificulty, tags ,examples ,constraints ,testcases ,codeSnippets,
                        referenceSolutions,userId:req.user.id

                    }
                })

                return res.status(201).json({
                    message:"Problem created successfully",
                    problem:newProblem
                })
            }
        } catch (error) {
            
        }
}

export const getAllproblems=async(req,res)=>{
    
}
export const getProblemById=async(req,res)=>{

}
export const updateProblemById=async(req,res)=>{

}
export const deleteProblem=async(req,res)=>{

}
export const getSolvedProblems=async(req,res)=>{

}
