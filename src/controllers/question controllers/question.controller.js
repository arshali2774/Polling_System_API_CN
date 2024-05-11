import {
  addOptionToQuestionRepo,
  addQuestionRepo,
  deleteQuestionRepo,
  getQuestionDetailsRepo,
} from '../../models/question model/question.model.js';

// create question
export const addQuestion = async (req, res) => {
  const { title } = req.body;
  try {
    const resp = await addQuestionRepo(title, req.io);
    if (!resp.success) {
      return res.status(400).json(resp);
    }
    res.status(201).json(resp);
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// create option
export const addOptionToQuestion = async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  try {
    const resp = await addOptionToQuestionRepo(id, text, req.io);
    if (!resp.success) {
      return res.status(400).json(resp);
    }
    res.status(201).json(resp);
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// delete a question
export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await deleteQuestionRepo(id, req.io);
    if (!resp.success) {
      return res.status(400).json(resp);
    }
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
// get question details
export const getQuestionDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await getQuestionDetailsRepo(id, req.io);
    if (!resp.success) {
      return res.status(400).json(resp);
    }
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
