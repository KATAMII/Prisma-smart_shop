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
router.post("/",async(req,res) =>{
    try {
        const {productThumbnail,productTitle,productDescription,productCost,onOffer}=req.body;
        const newproduct = await prisma.products.create({
            data:{
                productThumbnail:productThumbnail,
                productTitle:productTitle,
                productDescription:productDescription,
                productCost: productCost,
                onOffer:onOffer
            }
        })
        res.status(201).json(newproduct);
    } catch (e) {
        res.status(500).json({success:false, message: e.message})
    }
})
router.patch("/:id",(req,res) =>{
    res.send("updating a product")
})
router.delete("/:id",(req,res) =>{
    res.send("deleting  a product")
})

export default router