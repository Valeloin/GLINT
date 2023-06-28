const mongoose = require('mongoose');

// Lien avec MongoDB Atlas
mongoose.connect(
    "mongodb+srv://Mailys:10072004@cluster0.9liwm.mongodb.net/api?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true },
    (err) => {
        if(!err) console.log("Mongodb connected");
        else console.log("Connection " +err)
    }
)


