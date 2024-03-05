const Task = require("../models/task");

async function createTask(req, res) {
  try {
    const { title, columnId } = req.body;
    const count = await Task.countDocuments({ columnId: columnId });

    const newTask = new Task({
      columnId,
      title,
      order: count > 0 ? count : 0,
    });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    res.status(500).json({ error: "Error al crear la tarea." });
  }
}

async function updateTask(req, res) {
  try {
    const { taskId, task } = req.body;

    if (!task.assignedTo) task.assignedTo = null;
    const replacedTask = await Task.findByIdAndUpdate(taskId, task, {
      new: true,
    });

    if (!replacedTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    return res.status(200).json(replacedTask);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Errror al actualizar tarea" });
  }
}

async function deleteTask(req, res) {
  try {
    const { taskId } = req.body;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "La tarea no fue encontrada." });
    }

    return res.status(200).json(deletedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar tarea." });
  }
}

async function shiftColumn(req, res) {
  try {
    const { sourceList, destinationList, sourceColId, destinationColId } =
      req.body;

    if (sourceColId !== destinationColId) {
      for (const key in sourceList) {
        await Task.findByIdAndUpdate(sourceList[key]._id, {
          $set: {
            columnId: sourceColId,
            order: key,
          },
        });
      }
    }
    for (const key in destinationList) {
      await Task.findByIdAndUpdate(destinationList[key]._id, {
        $set: {
          columnId: destinationColId,
          order: key,
        },
      });
    }
    return res.status(200).json({ message: "Tarea actualizada" });
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    res.status(500).json({ error: "Error al actualizar la tarea." });
  }
}

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  shiftColumn,
};
