const mongoose = require("mongoose");
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected To Database...");
  } catch (err) {
    console.error("Unable To Connect\nReason:" + err.message);
    process.exit(1);
  }
})();
