const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const low_filter =  async (req, res) => {
    try {
        //receiving inputs from request
        const pageNo = req.body.pageNo
        const pageSize = req.body.pageSize
        const table1=req.body.table1 || null;
        const filterBy = req.body.filterBy
        const entry = (pageNo-1)*pageSize
        const filter = Object.keys(filterBy)[0]
        var by = Object.values(filterBy)[0]

        //if pageno. or page size doesn't exist
        if(!pageNo || !pageSize)
        {
            res.status(200).send({success:false,message:"page number and page size not sent correctly",data:req.body})
            return
        }
        // if filter or asc/desc doesn't exist
        if(!filter || !by)
        {
            res.status(200).send({success:false,message:"FilterBy not sent correctly",data:req.body})
            return
        }
        //if by has a value other than asc/desc then we assign it asc by default
        if(by!="asc" && by!="desc") by="asc";
        
        // to get values from first table
        const order1 = await prisma.foodDeatils.findMany({
            skip:entry,
            take:pageSize
        });

        if (order1.length===0) {
            res
                .status(200)
                .send({success:false,message:"NO ORDER DETAILS EXISTS", 
                data:req.body})
            return
        }

        res
            .status(200)
            .send({success:true,message:"ORDER DETAILS",
            data:{order1}
        });
    }
    catch (error) {
         console.log(error)
        res.status(200).send({success:false,message:"Error in fetching ORDER DETAILS", data:error})
    }finally {
        await prisma.$disconnect();
    }
}

module.exports = low_filter;