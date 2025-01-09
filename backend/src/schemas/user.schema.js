const mongoose = require('mongoose'); // Import mongoose
const bcrypt = require('bcrypt'); // Import bcrypt
const ENUM = require('../utils/constants');

/**
 * User Schema
 * 
 * This schema defines the structure of the user document in the MongoDB database.
 * 
 * @property {String} username - The username of the user. It is required and trimmed.
 * @property {String} avatar - The avatar URL of the user. It has a default value of an empty string.
 * @property {String} email - The email address of the user. It is required, unique, trimmed, and must match a valid email format.
 * @property {String} password - The password of the user. It is required, trimmed, and hidden by default.
 * @property {Boolean} verified - Indicates if the user's email is verified. Default is false.
 * @property {Object} verificationToken - The token used for email verification.
 * @property {String} verificationToken.value - The value of the verification token. Default is an empty string.
 * @property {Date} verificationToken.expires - The expiration date of the verification token. Default is 1 hour from creation.
 * @property {String} role - The role of the user. It can be "admin", "mentor", or "mentee". Default is "mentee".
 * @property {Object} profile - The profile information of the user.
 * @property {String} profile.title - The title of the user's profile. Default is "Your sample title".
 * @property {String} profile.bio - The bio of the user's profile. Default is "Your sample bio".
 * @property {String} profile.college - The college of the user. Default is an empty string.
 * @property {Array<ObjectId>} profile.tags - The tags associated with the user. Default is an empty array.
 * @property {Object} profile.social - The social media links of the user.
 * @property {String} profile.social.linkedin - The LinkedIn profile URL of the user. Default is an empty string.
 * @property {String} profile.social.github - The GitHub profile URL of the user. Default is an empty string.
 * @property {String} profile.social.twitter - The Twitter profile URL of the user. Default is an empty string.
 * @property {String} profile.social.instagram - The Instagram profile URL of the user. Default is an empty string.
 * @property {String} profile.social.youtube - The YouTube channel URL of the user. Default is an empty string.
 * 
 * @typedef {Object} User
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: [true, "Username already exist"]
    },
    avatar: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exist"],
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address"
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        select: false // Hide password
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        value: {
            type: String,
            default: ""
        },
        expires: {
            type: Date,
            default: () => Date.now() + 3600000 // 1 hour
        }
    },
    role: {
        type: String,
        enum: [ENUM.ROLE.ADMIN, ENUM.ROLE.MENTOR, ENUM.ROLE.MENTEE],
        default: ENUM.ROLE.MENTEE
    },
    profile: {
        title: {
            type: String,
            default: "Your sample title"
        },
        bio: {
            type: String,
            default: "Your sample bio"
        },
        college: {
            type: String,
            default: ""
        },
        tags: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
        },
        social: {
            linkedin: {
                type: String,
                default: ""
            },
            github: {
                type: String,
                default: ""
            },
            twitter: {
                type: String,
                default: ""
            },
            instagram: {
                type: String,
                default: ""
            },
            youtube: {
                type: String,
                default: ""
            },
        }
    }
}, { timestamps: true });

// Hook to hash the password before user is saved
userSchema.pre('save', async function (next) {
    if(this.isNew && this.password) {
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash password
    }
    if(this.isNew) {
        this.avatar = `https://robohash.org/${this.username}`; // Generate avatar
        this.verificationToken.value = Math.random().toString(36).substring(7); // Generate verification
    }
    next();
});

// Instance mwethod to compare password
userSchema.methods.comparePassword = async function (incomingPassword) {
    return bcrypt.compareSync(incomingPassword, this.password);
}

const User = mongoose.model('User', userSchema); // Create a modelc / collection

module.exports = User; // Export model