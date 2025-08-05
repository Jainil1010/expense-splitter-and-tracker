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

export const addMembers = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const group = await Group.findById(req.params._id);
        if (!group) return res.status(404).json({ success: false, message: "Group not found" });

        const isAdmin = group.members.some(m >= 
            m.user.equals(req.user._id) && m.role === "admin" );

        if (!isAdmin) return res.status(403).json({ success: false, message: "Only admins can add members"});

        if (group.members.some(m => m.user.equals(userId)))
            return res.status(400).json({ success: false, message: "Member already exists in this grop" });
        
        group.members.push({ user: userId, role: "member" });

        await group.save();
        
        res.json({ success: true, group });
    } catch (error) {
        next(error);
    }
}