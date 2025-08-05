import Group from "../models/group.model.js";
import User from "../models/user.model.js";

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

        const userToADd = await User.findById(userId);
        if (!userToADd) return res.status(404).json({success: false, message: "User does not exists"});

        if (group.members.some(m => m.user.equals(userId)))
            return res.status(400).json({ success: false, message: "Member already exists in this grop" });
        
        group.members.push({ user: userId, role: "member" });

        await group.save();

        res.json({ success: true, group });
    } catch (error) {
        next(error);
    }
}

export const removeMember = async (req, res, next) => {
    try {
        const { groupId, userId } = req.params;
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ success: false, message: "Group not found" });

        const isAdmin = group.members.some(m >= 
            m.user.equals(req.user._id) && m.role === "admin" );

        if (!isAdmin) return res.status(403).json({ success: false, message: "Only admins can remove members"});

        group.members = group.members.filter(m => !m.user.equals(userId));
        await group.save();
        res.status(200).json({ success: true, group });
    } catch (error) {
        next(error);
    }
}