import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Option text is required'],
    trim: true,
  },
  votes: { type: Number, default: 0 },
  link_to_vote: String,
});

export const OptionModel = mongoose.model('Option', optionSchema);
