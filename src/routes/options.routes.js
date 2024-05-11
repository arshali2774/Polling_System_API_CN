import express from 'express';
import {
  addVoteToOption,
  deleteOption,
} from '../controllers/option controllers/option.controller.js';

const optionRouter = express.Router();

// delete option by using option ID.
optionRouter.delete('/:id/delete', deleteOption);
// increment number of votes on an option using option ID.
optionRouter.get('/:id/add_vote', addVoteToOption);

export default optionRouter;
