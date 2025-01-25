import express, { Router } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { generateToken } from '../utils/jwt.js';
import ErrorHandler from '../middleware/errorMiddleware.js';
import { User } from '../model/user.js';

const router = Router();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Configuration
const storage = multer.memoryStorage(); // Store files in memory as buffer
const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // Max file size: 50 MB
    fileFilter: (req, file, cb) => {
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (allowedFormats.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file format'), false);
        }
    },
});

// Cloudinary File Upload Helper
const uploadImage = (buffer) => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Image upload timed out')), 10000); // 10 seconds timeout
        const uploadStream = cloudinary.v2.uploader.upload_stream(
            { folder: 'products', resource_type: 'image' },
            (error, result) => {
                clearTimeout(timeout);
                if (error) {
                    reject(new Error('Image upload failed: ' + error.message));
                } else {
                    resolve(result);
                }
            }
        );
        uploadStream.end(buffer);
    });
};

// Register User
export const registerUser = async (req, res, next) => {
    const requestId = `${req.method}-${req.url}-${Date.now()}`; // Unique ID
    console.time(`Request Time-${requestId}`);

    try {
        // Multer middleware
        upload.fields([
            { name: 'image', maxCount: 1 },
            { name: 'image1', maxCount: 1 },
            { name: 'image2', maxCount: 1 },
            { name: 'image3', maxCount: 1 },
        ])(req, res, async (err) => {
            if (err) return next(err);

            console.time(`Cloudinary Upload Time-${requestId}`);
            const files = req.files;
            if (!files || Object.keys(files).length === 0) {
                throw new ErrorHandler('No files were uploaded', 400);
            }

            // Cloudinary uploads
            const images = await Promise.all(
                Object.keys(files).map(async (field) => {
                    const file = files[field][0];
                    return await uploadImage(file.buffer);
                })
            );
            console.timeEnd(`Cloudinary Upload Time-${requestId}`);

            // Create and save user
            const { name, email, password } = req.body;
            const user = new User({
                name,
                email,
                password,
                image: { url: images[0]?.secure_url || '', public_id: images[0]?.public_id || '' },
                image1: { url: images[1]?.secure_url || '', public_id: images[1]?.public_id || '' },
                image2: { url: images[2]?.secure_url || '', public_id: images[2]?.public_id || '' },
                image3: { url: images[3]?.secure_url || '', public_id: images[3]?.public_id || '' },
            });

            await user.save();
            res.status(201).json({ success: true, user });
        });
    } catch (err) {
        next(err);
    } finally {
        console.timeEnd(`Request Time-${requestId}`);
    }
};

// Login User
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ErrorHandler('Please fill in all required fields', 400);
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new ErrorHandler('Invalid email or password', 401);
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            throw new ErrorHandler('Invalid email or password', 401);
        }

        generateToken(user, 'User logged in successfully', 200, res);
    } catch (error) {
        next(error);
    }
};

// Adjust path as needed

// Fetch all submissions
export const getSubmissions = async (req, res) => {
  try {
    const users = await User.find({}, "name socialMedia image image1 image2 image3");

    // Transform user data to match frontend requirements
    const submissions = users.map(user => ({
      name: user.name,
      socialMediaHandle: user.socialMedia,
      uploadedImages: [
        user.image.url,
        user.image1.url,
        user.image2.url,
        user.image3.url
      ].filter(Boolean) // Filter out empty URLs
    }));

    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Failed to fetch submissions." });
  }
};

// Add a new submission
export const addSubmission = async (req, res) => {
  const { name, email, socialMedia, images } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      socialMedia,
      image: images[0] || {},
      image1: images[1] || {},
      image2: images[2] || {},
      image3: images[3] || {},
    });

    await newUser.save();

    res.status(201).json({ message: "Submission added successfully." });
  } catch (error) {
    console.error("Error adding submission:", error);
    res.status(500).json({ message: "Failed to add submission." });
  }
};

// Update an existing submission
export const updateSubmission = async (req, res) => {
  const { id } = req.params;
  const { name, socialMedia, images } = req.body;

  try {
    const updatedFields = {
      name,
      socialMedia,
      image: images[0] || {},
      image1: images[1] || {},
      image2: images[2] || {},
      image3: images[3] || {},
    };

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "Submission not found." });
    }

    res.status(200).json({ message: "Submission updated successfully." });
  } catch (error) {
    console.error("Error updating submission:", error);
    res.status(500).json({ message: "Failed to update submission." });
  }
};

// Delete a submission
export const deleteSubmission = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Submission not found." });
    }

    res.status(200).json({ message: "Submission deleted successfully." });
  } catch (error) {
    console.error("Error deleting submission:", error);
    res.status(500).json({ message: "Failed to delete submission." });
  }
};
// Logout User
export const logout = async (req, res) => {
    res.status(200).cookie("clientToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "Client logged out",
    });
};
