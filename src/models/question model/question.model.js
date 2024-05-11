import { OptionModel } from '../option model/option.schema.js';
import { QuestionModel } from './question.schema.js';

// add question database.
export const addQuestionRepo = async (title, io) => {
  try {
    // create a new question document
    const question = new QuestionModel({ title });
    // save the document into DB
    await question.save();
    io.emit('newQuestion', question);
    return { success: true, res: question };
  } catch (error) {
    return { success: false, res: error };
  }
};

// add option to options collection and to the options array in question document whose id is given.

export const addOptionToQuestionRepo = async (id, text, io) => {
  try {
    // create a new option document
    const option = new OptionModel({ text });
    // using the document._id we can create a link
    const link_to_vote = `http://localhost:3000/options/${option._id.toString()}/add_vote`;
    // add the link to the option
    option.link_to_vote = link_to_vote;
    // find the question to which we need to add the option
    const question = await QuestionModel.findById(id);
    // if question not found return response
    if (!question) {
      return { success: false, res: 'Question not found' };
    }
    // if question found add the option in the options array
    question.options.push(option);
    await Promise.all([option.save(), question.save()]);
    // emit the option to client side
    io.emit('newOption', option);
    return { success: true, res: option };
  } catch (error) {
    return { success: false, res: error.message };
  }
};

//delete a question
export const deleteQuestionRepo = async (id, io) => {
  try {
    // find the question to be deleted
    const question = await QuestionModel.findById(id).populate('options');
    // if question not found return response
    if (!question) {
      return { success: false, res: 'Question not found' };
    }
    // if found check if the one of option of question has votes
    const hasVotes = question.options.some((opt) => opt.votes > 0);
    // if even one has votes then return response and DO NOT DELETE THE QUESTION
    if (hasVotes) {
      return {
        success: false,
        res: 'Question cannot be deleted because one or more options have votes',
      };
    }
    // if no options has votes Delete options associated with the question
    await OptionModel.deleteMany({
      _id: { $in: question.options.map((option) => option._id) },
    });
    // delete the question also
    await QuestionModel.findByIdAndDelete(id);
    io.emit('questionDeleted', `${question.title} DELETED`);
    return { success: true, res: 'Question and its Options Deleted ' };
  } catch (error) {
    return { success: false, res: error.message };
  }
};

//get question details
export const getQuestionDetailsRepo = async (id, io) => {
  try {
    // find the question
    const question = await QuestionModel.findById(id).populate('options');
    // if not found return response
    if (!question) {
      return { success: false, res: 'Question not found' };
    }
    // if found return the response
    io.emit('questions', question);
    return { success: true, res: question };
  } catch (error) {
    return { success: false, res: error.message };
  }
};
