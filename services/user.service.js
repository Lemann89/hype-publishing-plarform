const User = require('../models/user.model');

class UserService {

    getById(id) {
        return User.findById(id, ['email', 'name', 'img', 'description']).populate('posts');
    }

    update(data, id) {
        return User.updateOne({_id: id}, data, {new: true});
    }
}

module.exports = UserService;
