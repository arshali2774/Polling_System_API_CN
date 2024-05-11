import { QuestionModel } from '../question model/question.schema.js';
import { OptionModel } from './option.schema.js';

//add vote to an option
export const addVoteToOptionRepo = async (id, io) => {
  try {
    //find an option to update the votes
    const option = await OptionModel.findById(id);
    // if option not found return response
    if (!option) {
      return { success: false, res: 'Option not found' };
    }
    // if found update the votes
    option.votes++;
    await option.save();

    //emit vote added event
    io.emit('voteAdded', `Vote added to option: ${option.text}`);

    return { success: true, res: option };
  } catch (error) {
    return { success: false, res: error.message };
  }
};

//delete an option
export const deleteOptionRepo = async (id, io) => {
  try {
    // find the option to be deleted
    const option = await OptionModel.findById(id);
    // if option not found return response
    if (!option) {
      return { success: false, res: 'Option not found' };
    }
    // if found check if it has votes
    if (option.votes > 0) {
      return {
        success: false,
        res: 'Option cannot be deleted because it has one or more votes',
      };
    }
    // Find the associated question by searching for the option ID in the options array
    const question = await QuestionModel.findOneAndUpdate(
      { options: option._id },
      { $pull: { options: option._id } },
      { new: true }
    );

    // If question not found, return error response
    if (!question) {
      return { success: false, res: 'Associated question not found' };
    }

    //delete the option
    await OptionModel.findByIdAndDelete(id);

    // emit event option deleted
    io.emit('optionDeleted', `${option.text} option was deleted.`);

    return { success: true, res: 'Option deleted' };
  } catch (error) {
    return { success: false, res: error.message };
  }
};
