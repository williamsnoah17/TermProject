/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
  name: {
    type: String, 
    required: true
  }, 
  code: {
    type: String, 
    required: true, 
    unique: true
  }, 
  address: String, 
  coordinates: {
    latitude: Number, 
    longitude: Number
  },
  rating: {
    type: Number,
    default: 0
  },
  //The array of classrooms each building holds.
  classRoomArray: [
    {
      roomNumber: {
        type: Number,
        required: true
      },
      rating: {
        likes: {
          type: Number,
          default: 0
        },
        dislikes: {
          type: Number,
          default: 0
        }
      },
    description: String, 
    isOccupied: Boolean,
    size: Number,
    outlets: Number,
    hasWhiteboard: Boolean,
    hasBlackboard: Boolean
  }],
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
