


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middleWare



async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const database = client.db("MedicalCampDB");
        const campsCollection = database.collection("camps");
        const joinedParticipantsCollection = database.collection("joinedParticipants");
        const paymentCollection = database.collection("ParticipantPayments");
        const reviewCollection = database.collection("reviews");
        const upcomingCampsCollection = database.collection("upcomingCamps");
        const growingParticipantsCollection = database.collection("growingParticipants");
        const interestedProfessionals = database.collection("interestedProfessionals");




        app.get("/upcomingCamps/:email", async (req, res) => {

            const getOrgEmail = req.params.email;
            console.log(getOrgEmail)

            const query = { email: getOrgEmail }

            const result = await upcomingCampsCollection.find(query).toArray();

            res.send(result);

        })
        app.get("/growingParticipants", async (req, res) => {

            const cursor = growingParticipantsCollection.find();
            const result = await cursor.toArray();
            console.log(result)
            res.send(result)

        })
        app.get("/interestedProfessionals", async (req, res) => {

            const cursor = interestedProfessionals.find();
            const result = await cursor.toArray();
            console.log(result)
            res.send(result)

        })
        app.get("/registeredCamps", async (req, res) => {

            const cursor = joinedParticipantsCollection.find();
            const result = await cursor.toArray();
            console.log(result)
            res.send(result)

        })
        app.get("/registeredCamps/:email", async (req, res) => {

            const getOrgEmail = req.params.email;
            console.log(getOrgEmail)

            const query = { 'campData.email': getOrgEmail }

            const result = await joinedParticipantsCollection.find(query).toArray();

            res.send(result);

        })
        app.post("/camps", async (req, res) => {

            const campsData = req.body;
            const result = await campsCollection.insertOne(campsData);
            res.send(result);
        })
        app.post("/upcomingCamps", async (req, res) => {

            const campsData = req.body;
            const result = await upcomingCampsCollection.insertOne(campsData);
            res.send(result);
        })
        app.get("/camps/:email", async (req, res) => {

            const getUserEmail = req.params.email;


            const query = { email: getUserEmail }

            const result = await campsCollection.find(query).toArray();

            res.send(result);

        })
        app.get("/camp/:id", async (req, res) => {

            // console.log("get category: ", req.params.id)
            const getCampId = req.params.id;


            const query = { _id: new ObjectId(getCampId) }

            const result = await campsCollection.find(query).toArray();

            res.send(result);

        })

        app.get("/details/:id", async (req, res) => {

            // console.log("get category: ", req.params.id)
            const getCampId = req.params.id;


            const query = { _id: new ObjectId(getCampId) }

            const result = await campsCollection.find(query).toArray();

            res.send(result);

        })
        app.get("/upcomingDetails/:id", async (req, res) => {

            // console.log("get category: ", req.params.id)
            const getCampId = req.params.id;


            const query = { _id: new ObjectId(getCampId) }

            const result = await upcomingCampsCollection.find(query).toArray();

            res.send(result);

        })

        app.get("/registeredUser/:email", async (req, res) => {

            // console.log("get category: ", req.params.id)
            const getUserEmail = req?.params?.email;
            console.log(getUserEmail)

            const query = { email: getUserEmail }

            const result = await joinedParticipantsCollection.find(query).toArray();

            res.send(result);

        })
        app.get("/paidUser/:email", async (req, res) => {

            // console.log("get category: ", req.params.id)
            const getUserEmail = req?.params?.email;
            console.log(getUserEmail)

            const query = { email: getUserEmail }

            const result = await paymentCollection.find(query).toArray();

            res.send(result);

        })
        app.get("/interestedProfessionals/:email", async (req, res) => {

            // console.log("get category: ", req.params.id)
            const getUserEmail = req?.params?.email;
            console.log(getUserEmail)

            const query = { email: getUserEmail }

            const result = await interestedProfessionals.find(query).toArray();

            res.send(result);

        })


        app.post("/joinedParticipants", verifyToken, async (req, res) => {

            const joinedParticipantsData = req.body;
            const result = await joinedParticipantsCollection.insertOne(joinedParticipantsData);
            res.send(result);
        })
        app.post("/growingParticipants", verifyToken, async (req, res) => {

            const joinedParticipantsData = req.body;
            const result = await growingParticipantsCollection.insertOne(joinedParticipantsData);
            res.send(result);
        })
        app.post("/interestedProfessionals", verifyToken, async (req, res) => {

            const interestedProfessionalsData = req.body;
            const result = await interestedProfessionals.insertOne(interestedProfessionalsData);
            res.send(result);
        })

        app.post("/reviews", async (req, res) => {

            const reviewsData = req.body;
            const result = await reviewCollection.insertOne(reviewsData);
            res.send(result);
        })
        app.get("/reviews", async (req, res) => {

            const cursor = reviewCollection.find();
            const result = await cursor.toArray();

            res.send(result)

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
                    successStory: updated.success,
                    certification: updated.certification,
                    specialty: updated.specialty


                },
            };

            const result = await userCollection.updateOne(filter, updateBlog, options);

            res.send(result);
        })
        app.put("/updateCamps/:id", async (req, res) => {

            const updatedCampId = req.params.id;
            const updated = req.body;

            // console.log("blog to update", updatedBlogId)

            const filter = { _id: new ObjectId(updatedCampId) }

            const options = { upsert: true };

            const updateBlog = {
                $set: {
                    CampName: updated.CampName,
                    CampFees: updated.CampFees,
                    ScheduledDateTime: updated.ScheduledDateTime,
                    Venue: updated.Venue,
                    Location: updated.Location,
                    SpecializedServices: updated.SpecializedServices,
                    HealthcareProfessionals: updated.HealthcareProfessionals,
                    TargetAudience: updated.TargetAudience,
                    Description: updated.Description,
                    email: updated.email




                },
            };

            const result = await campsCollection.updateOne(filter, updateBlog, options);

            res.send(result);
        })


        app.delete("/joinedParticipants/:id", async (req, res) => {


            const deleteItem = req.params.id;

            const query = { _id: new ObjectId(deleteItem) };

            const result = await joinedParticipantsCollection.deleteOne(query);
            res.send(result)



        });
        app.delete("/camps/:id", async (req, res) => {


            const deleteItem = req.params.id;

            const query = { _id: new ObjectId(deleteItem) };

            const result = await campsCollection.deleteOne(query);
            res.send(result)



        });
        app.delete("/deleteGrowingParticipants/:id", async (req, res) => {


            const deleteItem = req.params.id;

            const query = { _id: new ObjectId(deleteItem) };

            const result = await growingParticipantsCollection.deleteOne(query);
            res.send(result)



        });
        app.delete("/upcoming/:id", async (req, res) => {


            const deleteItem = req.params.id;

            const query = { _id: new ObjectId(deleteItem) };

            const result = await upcomingCampsCollection.deleteOne(query);
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
        app.patch("/confirmRegistration/:id", async (req, res) => {


            const adminUser = req.params.id;

            const query = { _id: new ObjectId(adminUser) };

            const updateDoc = {
                $set: {

                    status: 'Confirmed'

                }
            }
            const result = await joinedParticipantsCollection.updateOne(query, updateDoc);
            res.send(result)
        });
        app.patch("/updateParticipantsCount/:id", async (req, res) => {


            const campId = req.params.id;

            const query = { _id: new ObjectId(campId) };

            const camp = await campsCollection.findOne(query);
            const currentParticipants = parseInt(camp.Participants, 10);

             if (!isNaN(currentParticipants)) {
            const updatedParticipants = currentParticipants + 1;

            const updateDoc = {
                $set: {
                    Participants: updatedParticipants.toString(), // Convert back to string for storage
                },
            };
            const result = await campsCollection.updateOne(query, updateDoc);
            res.send(result);
        } else {
            res.status(400).send("Participants count is not a valid number");
        }
        });

        app.patch("/acceptProfessional/:id", async (req, res) => {


            const getId = req.params.id;

            const query = { _id: new ObjectId(getId) };

            const updateDoc = {
                $set: {

                    status: 'Accepted'

                }
            }

            const result = await interestedProfessionals.updateOne(query, updateDoc);
            res.send(result)



        });
        app.patch("/cancelRegistration/:id", async (req, res) => {


            const adminUser = req.params.id;

            const query = { _id: new ObjectId(adminUser) };

            const updateDoc = {
                $set: {

                    status: 'Cancelled'

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
        // await client.db("admin").command({ ping: 1 });
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