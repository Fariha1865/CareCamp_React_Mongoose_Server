const express = require('express');
const applyMiddleware = require('../middlewares/applyMiddlewares');
const connectDB = require('../db/connectDB');
const app = express();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { model } = require("mongoose");
const upcomingCampsCollection = require("../lib/upcomingCampsModel");
const popularCampsCollection = require("../lib/models");
const userCollection = require("../lib/userModel");

const joinedParticipantsCollection = model("joinedParticipants",{},"joinedParticipants",{ versionKey: false })
const paymentCollection = model("ParticipantPayments",{},"ParticipantPayments",{ versionKey: false })
const reviewCollection = model("reviews",{},{ versionKey: false })
const growingParticipantsCollection = model("growingParticipants",{},"growingParticipants",{ versionKey: false })
const interestedProfessionals = model("interestedProfessionals",{},"interestedProfessionals",{ versionKey: false })
const verifyToken = require('../middlewares/verifyToken');

const port = process.env.PORT || 5000;

const authenticationRoutes = require("../routes/authentication/index");
const userData = require("../routes/getUserData/index")
const popularData=require("../routes/popularCamps/index")
const availableCampsData = require("../routes/getAvailableCamps/index")
const upcomingCampsData = require("../routes/upcomingCamps/index");





applyMiddleware(app)

app.use(authenticationRoutes)
app.use(userData)
app.use(popularData)
app.use(availableCampsData)
app.use(upcomingCampsData)

app.get("/upcomingCamps/:email", async (req, res) => {

    const getOrgEmail = req.params.email;
    console.log(getOrgEmail)

    const query = { email: getOrgEmail }

    const result = await upcomingCampsCollection.find(query);

    res.send(result);

})
app.get("/growingParticipants", async (req, res) => {

    const cursor = growingParticipantsCollection.find();
    const result = await cursor;
    console.log(result)
    res.send(result)

})
app.get("/interestedProfessionals", async (req, res) => {

    const cursor = interestedProfessionals.find();
    const result = await cursor;
    console.log(result)
    res.send(result)

})
app.get("/registeredCamps", async (req, res) => {

    const cursor = joinedParticipantsCollection.find();
    const result = await cursor;
    console.log(result)
    res.send(result)

})
app.get("/upcomingDetails/:id", async (req, res) => {
    try {
        const getCampId = req.params.id;

        const result = await upcomingCampsCollection.findById(getCampId).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.get("/registeredCamps/:email", async (req, res) => {

    const getOrgEmail = req.params.email;
    console.log(getOrgEmail)

    const query = { 'campData.email': getOrgEmail }

    const result = await joinedParticipantsCollection.find(query);

    res.send(result);

})
app.post("/camps", async (req, res) => {
    try {
        const campsData = req.body;
        const result = await popularCampsCollection.create(campsData);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/upcomingCamps", async (req, res) => {
    try {
        const campsData = req.body;
        const result = await upcomingCampsCollection.create(campsData);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.get("/camps/:email", async (req, res) => {

    const getUserEmail = req.params.email;


    const query = { email: getUserEmail }

    const result = await popularCampsCollection.find(query);

    res.send(result);

})
app.get("/camp/:id", async (req, res) => {
    try {
        const getCampId = req.params.id;

        const result = await popularCampsCollection.findById(getCampId).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/details/:id", async (req, res) => {
    try {
        const getCampId = req.params.id;

        const result = await popularCampsCollection.findById(getCampId).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.get("/registeredUser/:email", async (req, res) => {

    // console.log("get category: ", req.params.id)
    const getUserEmail = req?.params?.email;
    console.log(getUserEmail)

    const query = { email: getUserEmail }

    const result = await joinedParticipantsCollection.find(query);

    res.send(result);

})
app.get("/paidUser/:email", async (req, res) => {

    // console.log("get category: ", req.params.id)
    const getUserEmail = req?.params?.email;
    console.log(getUserEmail)

    const query = { email: getUserEmail }

    const result = await paymentCollection.find(query);

    res.send(result);

})
app.get("/interestedProfessionals/:email", async (req, res) => {

    // console.log("get category: ", req.params.id)
    const getUserEmail = req?.params?.email;
    console.log(getUserEmail)

    const query = { email: getUserEmail }

    const result = await interestedProfessionals.find(query);

    res.send(result);

})



app.post("/joinedParticipants", verifyToken, async (req, res) => {
    try {
        const joinedParticipantsData = req.body;
        const result = await joinedParticipantsCollection.create(joinedParticipantsData);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/growingParticipants", verifyToken, async (req, res) => {
    try {
        const growingParticipantsData = req.body;
        const result = await interestedProfessionals.create(growingParticipantsData);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/interestedProfessionals", verifyToken, async (req, res) => {
    try {
        const interestedProfessionalsData = req.body;
        const result = await interestedProfessionals.create(interestedProfessionalsData);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/reviews", async (req, res) => {

    const reviewsData = req.body;
    const result = await reviewCollection.insertOne(reviewsData);
    res.send(result);
})
app.get("/reviews", async (req, res) => {

    const cursor = reviewCollection.find();
    const result = await cursor;

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
    try {
        const updatedCampId = req.params.id;
        const updated = req.body;

        const result = await PopularCamp.findByIdAndUpdate(updatedCampId, {
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
            }
        }, { upsert: true, new: true }).exec();

        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete("/joinedParticipants/:id", async (req, res) => {
    try {
        const deleteItem = req.params.id;
        const result = await JoinedParticipant.findByIdAndDelete(deleteItem).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete("/camps/:id", async (req, res) => {
    try {
        const deleteItem = req.params.id;
        const result = await popularCampsCollection.findByIdAndDelete(deleteItem).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.delete("/deleteGrowingParticipants/:id", async (req, res) => {
    try {
        const deleteItem = req.params.id;
        const result = await growingParticipantsCollection.findByIdAndDelete(deleteItem).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete("/upcoming/:id", async (req, res) => {
    try {
        const deleteItem = req.params.id;
        const result = await upcomingCampsCollection.findByIdAndDelete(deleteItem).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
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
    try {
        const adminUser = req.params.id;
        const updateDoc = { $set: { payment: 'Paid' } };
        const result = await joinedParticipantsCollection.findByIdAndUpdate(adminUser, updateDoc, { new: true }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.patch("/confirmRegistration/:id", async (req, res) => {
    try {
        const adminUser = req.params.id;
        const updateDoc = { $set: { status: 'Confirmed' } };
        const result = await joinedParticipantsCollection.findByIdAndUpdate(adminUser, updateDoc, { new: true }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.patch("/updateParticipantsCount/:id", async (req, res) => {
    try {
        const campId = req.params.id;

        const camp = await popularCampsCollection.findOne({ _id: campId }).exec();
        if (!camp) {
            return res.status(404).send("Camp not found");
        }

        const currentParticipants = parseInt(camp.Participants, 10);

        if (!isNaN(currentParticipants)) {
            const updatedParticipants = currentParticipants + 1;

            const result = await popularCampsCollection.updateOne(
                { _id: campId },
                { $set: { Participants: updatedParticipants.toString() } }
            ).exec();

            res.send(result);
        } else {
            res.status(400).send("Participants count is not a valid number");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.patch("/acceptProfessional/:id", async (req, res) => {
    try {
        const getId = req.params.id;

        const result = await interestedProfessionals.findByIdAndUpdate(getId, { status: 'Accepted' }).exec();
        
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.patch("/cancelRegistration/:id", async (req, res) => {
    try {
        const adminUserId = req.params.id;

        const result = await joinedParticipantsCollection.findByIdAndUpdate(adminUserId, { status: 'Cancelled' }).exec();
        
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
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
    const result = await cursor;
    res.send(result)

})

app.delete("/users/:id", async (req, res) => {


    const deleteUser = req.params.id;

    const query = { _id: new ObjectId(deleteUser) };

    const result = await userCollection.deleteOne(query);
    res.send(result)



});








app.get("/", (req, res) => {

  
    res.send("CareCamp Running")
   
})

app.all("*",(req,res,next)=>{
    const error = new Error(`the requested url is invalid : [${req.url}]`)
    error.status = 404
    next(error)
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
        message:err.message
    })
})









const main = async () =>{

     await connectDB()
     app.listen(port, () => {

        console.log(`CareCamp server is running on port ${port}`)
    
    })
}

main()