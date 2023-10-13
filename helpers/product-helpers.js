var db = require("../configure/connection")
var collections = require("../configure/collections")
 

module.exports ={
    addProduct:(product,callback)=>{
     
        db.get().collection('product').insertOne(product).then((data)=>{
            console.log(data);
            callback(data.insertedId)

        })
    }
   
 
}
