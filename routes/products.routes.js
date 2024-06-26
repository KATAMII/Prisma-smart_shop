import { Router } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const router = Router();

router.get("/",async(req,res) =>{
    try {
      const products = await prisma.products.findMany();
      res.status(201).json(products)
    } catch (e) {
        res.status(500).json({success:false,message:["error connecting to the server"]})
    }
})
router.get("/:id",async(req,res) =>{
    const id=req.params.id;
    try {
       const product = await prisma.products.findFirst({
        where :{id:id},
        select:{
            id:true,
            productThumbnail:true,
            productTitle:true,
            productDescription:true,
            productCost: true,
            onOffer:true
        }
       });
       if(!product){
        res.status(404).json({success:false,message:["product not found"]})
       }else{
        res.status(201).json(product)
       }
       
    } catch (e) {
        res.status(500).json({success:false,message:["product not found"]})
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
router.patch("/:id",async(req,res) =>{
    const {productThumbnail,productTitle,productDescription,productCost,onOffer}=req.body;
    const id=req.params.id;
    try {
        let updateUser;
        if(productTitle){
            updateUser = await prisma.products.update({
                where:{id:id},
                data:{productTitle:productTitle} 
            })
        }
        if(productThumbnail){
            updateUser = await prisma.products.update({
                where:{id:id},
                data:{productThumbnail:productThumbnail} 
            })
        }
        if(productDescription){
            updateUser = await prisma.products.update({
                where:{id:id},
                data:{productDescription:productDescription} 
            })
        }
        if(productCost){
            updateUser = await prisma.products.update({
                where:{id:id},
                data:{productCost:productCost} 
            })
        }
        if(onOffer){
            updateUser = await prisma.products.update({
                where:{id:id},
                data:{onOffer:onOffer} 
            })
        }
        res.status(200).json(updateUser);
    } catch (e) {
        res.status(500).json({success:false,message:["updating not successful"]})
    }
})
router.delete("/:id",async(req,res) =>{
    const id = req.params.id;
    try {
        const deleteProduct = await prisma.products.delete({
            where:{id:id}
        })
        res.status(200).json(deleteProduct)
    } catch (e) {
       res.status(500).json({success:false ,message:["user doesnt exist"]})
    }
})

export default router