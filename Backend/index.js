import { app } from "./app.js";
import connectDB from "./Database_Connection/index.js";

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("Connection Error", error);
        throw error;
    });
    app.listen(process.env.PORT || 4027, () => {
        console.log(`Server running at port: http://localhost:${process.env.PORT || 4100}`)
    });
})
.catch((error) => {
    console.log("Failed to connect with MongoDB: ", error);
});