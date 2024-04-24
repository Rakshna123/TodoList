var user = require("../Modal/userSchema");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTA1MDg5MjF9.ee5tgvMUF_AjJ2oV4OrtnrI3IdHiLpX1ZEE-9H905B8";
    
exports.signup = async(req,res)=>{
    const {username,password,email}=req.body

try{
    const existUser = await user.findOne({email:email})
    if(existUser){
       return res.status(400).json({message:"User already exists"});
    }
    const hashPassword = await bcrypt.hash(password,10);
    const result = await user.create({
        username:username,
        email:email,
        password:hashPassword
    });
    res.status(201).json(result);
}
catch(error) {
    // console.log(error);
    res.status(500).json({message: "Something went wrong"})
}
}

exports.signin = async(req,res)=>{
    const{email,password} = req.body;
try{
    const signedin = await user.findOne({email:email});
    if(!signedin){
        return res.status(404).json({message:"User not found"});
    }
    
    const passwordMatch = await bcrypt.compare(password, signedin.password);
    if(!passwordMatch){
        return res.status(400).json({message:"Invalid password"});
    }
    const token = jwt.sign({ email: signedin.email, id: signedin._id},SECRET_KEY );
    res. status(201). json({user:signedin, token: token});
}catch(error){

    res.status (500).json({message: "Something went wrong"})
} 
}
