var db = require("../configure/connection");
var collections = require("../configure/collections");
var bcrypt = require("bcrypt");

module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);

      db.get()
        .collection(collections.USER_COLLECTION)
        .insertOne(userData)
        .then((data) => {
          console.log("djddk");
          console.log(data);
          resolve(data);
        });
    });
  },
 
  doLogin:  (userData) => {
    return new Promise(async(resolve,reject)=>{

  
    // console.log("erf");
    let loginStatus = false;
    let response = {};
    let user =await db.get().collection(collections.USER_COLLECTION).findOne({ Email: userData.Email });
    if (user) {
        // console.log(user);
      bcrypt.compare(userData.password, user.password).then((status) => {
    //    console.log(status);
        if (status) {
          console.log("login success");
       
          response.user=user
        //   console.log(user +"c");
          response.status=true
          resolve(response)
        } else {
          console.log("login failed");
          resolve({status:false})
        }
      });
    } else {
      console.log("login failed");
      resolve({status:false})
    }
})
  },
};

