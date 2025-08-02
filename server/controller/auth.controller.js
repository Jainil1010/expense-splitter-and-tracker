import mongoose from "mongoose";
import User from '../models/user.model.js'
import bcrypt, { getSalt } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/env.js";

const checkUserAlreadyExists = (userEmail) => {
    if (userExsist) {
        const error = new Error('User already exists');
        error.statusCode = 400;
        throw error;
    }
}

const checkIfUserDoesNotExists = (userEmail) => {
    if (!userExsist) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
}

const chectIfPasswordIsValid = (hashedPassword) => {
    if (!isPasswordValid) {
        const error = new Error('Invalid password');
        error.statusCode = 400;
        throw error;
    }
}

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const userExsist = await User.findOne({ email });

        checkUserAlreadyExists(userExsist);

        const salt = getSalt(10);
        const hashPassword = bcrypt.hash(password, salt);

        const user = await User.create({ username, email, password: hashPassword }, { session });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });  

        await sesssion.commitTransaction();
        sesssion.endSession();

        res.status(201).json({
            success: true,

            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: username,
                email: email
            }
        });
    } catch (error) {
        await sesssion.abortTransaction();
        sesssion.endSession();
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userExsist = await User.findOne({ email });

        checkIfUserDoesNotExists(userExsist);

        const isPasswordValid = await bcrypt.compare(password, user.password);

        chectIfPasswordIsValid(isPasswordValid);
        
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
        
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: email
            }
        });
    } catch (error) {
        next(error);
    }
}