import { Schema, model } from 'mongoose';


const TodoSchema: Schema<Todo> = new Schema({
    task: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    done:{
        type: Boolean,
        required: true,
        default:false
    },
    createdAt:{
        type: Date,
        required: true,
        default:Date.now,
    },
    updatedAt:{
        type: Date,
        required: true,
        default:Date.now,
    }
});

export default model<Todo>('TodoModel', TodoSchema, 'todos');