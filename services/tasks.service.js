const Todo = require('../models/Todo');

exports.getTasks = async function (user, startDate, endDate) {
	try {

		return await Todo.aggregate([
				{	"$match": {
						"idUser": user._id
					}
				},
				{	"$project": { 
						"tasks": { 
							"$filter": { 
								"input": "$tasks",  
	              "as": "task",
								"cond":
									{ "$and": [
						        { "$gte": [ "$$task.date", startDate ] },
						        { "$lte": [ "$$task.date", endDate ] }
						      ] }
							} 
						} 
					}
				},
				{ "$unwind": "$tasks" },
				{ "$group" : { 
						_id : "$tasks.date", 
						tasks: { "$push": 
									{ 
										_id: "$tasks._id",
										text: "$tasks.text",
										done: "$tasks.done" 
									}
						} 
					}
				},
				{ "$sort": { _id: 1} }
			]).exec();

	} catch (err) {
		throw 'Error while getting tasks';
	}
}

exports.createTask = async function (user, subdoc) {
	try {

		return await Todo.findOneAndUpdate(
			{
				idUser: user._id
			},
			{
				idUser: user._id,
				"$push": { 
          tasks: subdoc
        } 
			},
			{
				upsert: true
			}
		).exec();

	} catch (err) {
		throw 'Error while creating task';
	}
}

exports.updateTask = async function (user, body) {
	try {

		return await Todo.findOneAndUpdate(
			{
				"tasks._id": body.id,
				"idUser": user._id
			},
			{
				"$set" : {
					"tasks.$.text" : body.text,
					"tasks.$.done" : body.done
				}
			}
		).exec();

	} catch (err) {
		throw 'Error while updating task';
	}
}

exports.deleteTask = async function (user, query) {
	try {

		return await Todo.findOneAndUpdate(
			{
				"idUser": user._id
			},
			{
				"$pull": {
					tasks: {
						"_id": query.id,
					}
				}
			}
		).exec();

	} catch (err) {
		throw'Error while deleting task';
	}
}