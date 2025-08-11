import { db } from "../Libs/db.js"
import { getlanguageId, pollBatchResults, submitBatch } from "../Libs/judge0.lib.js";

export const createProblem = async (req, res) => {
    //get all data from req body
    const { tittle, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions } = req.body;

    //validate if the user role is admin //just for the safe play
    console.log(req.user.role)
    if (req.user.role != 'ADMIN') {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    //keep an eye on how r u writing the messages these need to be  handled in the frontend


    //loop through each referance solution for different languages
    //get judge0 languageId for current language
    //prepare judge0 submission for all test cases 
    // sunmit all test cases in one batch 


    try {
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getlanguageId(language)


            if (!languageId) {
                return res.status(400).json({
                    error: `Language ${language}is not supported`
                })
            }
            console.log("passed the language ID?")

            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output ? `${output}\n` : undefined,
            }))

            console.log("Passed the submission", submissions)


            const submissionResults = await submitBatch(submissions)
            console.log("submission results", submissionResults)

            const tokens = submissionResults.map((res) => res.token)
            console.log("tokens", tokens)

            const results = await pollBatchResults(tokens)
            console.log("result", results)


            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                console.log("Result-----", result);
                // console.log(
                //   `Testcase ${i + 1} and Language ${language} ----- result ${JSON.stringify(result.status.description)}`
                // );
                if (result.status.id !== 3) {
                    return res.status(400).json({
                        error: `Testcase ${i + 1} failed for language ${language}`,
                    });
                }
            }


            console.log("reached here??")
            const newProblem = await db.problem.create({
                data: {
                    tittle,
                    description,
                    difficulty,
                    tags,
                    examples,
                    constraints,
                    testcases,
                    codeSnippets,
                    referenceSolutions,
                    userId: req.user.id,
                },
            });
            console.log("stuck here or wt?")
            return res.status(201).json({
                message: "Problem created successfully",
                problem: newProblem
            })
        }
    } catch (error) {
        console.error("DB Create Error:", error);
        return res.status(500).json({
            message: "Something wrong in creating the problem",
        })
    }
}

export const getAllproblems = async (req, res) => {
    const problems = await db.problem.findMany() //will write the logic if logged user should get or etc


    //validation
    try {
        if (!problems) {
            return res.status(404).json({
                message: "Problems not found",
            })
        }

        return res.status(201).json({
            message: "Problems fetched succesfully",
            problems
        })
    } catch (error) {

        return res.status(500).json({
            message: "Something wrong in fecthing the all problems",
        })
    }
}
export const getProblemById = async (req, res) => {
    const { id } = req.params;

    try {
        const problem = await db.problem.findUnique({
            where: {
                id
            }
        })

        if (!problem) {
            return res.status(404).json({
                message: "Cannot find the problem",
            })
        }

        return res.status(201).json({
            message: "fetched problem by Id successfully",
            problem
        })
    } catch (error) {
        return res.status(500).json({
            message: "error in fetching the problem",
        })
    }
}
export const updateProblemById = async (req, res) => {
    const { id } = req.params
    
    const { tittle, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions } = req.body;

    console.log("got the id")
    try {
        if (!id) {
            return res.status(404).json({
                message: "Plz give valid problem id"
            })
        }
        console.log("passed the id test",id)

        const problem = await db.problem.findUnique({
            where: {
                id
            }
        })

        console.log("found the problem",problem)

        if (!problem) {
            return res.status(404).json({
                message: "Cannot find problem based on the given ID"
            })
        }

        console.log("before updating")
        const updateProblem = await db.problem.update({
            where: { id },
            data: {
                tittle, description, difficulty, tags, examples, constraints, testcases, codeSnippets,
                referenceSolutions, userId: req.user.id

            }
        })
        console.log("not passing the update problem state")

        return res.status(201).json({
            message: "updated the problem sucessfully",
            updateProblem
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Cannot update the problem"
        })
    }
}
export const deleteProblem = async (req, res) => {
    try {
        const { id } = req.params;


        if (!id) {
            return res.status(404).json({
                message: "Plz give valid problem id"
            })
        }

        const problem = await db.problem.findUnique({ where: { id } })
        if (!problem) {
            return res.status(404).json({
                message: "Cannot find problem based on teh given Id"
            })
        }

        await db.problem.delete({ where: { id } })


        return res.status(201).json({
            message: `Deleted the problem of referance ID ${id}`
        })
    } catch (error) {

        return res.status(404).json({
            message: "Delete was not successful"
        })

    }

}
export const getSolvedProblems = async (req, res) => {

}
