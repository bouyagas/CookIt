const _db     = require('./connection');

module.exports = {
  getPantryItems(req,res,next) {
    _db.any(`SELECT ingredient_name FROM pantry_items;`)
       .then( pantry_item => {
        res.rows = pantry_item;
        console.log(pantry_item)
        next()
       })
       .catch( error => {
        console.error('Error', error)
       })
  },
  addPantryItem(req,res,next) {
    console.log('=====', req.body)
    _db.any(
      `INSERT INTO
      pantry_items (ingredient_name)
      VALUES ($/ingredient_name/)
      returning *;`, req.body
    )
    .then(pantry_items => {
      console.log('Added pantry_items successfully');
      res.rows = pantry_items;
      next()
    })
    .catch(error =>{
      console.error('Error in ADDING pantry_items', error)
    })
  },

  updatePantryItem(req,res,next) {
    req.body.iID = Number.parseInt(req.params.item_id)
    _db.one(
      `UPDATE pantry_items
      SET ingredient_name = $/ingredient_name/
      WHERE items_id = $/iID/
      returning * ;`, req.body
    )
    .then(pantry_items => {
      console.log('Update pantry_items successfully');
      res.rows = pantry_items;
      next()
    })
    .catch(error =>{
      console.error('Error in Updating pantry_items', error)
    })
  },

  deletePantryItem(req,res,next) {
    const iID = Number.parseInt(req.params.item_id)
    _db.none(
      `DELETE FROM pantry_items
      WHERE items_id = $1;`, [iID]
    )
    .then(() => {
      console.log('Deleted pantry_items successfully');
      next()
    })
    .catch(error =>{
      console.error('Error in DELETE pantry_items', error)
    })
  }
}


