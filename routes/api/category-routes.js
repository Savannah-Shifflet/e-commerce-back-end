const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories & its associated products
  try{
    const categoryData = await Category.findAll({
      include: Product 
    });
    res.status(200).json(categoryData); 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value and its associated products
  try{
    const categoryId = await Category.findByPk(req.params.id, {
      include: Product
    });
    res.status(200).json(categoryId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  }catch (err) {
    res.status(500).json(err); 
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryUpdate = await Category.update({ category_name: req.body.category_name }, {
      where: {id: req.params.id}
    });
    res.status(200).json(categoryUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryDelete = await Category.destroy({
      where: {id: req.params.id }
    });
    res.status(200).json(categoryDelete);
  }catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
