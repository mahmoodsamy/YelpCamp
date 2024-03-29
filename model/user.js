import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: 'string',
        required: true,
        unique: true
    }
})

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);
