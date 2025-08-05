import Group from "../models/group.model.js";

export const createGroup = async (req, res, next) => {
    try {
        const { name, description, type, currency, settings } = req.body;
        const group = await Group.create({
            name,
            description,
            type,
            currency,
            settings,
            members: [{ user: req.user._id, role: "admim" }],
            createdBy: req.user._id
        });

        res.status(201).json({ success: true, group });
    } catch (error) {
        next(error);
    }
}