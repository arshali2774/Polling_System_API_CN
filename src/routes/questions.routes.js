import express from 'express';
import {
  addOptionToQuestion,
  addQuestion,
  deleteQuestion,
  getQuestionDetails,
} from '../controllers/question controllers/question.controller.js';

const questionRouter = express.Router();
// create options for question by using question ID.
questionRouter.post('/:id/options/create', addOptionToQuestion);
// delete question by using question ID.
questionRouter.delete('/:id/delete', deleteQuestion);
// get question and its options by using question ID.
questionRouter.get('/:id', getQuestionDetails);
// create question
questionRouter.post('/create', addQuestion);

export default questionRouter;
