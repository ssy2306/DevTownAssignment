const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const filter_all =  async (req, res) => {
    try {
        const pageNo = req.body.pageNo
        const pageSize = req.body.pageSize
        const account_id = req.body.id || req.session.user.account_id;
        const details=[]
        
        const entry = (pageNo-1)*pageSize
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
        const order = await prisma.foodDetails.findMany({
            where : {
                fk_account_id : account_id
            },
            skip:entry,
            take:pageSize
    });

        if (order.length===0) {
            res.status(200).send({success:false,message:"NONE EXISTS", data:req.body})
            return
        }

        res.status(200).send({success:true,message:"Food details",data:order})
    }
    catch (error) {
         console.log(error)
        res.status(200).send({success:false,message:"Error in fetching Food details", data:error})
    }finally {
        await prisma.$disconnect();
    }
}

module.exports = filter_all