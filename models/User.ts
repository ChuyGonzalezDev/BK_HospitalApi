import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document {    
    name: string;
    email: string;
    password: string;
    status?: boolean;
};

const UserSchema: Schema = new Schema({       
    name: { type: String, required: [true, 'El nombre es obligatorios'] },
    email: { type: String, required: [true, 'El correo es obligatorio'], unique: true },    
    password: { type: String, required: true},
    status: { type: Boolean }
});

UserSchema.methods.toJSON = function() {        
    const { __v, _id, password, ...user } = <IUser>this.toObject();    
    user.id = _id;        
    return user;
};

/** Exporta el modelo y devuelve su interfaz IUser */
export default mongoose.model<IUser>('User', UserSchema);