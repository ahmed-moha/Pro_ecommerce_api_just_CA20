const Category = require("./model");
module.exports = {
  createCategory: async (req, res) => {
    const { name, desc } = req.body;
    const photo = req.file.path;
    let correctedPath = process.env.IMAGE_URL + photo.replace(/\\/g, "/");

    try {
      const category = await Category({
        name: name,
        desc: desc,
        photo: correctedPath,
      }).save();
      res.status(201).json({ category });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const category = await Category.findById(id);
      res.status(200).json({ category });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getCategories: async (req, res) => {
    try {
      const category = await Category.find();
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
