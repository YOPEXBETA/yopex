const Category = require("../models/Category.model");
const SocialMediaPost = require("../models/Post.model");

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const q = req.query;
      const filters = {
        ...(q.search && { name: { $regex: q.search, $options: "i" } }),
      };
      const categories = await Category.find(filters);
      await res.status(200).json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: "This category already exists." });

      const newCategory = new Category({ name });

      await newCategory.save();
      res.json({ newCategory });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const posts = await SocialMediaPost.findOne({
        category: req.params.id,
      });
      if (posts)
        return res.status(400).json({
          msg: "Please delete all products with a relationship.",
        });

      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });

      res.json({ msg: "Updated a category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryController;
