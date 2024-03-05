const Board = require("../models/board");
const Column = require("../models/column");
const Task = require("../models/task");

async function createColumn(req, res) {
  try {
    const { title, boardId } = req.body;
    const count = await Column.countDocuments({ boardId: boardId });

    const newColumn = new Column({
      boardId,
      title,
      order: count > 0 ? count : 0,
    });
    newColumn._doc.tasks = [];
    await newColumn.save();

    const board = await Board.findById(boardId);
    board.columns.push(newColumn._id);
    await board.save();

    res.status(201).json(newColumn);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear lista" });
  }
}

async function updateTitle(req, res) {
  try {
    const { columnId, title } = req.body;
    console.log(title, columnId);
    const newColumn = await Column.findByIdAndUpdate(
      columnId,
      { title: title },
      {
        new: true,
      }
    );

    if (!newColumn) {
      return res.status(404).json({ error: "Lista no encontrada" });
    }

    return res.status(200).json(newColumn);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al actualizar lista" });
  }
}

async function deleteColumn(req, res) {
  try {
    const { boardId, columnId } = req.body;
    const board = await Board.findById(boardId);

    if (board.columns.includes(columnId)) {
      const updateColumns = board.columns.filter(
        (column) => column != columnId
      );
      board.columns = updateColumns;
      await board.save();

      const column = await Column.findByIdAndDelete(columnId);

      await Task.deleteMany({ columnId: columnId });

      if (!column) {
        return res.status(404).json({ error: "Lista no encontrada" });
      }
      return res.status(200).json(column);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al eliminar lista" });
  }
}

async function swapColumnOrder(req, res) {
  try {
    const { boardId, sourceId, destinationId } = req.body;

    const sourceColumn = await Column.findById(sourceId);
    const destinationColumn = await Column.findById(destinationId);

    const tempOrder = sourceColumn.order;
    sourceColumn.order = destinationColumn.order;
    destinationColumn.order = tempOrder;

    await sourceColumn.save();
    await destinationColumn.save();

    const board = await Board.findById(boardId)
      .populate({
        path: "columns",
      })
      .exec();

    return res.status(200).json(board.columns);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al actualizar lista" });
  }
}

module.exports = {
  createColumn,
  updateTitle,
  deleteColumn,
  swapColumnOrder,
};
