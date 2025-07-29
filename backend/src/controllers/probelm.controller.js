import { db } from "../Libs/db.js"
import { getlanguageId } from "../Libs/judge0.lib.js";

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
