// Call the packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Pokemon Schema
var PokemonSchema =  new Schema({

  name: {
    type: String,
    required: true,
    default: 'no name',
    index: {
      unique: true
    }
  },
  type: String,
  count: {
    type: Number,
    default: 0
  },
  owner:{
    type: Schema.ObjectId,
    ref: 'User'
  }
});
//Ejecuta algo antes de determinada accion

PokemonSchema.methods.sayHi = function(){
  var pokemon = this;

  return 'Hola !, soy un '+ pokemon.name + ' de tipo '+pokemon.type + ' y me han buscado ' + pokemon.count + ' veces.';

}

PokemonSchema.post('findOne', function(pokemon){
  console.log('entra con find');
  console.log(pokemon.count)
  pokemon.count ++;
  pokemon.save();
  console.log(pokemon.count);


})



// PokemonSchema.pre('save',function(next){
//   var pokemon = this;

//If the password not changed then continue
  // if(!pokemon.isModified('password')) return next();

//Generate te hash
// bcrypt.hash(pokemon.password,null, null, function(err, hash){
//   if(err) return next(err);
//
// // Change the password to the hashed version
//   user.password = hash;
//   next();
// })
// })

// UserSchema.methods.comparePassword = function(password){
//   var user = this;
//   return bcrypt.compareSync(password, user.password);
//
// }

module.exports = mongoose.model('Pokemon', PokemonSchema);
