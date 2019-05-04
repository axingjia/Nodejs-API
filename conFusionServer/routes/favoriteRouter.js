const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Favorites = require('../models/favorites');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
.options(cors.corsWithOptions,authenticate.verifyUser, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    Favorites.find({user:req.user._id})
    .populate('dishes')
	.populate('user')
    .then((favoriteSingleton) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favoriteSingleton);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
	Favorites.find({user:req.user._id})
    
    .then((list) => {
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        // res.json(favoriteSingleton);
		if(list==null){
			var dishes=[];
			for (var i=0; i<req.body.length;i++){
				dishes.push(req.body[i]._id);
			}
		    Favorites.create({
				dishes:dishes,
				user:req.user._id
			})
		    .then((favoriteSingleton) => {
		        // console.log('Dish Created ', favoriteSingleton);
		        res.statusCode = 200;
		        res.setHeader('Content-Type', 'application/json');
		        res.json(favoriteSingleton);
		    }, (err) => next(err));
		}else{
			var dishes=list.dishes;
			for (var i=0; i<req.body.length;i++){
				if(dishes.indexOf(req.body[i]._id)!=-1){
					dishes.push(req.body[i]._id);
				}
				
			}
			Favorites.findByIdAndUpdate({
				req.user._id, {
			        $set: {dishes:dishes)}
			    }, { new: true }
			})
		    .then((favoriteSingleton2) => {
		        // console.log('Dish Created ', favoriteSingleton);
		        res.statusCode = 200;
		        res.setHeader('Content-Type', 'application/json');
		        res.json(favoriteSingleton2);
		    }, (err) => next(err))
		}
    }, (err) => next(err))
	.catch((err) => next(err));
	
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
    Favorites.remove({user:req.user._id})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


dishRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get((req,res,next) => {
	res.statusCode = 403;
    res.end('GET operation not supported on /favorites/:dishId');
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
	Favorites.find({user:req.user._id})
	.then((favoriteSingleton) => {
		if(favoriteSingleton==null){
			Favorites.findByIdAndUpdate({
				req.user._id, {
			        $set: {dishes:favoriteSingleton.dishes.push(req.param.dishId)}
			    }, { new: true }
			})
		    .then((favoriteSingleton2) => {
		        // console.log('Dish Created ', favoriteSingleton);
		        res.statusCode = 200;
		        res.setHeader('Content-Type', 'application/json');
		        res.json(favoriteSingleton2);
		    }, (err) => next(err));
		}else{
			Favorites.create({
				dishes:[req.param.dishId],
				user:req.user._id
			})
		    .then((favoriteSingleton) => {
		        // console.log('Dish Created ', favoriteSingleton);
		        res.statusCode = 200;
		        res.setHeader('Content-Type', 'application/json');
		        res.json(favoriteSingleton);
		    }, (err) => next(err));
		}
		
    }, (err) => next(err))
    .catch((err) => next(err));
    
})
.put((req,res,next) => {
	res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/:dishId');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req, res, next) => {
	Favorites.find({user:req.user._id})
	.then((favoriteSingleton) => {
		var index=-1;
		for (var i=0;i<favoriteSingleton.dishes.length;i++){
			if(req.param.dishId==favoriteSingleton.dishes[i]){
				index=i;
			}
		}
		if(index<=0){
			Favorites.findByIdAndUpdate({
				req.user._id, {
			        $set: {dishes:favoriteSingleton.dishes.splice(index,1)}
			    }, { new: true }
			})
		    .then((favoriteSingleton2) => {
		        // console.log('Dish Created ', favoriteSingleton);
		        res.statusCode = 200;
		        res.setHeader('Content-Type', 'application/json');
		        res.json(favoriteSingleton2);
		    }, (err) => next(err))
		}
		
    }, (err) => next(err))
    .catch((err) => next(err));
});


