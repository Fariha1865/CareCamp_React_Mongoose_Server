const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middleWare

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());

const verifyToken = (req, res, next) => {
    // const token = req?.cookies?.token;

    // console.log(req.headers)

    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Unauthorized Access' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized Access' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log("error token")
            return res.status(401).send({ message: 'Unauthorized Access' });
        }

        console.log("from verifyToken")
        req.decoded = decoded;
        next();

    })

}




const uri = "mongodb+srv://coffeeUser:aTtr92UlSVyRtSqY@cluster0.5jqcqmr.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const database = client.db("MedicalCampDB");
        const campsCollection = database.collection("camps");
        const reviewsCollection = database.collection("reviews");
        const cartCollection = database.collection("cart");
        const userCollection = database.collection("users");
        const joinedParticipantsCollection = database.collection("joinedParticipants");
        const paymentCollection = database.collection("ParticipantPayments")


        // use verify admin after verifyToken
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            
            const query = { email: email };
            const user = await userCollection.findOne(query);


            const isAdmin = user?.role === 'admin';
            console.log("verifyAdmin" + isAdmin)
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
        }
        app.post("/jwt", async (req, res) => {

            const user = req.body;
            console.log("logging In" + JSON.stringify(user));


            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });


            res.send(token);

        })
        app.post("/logout", async (req, res) => {

            const user = req.body;
            // console.log("logging out" + user);

            res.clearCookie('token', { maxAge: 0, sameSite: 'none', secure: true })
                .send({ success: true })

        })


        app.get("/camps", async (req, res) => {

            const cursor = campsCollection.find();
            const result = await cursor.toArray();
            console.log(result)
            res.send(result)

        })
        app.get("/details/:id", async (req, res) => {

            // console.log("get category: ", req.params.id)
            const getCampId = req.params.id;
          

                const query = { _id: new ObjectId(getCampId) }

                const result = await campsCollection.find(query).toArray();
             
                res.send(result);
          
        })
        app.get("/user/:email", async (req, res) => {

            // console.log("get category: ", req.params.id)
            const getUserEmail = req?.params?.email;
          console.log(getUserEmail)

                const query = {email: getUserEmail }

                const result = await userCollection.find(query).toArray();
              
                res.send(result);
          
        })
        app.get("/registeredUser/:email", async (req, res) => {

            // console.log("get category: ", req.params.id)
            const getUserEmail = req?.params?.email;
          console.log(getUserEmail)

                const query = {email: getUserEmail }

                const result = await joinedParticipantsCollection.find(query).toArray();
              
                res.send(result);
          
        })


        app.post("/joinedParticipants",verifyToken, async (req, res) => {

            const joinedParticipantsData = req.body;
            const result = await joinedParticipantsCollection.insertOne(joinedParticipantsData);
            res.send(result);
        })
        app.put("/user/:email", async (req, res) => {

            const updatedUserEmail = req.params.email;
            const updated = req.body;

            // console.log("blog to update", updatedBlogId)

            const filter = { email: updatedUserEmail }

            const options = { upsert: true };

            const updateBlog = {
                $set: {
                    name: updated.name,
                    phone: updated.phone,
                    gender: updated.gender,
                    interest: updated.interest,
                    age: updated.age,
                    

                },
            };

            const result = await userCollection.updateOne(filter, updateBlog, options);

            res.send(result);
        })


        app.delete("/joinedParticipants/:id", async (req, res) => {


            const deleteItem = req.params.id;

            const query = { _id: new ObjectId(deleteItem) };

            const result = await joinedParticipantsCollection.deleteOne(query);
            res.send(result)



        });


        //Payment............

        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body;
            const amount = parseInt(price * 100);
            // console.log(amount, 'amount inside the intent')
      
            const paymentIntent = await stripe.paymentIntents.create({
              amount: amount,
              currency: 'usd',
              payment_method_types: ['card']
            });
      
            res.send({
              clientSecret: paymentIntent.client_secret
            })
          });

          app.post('/payments', async (req, res) => {
            const payment = req.body;
            const paymentResult = await paymentCollection.insertOne(payment);
            res.send(paymentResult);
          })

          app.patch("/joinedParticipants/:id", async (req, res) => {


            const adminUser = req.params.id;

            const query = { _id: new ObjectId(adminUser) };

            const updateDoc = {
                $set: {

                    payment: 'Paid'

                }
            }

            const result = await joinedParticipantsCollection.updateOne(query, updateDoc);
            res.send(result)



        });













        app.post("/users", async (req, res) => {

            const userInfo = req.body;
            const query = { email: userInfo.email }
            const userExists = await userCollection.findOne(query);
            if (userExists) {
                return res.send({ message: "User Already Exists", insertedId: null })
            }
            const result = await userCollection.insertOne(userInfo);
            res.send(result);
        })


        // Admin API's
        app.get("/users", async (req, res) => {

            console.log("users" + req.decoded?.email)
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result)

        })

        app.delete("/users/:id", async (req, res) => {


            const deleteUser = req.params.id;

            const query = { _id: new ObjectId(deleteUser) };

            const result = await userCollection.deleteOne(query);
            res.send(result)



        });


        // app.get('/users/admin/:email', verifyToken, async (req, res) => {
        //     const email = req.params.email;
        //     console.log("decoded:" + req.decoded?.email);
        //     if (email !== req.decoded?.email) {
        //         return res.status(403).send({ message: 'forbidden access' })
        //     }

        //     const query = { email: email };
        //     const user = await userCollection.findOne(query);
        //     let admin = false;
        //     if (user) {
        //         admin = user?.role === 'admin';
        //     }
        //     res.send({ admin });
        // })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("Bistro Boss Running")
})

app.listen(port, () => {


})