import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const port = 3001;
const app = express();

app.use(cookieParser())
app.use(express.json())

mongoose.connect(
    'mongodb+srv://dianalyutaya12_db_user:6zv&pQgS3GqV@cluster0.tckqa1m.mongodb.net/notes?appName=Cluster0'
).then(() => {
    app.listen(port, () => {
        console.log(`server started on port ${port}`)
    })
})