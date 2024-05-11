import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }],
});

export const QuestionModel = mongoose.model('Question', questionSchema);
