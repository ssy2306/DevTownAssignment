const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const sort =  async (req, res) => {
    try {
        const pageNo = req.body.pageNo
        const pageSize = req.body.pageSize
        const account_id = req.body.id || req.session.user.account_id;
    if (!account_id) {
      res
        .status(200)
        .send({ success: false, message: "Send account_id as necessary", data: req.body });
      return;
    }

        if(!pageNo || !pageSize)
        {
            res.status(200).send({success:false,message:"page number and page size not sent correctly",data:req.body})
            return
        }
        const sortBy = req.body.sortBy
        const entry = (pageNo-1)*pageSize
        const sort = Object.keys(sortBy)[0]
        var by = Object.values(sortBy)[0]
        if(!sort || !by)
        {
            res.status(200).send({success:false,message:"SortBy not sent correctly",data:req.body})
            return
        }
        if(by!="asc" && by!="desc") by="asc"
         order = await prisma.foodDetails.findMany({
            where : {
                fk_account_id : account_id
            },
            orderBy : {
                [sort] : by
            },
            skip:entry,
            take:pageSize
    });

        if (order.length===0) {
            res.status(200).send({success:false,message:"NONE EXISTS", data:req.body})
            return
        }

        res.status(200).send({success:true,message:"Food Sorted",data:order})
    }
    catch (error) {
         console.log(error)
        res.status(200).send({success:false,message:"Error in fetching Food Details", data:error})
    }finally {
        await prisma.$disconnect();
    }
}

module.exports = sort