const mongoose = require('mongoose'); // Import mongoose
const bcrypt = require('bcrypt'); // Import bcrypt

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true
    },
    avatar: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already exist"],
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

const User = mongoose.model('User', userSchema); // Create a modelc / collection

module.exports = User; // Export model