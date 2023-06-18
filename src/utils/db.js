import mongoose from 'mongoose';

// const connect = async () => {
//     try {
//         mongoose.set('strictQuery', false);
//         await mongoose.connect(process.env.MONGO, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected');
//     } catch (error) {
//         console.log(error);
//         throw new Error('MongoDB connection failed');
//     }
// };

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
    isConnected: 0,
};

export const connect = async () => {
    if (mongoConnection.isConnected) {
        console.log('MongoDB alredy connected');
        return;
    }

    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if (mongoConnection.isConnected === 1) {
            console.log('Using previous connection');
            return;
        }

        await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGO || '');
    mongoConnection.isConnected = 1;
    console.log('MongoDB Connected:', process.env.MONGO);
};

export const disconnect = async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    } catch (error) {
        console.log(error);
        throw new Error('MongoDB disconnect failed');
    }
};
