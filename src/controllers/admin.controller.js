import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const AssignTrainer = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    const { trainer } = req.body;
    const user = await User.findById(userId);
    if (user) {
      user.trainer = trainer;
      
      const updatedTrainer = await user.save();
      console.log("Trainer Assigned  successfully");
      res.status(200).json({
        message: "Trainer Assigned  successfully",
        updatedTrainer,
        status: 200,
      });
    } else {
      res.status(404).json({ message: "User not found", status: 404 });
    }
  } catch (error) {
    console.log("Error in Assigning trainer", error);
    res.status(500).json({ message: error, status: 500 });
  }
});

export { AssignTrainer };
