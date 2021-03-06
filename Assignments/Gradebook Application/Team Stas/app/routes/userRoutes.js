var User = require('../models/user');

module.exports = function (apiRouter) {
	//create a user on post and get all users on get
	apiRouter.route('/users')
		.get(function (req, res) {
			User.find(function (err) {
				if(err)
					res.send(err);
			}).exec(function (err, users) {
				res.json(users);
			})
		});


	apiRouter.route('/users/:user_id')
		//get the user with that id
		.get(function (req, res) {

			User.findOne({_id: req.params.user_id})
				.populate('classes')
				.exec(function (err, user) {
					if (err)
						res.send(err);
					else{
						res.json(user);
					}
				})
		})
		//update the user with that id
		.put(function (req, res) {
			User.findById(req.params.user_id, function (err, user) {
				if (err)
					res.send(err)

				//update the users info only if it is new
				if(req.body.name)
					user.name = req.body.name;
				if(req.body.username)
					user.username = req.body.username;
				if(req.body.password)
					user.password = req.body.password;

				//save the user
				user.save(function (err) {
					if(err)
						res.send(err);
					else{
						//return a message
						res.json({
							success: true,
							message: 'User updated'
						});
					};
				});
			});
		})
		//delete the user with this id
		.delete(function (req, res) {
			User.findByIdAndRemove(req.params.user_id, function (err, user) {
				if (err)
					res.send(err);
				user.remove();
			}).then(function () {
				User.find(function (err, users) {
					res.json({
						users: users,
						success: true,
						message: 'Successfully deleted'
					});
				});
			});
		});

	apiRouter.get('/me', function (req, res) {
		res.send(req.decoded);
	});

	apiRouter.post('/users/addRole/:user_id', function (req, res) {
		//find all requested users and add them to class
		for (var i in req.body) {
			User.update({
				_id: req.params.user_id},
				{$addToSet: {roles: req.body[i]}}, function (err) {
					if (err)
						res.send(err)
				});				
		};
		
		res.json({
			success: true
		});

	});

	apiRouter.post('/users/deleteRole/:user_id', function (req, res) {
		User.update({
			_id: req.params.user_id},
			{$pull: {roles: req.body.role}}, function (err) {
				if (err)
					res.send(err);
		});
		res.json({
			success: true
		});
	});
}