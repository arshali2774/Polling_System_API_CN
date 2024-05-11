import {
  addVoteToOptionRepo,
  deleteOptionRepo,
} from '../../models/option model/option.model.js';

//add vote to an option
export const addVoteToOption = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await addVoteToOptionRepo(id, req.io);
    if (!resp.success) {
      return res.status(400).json(resp);
    }
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(resp);
  }
};

//delete an option
export const deleteOption = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await deleteOptionRepo(id, req.io);
    if (!resp.success) {
      return res.status(400).json(resp);
    }
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(resp);
  }
};
