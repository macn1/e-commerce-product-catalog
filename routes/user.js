const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
var userHelper = require('../helpers/user-helpers')

// const verifyLogin = (req,res,next)=>{
//   if (req.session.loggedin) {
//     next() 
//   }
//   res.redirect('login')
// }

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = req.session.user
  console.log(user);
  productHelper.getAllProducts().then((products)=>{
    console.log(products);
    res.render("user/view-products", {  products,user });
  })

});

router.get('/login',(req,res,next)=>{

  // console.log(req.session.loginErr,'aaaaaaaaaaa'); 
  res.render('user/login')

  
})

router.get('/signup',(req,res,next)=>{

  res.render('user/signup')
  
})

router.post('/signup',(req,res)=>{
  // console.log(req.body);
  userHelper.doSignup(req.body).then((response)=>{
    console.log("kk");
    console.log(response);
  })
  res.redirect('/login')



})
router.post('/login',(req,res)=>{
  // console.log("ww");
  userHelper.doLogin(req.body).then((response)=>{
    console.log(response);
    if (response.status) {
      req.session.loggedin=true;
      req.session.user=response.user
      res.redirect('/')
      
    }else{
      req.session.loginErr="invalid username or password";
      res.redirect('/login')
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})
router.get('/cart',verifyLogin,(req,res)=>{
  res.render('user/cart')
})

router.get("/add-products", (req, res) => {
  res.render('user/add-products') 
  
});
router.post("/add-products",(req,res)=>{
  let image = req.files.Image;
  // console.log(image);
  // console.log(req.files.image);
  productHelper.addProduct(req.body, () => {
    
    
    res.redirect('user/add-products') 
  });
});



module.exports = router;
