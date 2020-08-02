const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
SECRET_KEY = "thisismysecretkey";
var dbconfig = require('../config/db')
const common = require('../controller/common-Controller')

//Supplier Master
router.get('/Suppliers',verifyToken,(req,res,err)=>{
  let cond=req.query.id==undefined?'':" and id="+req.query.id;
  common.QueryExecute(req,"select * from tblsuppliers where isActive<>0"+cond).then(result=>{
    res.json(result);
  }).catch(err=>{
    console.log(err)
  })
});

router.get('/Suppliers/Auto',verifyToken,(req,res,err)=>{
  common.QueryExecute(req,"select ifnull(max(id),0)+1 as id from tblsuppliers").then(result=>{
    res.json(result);
  }).catch(err=>{
    console.log(err)
  })
});

router.post('/Suppliers/Add',verifyToken,(req,res,err)=>{
  let val=req.body;
  let qry="INSERT INTO tblsuppliers(`id`, `suppliername`, `address`, `phoneno`, `email`, `gstin`, `isActive`) VALUES (?,?,?,?,?,?,?)"
  let param=[val.id,val.suppliername,val.address,val.phoneno,val.email,val.gstin,1]

  common.QueryExecute(req,qry,param).then(result=>{
    common.LogData(val.userid,'Suppliers',val.id,'Add').then(res1=>{
        res.json(result);
    })
  }).catch(err=>{
    console.log(err)
  })
});

router.post('/Suppliers/Update',verifyToken,(req,res,err)=>{
  let val=req.body;
  let qry="Update tblsuppliers set `suppliername`=?, `address`=?, `phoneno`=?, `email`=?, `gstin`=? where id=?"
  let param=[val.suppliername,val.address,val.phoneno,val.email,val.gstin,val.id]
  if(val.action==='del') {
    qry ="Update tblsuppliers set isActive=0 where id=?"
    param=[val.id]
  }
    
  common.QueryExecute(req,qry,param).then(result=>{
    common.LogData(val.userid,'Suppliers',val.id,val.action).then(res1=>{
        res.json(result);
    })
  }).catch(err=>{
    console.log(err)
  })
});

//Customer Master
router.get('/Customers',verifyToken,(req,res,err)=>{
  let cond=req.query.id==undefined?'':" and id="+req.query.id;
  common.QueryExecute(req,"select * from tblcustomers where isActive<>0"+cond).then(result=>{
    res.json(result);
  }).catch(err=>{
    console.log(err)
  })
});

router.get('/Customers/Auto',verifyToken,(req,res,err)=>{
  common.QueryExecute(req,"select ifnull(max(id),0)+1 as id from tblcustomers").then(result=>{
    res.json(result);
  }).catch(err=>{
    console.log(err)
  })
});

router.post('/Customers/Add',verifyToken,(req,res,err)=>{
  let val=req.body;
  let qry="INSERT INTO tblcustomers(`id`, `customername`, `address`, `phoneno`, `email`, `isActive`) VALUES (?,?,?,?,?,?)"
  let param=[val.id,val.customername,val.address,val.phoneno,val.email,1]

  common.QueryExecute(req,qry,param).then(result=>{
    common.LogData(val.userid,'Customers',val.id,'Add').then(res1=>{
        res.json(result);
    })
  }).catch(err=>{
    console.log(err)
  })
});

router.post('/Customers/Update',verifyToken,(req,res,err)=>{
  let val=req.body;
  let qry="Update tblcustomers set `customername`=?, `address`=?, `phoneno`=?, `email`=? where id=?"
  let param=[val.customername,val.address,val.phoneno,val.email,val.id]
  if(val.action==='del') {
    qry ="Update tblcustomers set isActive=0 where id=?"
    param=[val.id]
  }
    
  common.QueryExecute(req,qry,param).then(result=>{
    common.LogData(val.userid,'Customers',val.id,val.action).then(res1=>{
        res.json(result);
    })
  }).catch(err=>{
    console.log(err)
  })
});

//Store Master
router.get('/Stores',verifyToken,(req,res,err)=>{
  let cond=req.query.id==undefined?'':" and id="+req.query.id;
  common.QueryExecute(req,"select * from tblstores where isActive<>0"+cond).then(result=>{
    res.json(result);
  }).catch(err=>{
    console.log(err)
  })
});

router.get('/Stores/Auto',verifyToken,(req,res,err)=>{
  common.QueryExecute(req,"select ifnull(max(id),0)+1 as id from tblstores").then(result=>{
    res.json(result);
  }).catch(err=>{
    console.log(err)
  })
});

router.post('/Stores/Add',verifyToken,(req,res,err)=>{
  let val=req.body;
  let qry="INSERT INTO tblstores(`id`, `storename`, `address`, `phoneno`, `email`, `gstin`, `registerdetails`, `isActive`) VALUES (?,?,?,?,?,?,?,?)"
  let param=[val.id,val.storename,val.address,val.phoneno,val.email,val.gstin,val.registerdetails,1]

  common.QueryExecute(req,qry,param).then(result=>{
    common.LogData(val.userid,'Stores',val.id,'Add').then(res1=>{
        res.json(result);
    })
  }).catch(err=>{
    console.log(err)
  })
});

router.post('/Stores/Update',verifyToken,(req,res,err)=>{
  let val=req.body;
  let qry="Update tblstores set `storename`=?, `address`=?, `phoneno`=?, `email`=?, `gstin`=?, `registerdetails`=? where id=?"
  let param=[val.storename,val.address,val.phoneno,val.email,val.gstin,val.registerdetails,val.id]
  if(val.action==='del') {
    qry ="Update tblstores set isActive=0 where id=?"
    param=[val.id]
  }
    
  common.QueryExecute(req,qry,param).then(result=>{
    common.LogData(val.userid,'Stores',val.id,val.action).then(res1=>{
        res.json(result);
    })
  }).catch(err=>{
    console.log(err)
  })
});

//Employee Master
router.get('/Employees',verifyToken,(req,res,err)=>{
  let cond=req.query.id==undefined?'':" and EmployeeSerial='"+req.query.id+"'";
  common.QueryExecute(req,"select * from tblemployees where isActive<>0"+cond).then(result=>{
    res.json(result);
  }).catch(err=>{
    console.log(err)
  })
});

router.get('/Employees/Auto',verifyToken,(req,res,err)=>{
  let resMsg={}
  let empserial=EmployeeSerial().then(res1=>{
    resMsg.empserial=res1
    resMsg.empid='E'+FormatNumberLength(res1,4);
    res.json(resMsg)
  });
});

router.post('/Employees/Add',verifyToken,(req,res,err)=>{
  let val=req.body;
  let qry="INSERT INTO tblemployees(`employeeid`, `employeeserial`, `employeename`, `designation`, `phoneno`, `email`, `password`, `isActive`) VALUES (?,?,?,?,?,?,?,?)"
  let param=[val.empid,val.empserial,val.empname,val.designation,val.phoneno,val.email,val.password,1]

  console.log(val)
  common.QueryExecute(req,qry,param).then(result=>{
    common.LogData(val.userid,'Employees',val.empserial,'Add').then(res1=>{
        res.json(result);
    })
  }).catch(err=>{
    console.log(err)
  })
});

router.post('/Employees/Update',verifyToken,(req,res,err)=>{
  let val=req.body;
  console.log(val)
  let qry="Update tblemployees set `employeename`=?, `designation`=?, `phoneno`=?, `email`=?, `password`=? where `employeeserial`=?"
  let param=[val.empname,val.designation,val.phoneno,val.email,val.password,val.empserial]
  if(val.action==='del') {
    qry ="Update tblemployees set isActive=0 where employeeserial=?"
    param=[val.empserial]
  }
    
  common.QueryExecute(req,qry,param).then(result=>{
        common.LogData(val.userid,'Employees',val.empserial,val.action).then(res1=>{
        res.json(result);
    })
  }).catch(err=>{
    console.log(err)
  })
});

router.post("/login", (req, res)=> {
  let val=req.body
  let cond=" and PASSWORD=? and (phoneno=? or email=?)"
  let param=[val.password,val.username,val.username]
  let resMsg={}
  common.QueryExecuteWOT("select * from tblemployees where isActive<>0"+cond,param).then(result=>{
    if(result.data.length>0)
    {
      let userdata=result.data[0]
      resMsg.userid=userdata.employeeserial
      resMsg.usertype=userdata.designation
      resMsg.username=userdata.employeename
      resMsg.usermobno=userdata.phoneno
      resMsg.useremail=userdata.email

      var token = jwt.sign({ data: resMsg }, SECRET_KEY, { expiresIn: "86400s" });
      res.json({status:'success',token:token, data:resMsg});
    } 
    else res.json({status:'failed',data:'Email/Password not exist..!!'})
  }).catch(err=>{
    console.log(err)
  })      
});

router.post("/addAdmin", (req, res, next) => {
  // console.log(req.body)
  adminActivity.RegisterAdmin(req.body, (err, count) => {
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});

//Overall Booking
router.get('/overallBooking',function(req,res,err){
 //let reqq=request.body;
 let reqq=req.query;
 let cond=""
 var itemss=  dbconfig.query("select * from vw_overallbookingstatus ",function(err,result,fields){
  if(err){
    res.json(err);
  }else{
    res.json(result);
  }  
});  
});

router.get('/test',(req,res)=>{
  var token = jwt.sign({ data: 'karthickk' }, SECRET_KEY, { expiresIn: "10s" });
  res.json(token);
})

function EmployeeSerial(){
    let qry="select ifnull(max(employeeserial),0)+1 as id from tblemployees";
    return common.QueryExecuteWOT(qry).then(res=>{
        return res.data[0].id;
      }).catch(err=>{
        console.log(err)
      })
  }

function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

function verifyToken(req,res,next) {
    const header=req.headers['auth'];
    if(typeof header!=='undefined')
    {
      req.token=header;
      next();
    }
    else
    {
      res.json({status:'failed',data:'Token failed'});
    }
  }
module.exports = router;
