const Habit = require('../models/Habit');

exports.getHabits = async (req, res) => {
    const habits = await Habit.find({ user: req.user.id });
    res.json(habits);
};

exports.addHabit = async (req, res) => {
    const newHabit = new Habit({
        name: req.body.name,
        user: req.user.id
    });
    await newHabit.save();
    res.json(newHabit);
};

exports.deleteHabit = async (req, res) => {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Habit deleted' });
};