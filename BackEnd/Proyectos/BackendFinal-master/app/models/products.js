// const mongoose = require("mongoose");
// const ContainerMongoose = require("../persistance/mongoose")

// const ProductScheme = new mongoose.Schema(
//     {
//       title: { type: String, unique: true , required: true },
//       thumbnail: { type: String, required: true },
//       price: { type: Number, required: true },
//       description: {type: String, required: true},
//       category: {type: String, required: true}
//     },
//     { timestamp: true, __v: false }
//   );
  
//   const model = mongoose.model('products', ProductScheme);

//   class MongooseProducts extends ContainerMongoose {
//     constructor() {
//       super(model);
//     }
//   }
  
//   module.exports = MongooseProducts;
  