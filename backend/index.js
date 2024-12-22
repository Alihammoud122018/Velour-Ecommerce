const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { log } = require("console");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB 
mongoose.connect("mongodb+srv://ali:ali2005@cluster0.6xlhkn6.mongodb.net/e-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

// API Creation 
app.get("/", (req, res) => {
    res.send("Express app is Running");
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating Upload Endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

app.post('/addproduct', async (req, res) => {
    try {
        
        let lastProduct = await Product.findOne({}).sort({ id: -1 });
        let id = lastProduct ? lastProduct.id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            price: req.body.price,
        });

        await product.save();
        console.log("Product saved:", product);

        res.json({
            success: true,
            product: product,
        });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({
            success: false,
            message: "Failed to save product",
        });
    }
});

//API for Deleting Products

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("product removed");
    res.json({
        success:true,
        name:req.body.name,
    });
})

// API for Getting all Products

app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
    
})

// Schema for user model

    const Users= mongoose.model('Users',{
        name:{
            type:String,
        },
        email:{
            type:String,
            unique:true,
        },
        password:{
            type:String,
        },
        cartData:{
            type:Object,
        },
        date:{
            type:Date,
            default:Date.now,
        }
    })

// Creating Endpoint for registration

app.post('/signup',async(req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if (check){
        return res.status(400).json({success:false,errors:"existing user found with the same email address"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id: user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})

})

// Creating Endpoint for login

app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, errors: "Wrong Email or Password" });
        }
    } else {
        return res.json({ success: false, errors: "Wrong Email or Password" });
    }
});

//Creating middleware to Fetch User

    const fetchUser = async (req,res,next)=>{
        const token = req.header('auth-token');
        if (!token){
            res.status(401).send({erros:"Please authenticate using valid token"})
        }
        else{
            try{
                const data = jwt.verify(token,'secret_ecom');
                req.user = data.user;
                next();
            }catch(error) {
                res.status(401).send({errors:"Please authenticate using valid token"})
            }
        }

    }

//Creating Endpoint for Adding Products in Cart
app.post('/addtocart', fetchUser,async (req,res)=>{
    console.log("added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

//Creating Endpoint for Removing Products in Cart
app.post('/removefromcart', fetchUser, async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if (userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

//Creating Enpoint to Get Cart
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port, (error) => {
    if (!error) { 
        console.log("Server Running on port: " + port);
    } else {
        console.log("Error: " + error);
    }
});
