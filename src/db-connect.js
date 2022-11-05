import debug from 'debug'
import mongoose from 'mongoose'

const print = debug('db')

async function dbConnect(dbName, dbUser, dbPassword) {
    // mongoose.set('useNewUrlParser', true);
    // mongoose.set('useFindAndModify', false);
    // mongoose.set('useCreateIndex', true);
    // mongoose.set('useUnifiedTopology', true);

    try {
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.uj68u.mongodb.net/${dbName}?retryWrites=true&w=majority`)
        print('::: Connected to the database successfully.')
    }
    catch (reason) {
        print('::: Could not connected to the database!', reason)
    }
}

export default dbConnect
