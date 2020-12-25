import { Router } from "express";
import { body } from "express-validator";
import multer from "multer";
import { validationErrorChecker } from "../core/error-handler";
import ProductModel from "../models/ProductModel";
// import { auth_check } from "../middleware/auth";
const auth_check = require("../middleware/auth")
const router = Router();

const storage = multer.diskStorage({
  // multer'll execute these functions whenever a file is received
  destination: (req, file, cb) => {
    // defines where the file should be saved
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    //defines how file should be named
    cb(null, new Date().toISOString() + "_" + file.originalname);
  },
});

const myFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // to accept a file
    cb(null, true);
  } else {
    // to reject a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // upto 5MB
  },
  fileFilter: myFilter,
});

router.get("/:_id", async (req, res) => {
  var a = await ProductModel.findById(req.params._id);
  res.json({ a });
});

router.get("/", auth_check, (req, res) => {
  ProductModel.find()
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post(
  "/",
  upload.single("productImage"),
  [
    body("productName", "Product name is must").exists(),
    body("price", "Price for the product").exists(),
    body("des", "Give some description of product").exists(),
  ],
  validationErrorChecker,
  async (req, res) => {
    console.log(`req: ${req.file}`);

    const productObj = new ProductModel();
    productObj.productName = req.body.productName;
    productObj.des = req.body.des;
    productObj.price = req.body.price;
    productObj.productImage = req.file.path;

    //  Each document can be saved to the database by calling its save method.
    await productObj
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Handling POST request of product",
          productcreated: productObj,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }
);

// router.delete("/:_id", (req, res) => {
//   ProductModel.remove({ _id: req.params._id })
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err });
//     });
// });

// router.post(
//   "/",
//   [
//     body("productName", "Product name is must").exists(),
//     body("price", "Price for the product").exists(),
//     body("des", "Give some description of product").exists(),
//   ],
//   validationErrorChecker,
//   (req, res) => {
//     const productObj = new ProductModel();
//     productObj.productName = req.body.productName;
//     productObj.des = req.body.des;
//     productObj.price = req.body.price;
//     productObj
//       .save()
//       .then((result) => {
//         console.log(result);
//         res.status(201).json({
//           message: "post request (the other way)",
//           newProduct: productObj,
//         });
//       })
//       .catch((err) => {
//         res.status(500).json({
//           error: err,
//         });
//       });
//   }
// );

export default router;
