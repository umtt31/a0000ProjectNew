const mongoose = require('mongoose')
const NewModel = require('./models/news')

// Database Conection
mongoose.connect('mongodb://127.0.0.1:27017/a0000ProjectNew', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const clean = async () => {
    await NewModel.deleteMany({})
    console.log('Done')
}

clean()
