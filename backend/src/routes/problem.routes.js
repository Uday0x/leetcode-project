import express from "express";
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware.js";
import { createProblem, deleteProblem, getAllproblems, getProblemById, getSolvedProblems, updateProblemById } from "../controllers/probelm.controller.js";

const problemRoutes = express.Router();


problemRoutes.post("/create-problem",authMiddleware,checkAdmin,createProblem)

problemRoutes.get("/get-All-problems",authMiddleware,getAllproblems)

problemRoutes.get("/get-problem/:id",authMiddleware,getProblemById);

problemRoutes.put("/update-problem/:id",authMiddleware,checkAdmin,updateProblemById)

problemRoutes.delete("/delete-problem/:id",authMiddleware,checkAdmin,deleteProblem)

problemRoutes.get("/get-solved-problems",authMiddleware,getSolvedProblems)

export default problemRoutes;