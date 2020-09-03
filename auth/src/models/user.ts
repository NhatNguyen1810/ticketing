import mongoose from 'mongoose'; 
import {Password} from '../services/password'; 
// An interface that describes the properties 
// that are required for the User model

interface UserAttrs{
    email: string;
    password: string; 
}

interface UserModel extends mongoose.Model<any>{
    build(attrs: UserAttrs): any; 
}

// An interface that describes the properties 
// that User Document has 

interface UserDoc extends mongoose.Document{
    email: string;
    password: string; 
    
}


const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
    },
    password:{
        type: String, 
        required: true, 
    }
}, {
    toJSON: {
        transform(doc, ret){
            delete ret.password; 
        }
    }
});

userSchema.pre('save', async function(done){
    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password')); 
        this.set('password', hashed); 

    }
    done(); 
})
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs); 
}
const User = mongoose.model<UserDoc, UserModel>('User', userSchema); 


export {User};