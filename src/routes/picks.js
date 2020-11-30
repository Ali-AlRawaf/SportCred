const express = require('express');
const router = express.Router();

const Preseason = require('../models/preseason')
const RegularSeason = require('../models/regularSeason')
const Playoffs = require('../models/playoffs')

const PickTopic = require('../models/pickTopic')
const Pick = require('../models/pick')

router.post('/createPreseason', async (req, res) => {

	const exists = await Preseason.findOne();
	if (exists) return res.status(400).send('preseason already exists');

	const preseason = new Preseason({
		topics: []
	})

	try{
		await preseason.save();
		return res.status(200).send('Preseason saved');
	}catch (err){
		return res.status(400).send('error creating preseason');
	}

})

router.post('/createRegularSeason', async (req, res) => {

	const exists = await RegularSeason.findOne();
	if (exists) return res.status(400).send('Regular Season already exists');

	const regularSeason = new RegularSeason({
		topics: []
	})

	try{
		await regularSeason.save();
		return res.status(200).send('Regular Season saved');
	}catch (err){
		return res.status(400).send('error creating Regular Season');
	}

})

router.post('/createPlayoffs', async (req, res) => {

	const exists = await Playoffs.findOne();
	if (exists) return res.status(400).send('Playoffs already exists');

	const playoffs = new Playoffs({
		topics: []
	})

	try{
		await playoffs.save();
		return res.status(200).send('Playoffs saved');
	}catch (err){
		return res.status(400).send('error creating Playoffs');
	}

})


router.post('/createPreseasonTopic', async (req, res) => {

	const preseason = await Preseason.findOne();
	if (!preseason) return res.status(400).send('preseason does not exist');

	const topic = new PickTopic({
		topic: req.body.topic
	})

	try{
		await topic.save();
		preseason.topics.push(topic._id);
		await preseason.save();
		return res.status(200).send('Topic for preseason saved');
	}catch (err){
		return res.status(400).send('error creating preseason topic');
	}

})

router.post('/createRegularSeasonTopic', async (req, res) => {

	const regularSeason = await RegularSeason.findOne();
	if (!regularSeason) return res.status(400).send('Regular Season does not exist');

	const topic = new PickTopic({
		topic: req.body.topic
	})

	try{
		await topic.save();
		regularSeason.topics.push(topic._id);
		await regularSeason.save();
		return res.status(200).send('Topic for Regular Season saved');
	}catch (err){
		return res.status(400).send('error creating Regular Season topic');
	}

})


router.post('/createPlayoffsTopic', async (req, res) => {

	const playoffs = await Playoffs.findOne();
	if (!playoffs) return res.status(400).send('Playoffs does not exist');

	const topic = new PickTopic({
		topic: req.body.topic
	})

	try{
		await topic.save();
		playoffs.topics.push(topic._id);
		await playoffs.save();
		return res.status(200).send('Topic for Playoffs saved');
	}catch (err){
		return res.status(400).send('error creating Playoffs topic');
	}

})

router.get('/preseasonTopics', async (req, res) => {

	const preseason = await Preseason.findOne();
	if (!preseason) return res.status(400).send('preseason does not exist');

	const topics = preseason.topics;

	try{
		const list_of_topics = []

		for(let i =0; i < topics.length; i++){
			console.log(topics[i])
			const topic = await PickTopic.findOne({_id: topics[i]}).catch(error => console.log('invalid topic id'));
			list_of_topics.push(topic)
		}

		return res.status(200).send(list_of_topics);
		
	}catch (err){
		return res.status(400).send('error getting preseason topics');
	}

})

router.get('/regularSeasonTopics', async (req, res) => {

	const regularSeason = await RegularSeason.findOne();
	if (!regularSeason) return res.status(400).send('regularSeason does not exist');

	const topics = regularSeason.topics;

	try{
		const list_of_topics = []

		for(let i =0; i < topics.length; i++){
			console.log(topics[i])
			const topic = await PickTopic.findOne({_id: topics[i]}).catch(error => console.log('invalid topic id'));
			list_of_topics.push(topic)
		}

		return res.status(200).send(list_of_topics);
		
	}catch (err){
		return res.status(400).send('error getting regularSeason topics');
	}

})

router.get('/playoffsTopics', async (req, res) => {

	const playoffs = await Playoffs.findOne();
	if (!playoffs) return res.status(400).send('playoffs does not exist');

	const topics = playoffs.topics;

	try{
		const list_of_topics = []

		for(let i =0; i < topics.length; i++){
			console.log(topics[i])
			const topic = await PickTopic.findOne({_id: topics[i]}).catch(error => console.log('invalid topic id'));
			list_of_topics.push(topic)
		}

		return res.status(200).send(list_of_topics);
		
	}catch (err){
		return res.status(400).send('error getting playoffs topics');
	}

})

router.post('/assignPick', async (req, res) => {

	const topicId = req.body.topicId;
	const userId = req.body.userId;
	const pick = req.body.pick;

	console.log('topicId ' + topicId + ' userId ' + userId + ' pick ' + pick)

	// Check if the user already has a pick for this topic.
	try{
		const existing_pick = await Pick.findOne({topicId: topicId, userId: userId});
		console.log(existing_pick)
		if (existing_pick){
			const query = {_id: existing_pick._id}
			const update = {pick: pick}
			try{
				await Pick.updateOne(query, update, {})
				return res.status(200).send('pick updated');
			}catch{
				return res.status(400).send('pick could not be updated');
			}
			
		}
	}catch{
		console.log('creating new pick')
	}

	// Create and assign pick
	const new_pick = new Pick({
		topicId: topicId,
		userId: userId,
		pick: pick
	})

	try{
		await new_pick.save();
		return res.status(200).send("pick created");
	}catch(err){
		return res.status(400).send("error creating pick");
	}

})

module.exports = router;