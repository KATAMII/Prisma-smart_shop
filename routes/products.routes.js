import { Router } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const router = Router();

router.get("/",async(req,res) =>{
    try {
      const products = await prisma.products.findMany();
      res.status(201).json(products)
    } catch (e) {
        res.status(500).json({success:false,message:e.message})
    }
})
router.get("/:id",async(req,res) =>{
    const id=req.params.id;
    try {
       const products = await prisma.products.findFirst({
        where :{id:id},
        select:{
            productThumbnail:true,
            productTitle:true,
            productDescription:true,
            productCost: true,
            onOffer:true
        }

       });
       res.status(201).json(products)
    } catch (e) {
        res.status(500).json({success:false,message:["products not found"]})
    }
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