import { Router } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const router = Router();

router.get("/",(req,res) =>{
    res.send("getting all the products")
})
router.get("/:id",(req,res) =>{
    res.send("getting a single the products")
})
router.post("/",(req,res) =>{
    res.send("creating a product")
})
router.patch("/:id",(req,res) =>{
    res.send("updating a product")
})
router.delete("/:id",(req,res) =>{
    res.send("deleting  a product")
})

export default router