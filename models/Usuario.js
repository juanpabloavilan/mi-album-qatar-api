const moongose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const UserSchema = new moongose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 31,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 31,
      trim: true,
    },
    encrypted_password: {
      type: String,
      require: true
    },
    salt: String,
  },
  { timestamps: true }
);





//In Mongoose, a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents. In this case password is not stored in the document but its encryption we do store
UserSchema.virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encrypted_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

//Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods.
UserSchema.methods = {
  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (error) {
      return error;
    }
  },
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) == this.encrypted_password;
  },
};

module.exports = moongose.model("user", UserSchema);
