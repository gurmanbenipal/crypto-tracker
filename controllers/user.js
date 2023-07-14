const User = require('../models/user'); 

module.exports = {
    update
}
async function update(req, res){
    try {
        await User.findByIdAndUpdate(req.params.id, { isDarkMode: req.body.isDarkMode });
        res.redirect('back');
    } catch(err) {
      console.error(err);
      //500 because it's most likely the server's fault, not the client's
      res.status(500).send('An error occurred');
    }
}
