const User = require("../../models/user");

module.exports = {
  users: async () => {
    try {
      const usersFetched = await User.find();
      console.log(usersFetched);
      return usersFetched.map((user) => {
        return {
          ...user._doc,
          _id: user.id,
          createdAt: new Date(user._doc.createdAt).toISOString(),
        };
      });
    } catch (error) {
      throw error;
    }
  },

  user: async (args) => {
    try {
      const userFetched = await User.findById(args._id);
      console.log(userFetched);
      return userFetched;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (args) => {
    try {
      const { name, address } = args.user;
      const userData = new User({
        name,
        address,
      });
      const newUser = await userData.save();
      return { ...newUser._doc, _id: newUser.id };
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (args) => {
    try {
      const { name, address, _id } = args.user;
      return User.findOneAndUpdate(
        {
          _id: _id,
        },
        {
          $set: {
            name: name,
            address: address,
          },
        },
        { new: true },
        (error, resultOfUser) => {
          if (error) {
            console.log("Something went wrong when updating the movie");
          } else {
            console.log(resultOfUser);
          }
        }
      );
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (args) => {
    try {
      return User.findOneAndDelete(
        {
          _id: args._id,
        },
        (error, resultOfUser) => {
          if (error) {
            console.log("Something went wrong when updating the movie");
          } else {
            console.log(resultOfUser);
          }
        }
      );
    } catch (error) {
      throw error;
    }
  },
};
