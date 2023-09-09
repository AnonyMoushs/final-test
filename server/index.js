const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const saltRounds = 10;
const secretKey = "SECRET-HAHAHA"
const app = express()
const PORT = 3001


const Login = require("./model/logins")

app.use(express.json());
app.use(cookieParser())
app.use(cors(

  {
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
  }

));

mongoose.connect("mongodb+srv://francesdonz23:password1234@auth.ywgtab4.mongodb.net/login?retryWrites=true&w=majority", {
  useNewUrlParser: true,
})



app.post("/reg", async (req, res) => {

  const full_name = req.body.full_name;
  const email_address = req.body.email_address;
  const password = req.body.password;

  // Hash the password
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const log = new Login({
      full_name: full_name,
      email_address: email_address,
      password: hashedPassword, // Store the hashed password
    });

    await log.save();
    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {

  const email_address = req.body.email_address;
  const password = req.body.password;

  // Find the user by email
  try {
    const user = await Login.findOne({ email_address });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If the credentials are valid, generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });
   

    // Set the token as a cookie for future authenticated requests
    res.cookie("token", token, { httpOnly: true });

    // Return a success message with the token
    res.status(200).json({ message: "Login successful", token });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Login failed" });


  }
});



const verifyUser = (req, res, next) => {

  const token  = req.cookies.token;

  if(!token) {

    return res.json({ message: 'Unauthorized' });

  } else {

    jwt.verify(token, secretKey, (err, decoded) => {

      if(err) {

        return res.json({message: "Token is not valid"})

      } else {

        req.userId = decoded.userId;
        next()

      }
    })
  }

}

app.get("/LoggedIn", verifyUser, (req, res) => {
  
  return res.json({Message: "Authorized"});

})





app.listen(PORT, () => {
  console.log("Port is running")
})