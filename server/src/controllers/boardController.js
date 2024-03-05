const Board = require('../models/board');
const User = require('../models/user');
const Task = require('../models/task');

async function createBoard(req, res) {
  try {
    const { title, color } = req.body;
    const userId = req.userId;

    const newBoard = new Board({
      title,
      color,
      owner: userId,
      members: [userId]
    });
    await newBoard.save();

    const boards = await Board.find({
      $or: [{ owner: userId }, { members: userId }]
    });

    res.status(201).json({ newBoard, boards });
  } catch (error) {
    console.error('Error al crear tablero', error);
    res.status(500).json({ error: 'Error al crear tablero' });
  }
}

async function getAllBoards(req, res) {
  try {
    const userId = req.userId;
    const boards = await Board.find({
      $or: [{ owner: userId }, { members: userId }]
    });

    res.json(boards);
  } catch (error) {
    console.error('Error al obtener tableros', error);
    res.status(500).json({ error: 'Error al obtener tableros' });
  }
}

async function getBoardById(req, res) {
  try {
    const { boardId } = req.params;
    const board = await Board.findById(boardId)
      .populate({
        path: 'columns',
        options: { sort: { order: 1 } }
      })
      .populate({
        path: 'members',
        select: '-__v -password'
      })
      .exec();

    if (!board) {
      return res.status(404).json({ error: 'Tablero no encontrado' });
    }

    for (const column of board.columns) {
      const tasks = await Task.find({ columnId: column._id }).sort('order');
      column._doc.tasks = tasks;
    }

    return res.status(200).json(board);
  } catch (error) {
    console.error('Error al obtener tablero', error);
    res.status(500).json({ error: 'Error al obtener tablero' });
  }
}

async function inviteMember(req, res) {
  try {
    const { boardId, email } = req.body;

    const member = await User.findOne({ email: email });
    if (!member) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const board = await Board.findById(boardId);
    if (board.members.includes(member._id)) {
      return res
        .status(400)
        .json({ error: 'El usuario ya es un miembro de este tablero' });
    }
    //Añadir miembro
    board.members.push(member._id.toString());
    await board.save();

    const updatedBoard = await Board.findById(boardId)
      .populate({
        path: 'members',
        select: '-__v -password'
      })
      .exec();

    return res.status(200).json({ message: 'Usuario invitado', updatedBoard });
  } catch (error) {
    console.error('Error al invitar colaborador:', error);
    res.status(500).json({ error: 'Error al invitar miembro' });
  }
}

async function removeMember(req, res) {
  try {
    const { boardId, memberId } = req.body;
    const board = await Board.findById(boardId);

    if (board.members.includes(memberId)) {
      const updatedMembers = board.members.filter(member => member != memberId);
      board.members = updatedMembers;
      await board.save();

      const updatedBoard = await Board.findById(boardId)
        .populate({
          path: 'members',
          select: '-__v -password'
        })
        .exec();

      return res.status(200).json({ message: 'Miembro eliminado', updatedBoard });
    } else {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error al eliminar miembro' });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }

    const userData = {
      id: user._id,
      email: user.email,
      userName: user.userName
    };

    return res.json(userData);
  } catch (error) {
    console.error('Error al obtener usuario', error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
}

module.exports = {
  createBoard,
  getAllBoards,
  getBoardById,
  inviteMember,
  removeMember,
  getUserById
};
