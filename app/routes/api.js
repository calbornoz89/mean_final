var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Pokemon = require('../models/pokemon');
var config = require('../../config');

var superSecret = config.superSecret;

module.exports = function(app, express){
// INICIA EXPORTS ========

//Express router instances
var apiRouter = express.Router();

apiRouter.post('/authenticate', function(req, res){
  User.findOne({
    username: req.body.username

  }).select('name username password')
  .exec(function(err, user){
    if(err) throw err;
// username was not found
if(!user) {
  res.json({
    success: false,
    message: 'La autenticacion a fallado. El usuario NO existe.'
  });
} else if(user){
  //validate if passwords matches
  var validPassword = user.comparePassword(req.body.password);

  if(!validPassword){
    res.json({
      success: false,
      message: 'La autenticacion a fallado. Contraseña incorrecta.'
    });
  }else {
    //If authenticate process is OK then
    //generate token
    // var token = jwt.sign(payload, secretOrPrivateKey,options, [callback])

    var token = jwt.sign({

      name: user.name,
      username: user.username

    }, superSecret, {

      expiresIn: '24h'

      // expiresIn: '1m'
    })

    res.json({
      success: true,
      message: 'Swordfish: Acceso Autorizado',
      token: token

    })
  }

}

  })

})

//Middleware to verify a token
apiRouter.use(function(req, res, next){

console.log('Alguien ha entrado a la matrix!');
var token = req.body.token || req.query.token || req.headers['x-access-token'];

if (token){
  //verify token
  jwt.verify(token, superSecret, function(err, decoded){

    if(err){
      return res.json({
        success: false,
        message: 'Fallo la autenticacion del token.'
      })
    } else{
      console.log(decoded);
      req.decoded = decoded
      next();
    }

  })
}else {
  return res.status(403).send({

    success: false,
    message: 'NO se envio el token.'

  })
}

})


apiRouter.get('/',function(req, res){

res.json({

  message: "Welcome to the Matrix!"
})

})

//Accesed at GET http://localhost:5000/api
apiRouter.get('/me', function(req, res){
  res.json({
    message: 'Nombre: '+req.decoded.name


  });

});






//Routes /users
apiRouter.route('/users')
//Create a user through POST
//URL: http://localhost:5000/api/users
.post(function(req, res){
  var user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;

  user.save(function(err){
    //Verified duplicate entry on username
    if(err){
    if(err.code == 11000){
    return res.json({ success: false, message: 'El nombre de usuario ya existe.'})
  }}
  res.json({message: 'El usuario se ha creado'});

})
})
//Get all users through Get
// URL: http://localhost:5000/api/users
.get(function(req, res){
  User.find (function(err, users){
    if(err) return res.send(err);
    res.json(users);
  })


})

apiRouter.route('/users/:user_id')
.get(function(req, res){
  User.findById(req.params.user_id, function(err, user){
    if(err) return res.send(err);
    res.json(user);

  })

})
.put(function(req, res){
  User.findById(req.params.user_id, function(err, user){
    if(err) return res.send(err);
      if(req.body.name) user.name = req.body.name;
      if(req.body.username) user.username = req.body.username;
      if(req.body.password) user.password = req.body.password;

      user.save(function(err){
        if(err) return res.send(err);

        res.json({message: 'Usuario actualizado'})

      })

  })

})
.delete(function(req, res){
  User.remove({
    _id: req.params.user_id

  },function(err, user){
    if(err) return res.send(err);
    res.json({message: 'El usuario se ha eliminado'})
  })
})


.get(function(req, res){
  User.findOne({
    name: req.params.name
  }, function(err, user){
    if(err) return res.send(err);
    res.json({message: 'El encontrado'})
  }
  )

})

apiRouter.route('/pokemons')

.post(function(req, res){
  var pokemon = new Pokemon();
  pokemon.name = req.body.name;
  pokemon.type = req.body.type;

  pokemon.owner = req.body.owner;




  pokemon.save(function(err){
    //Verified duplicate entry on pokemoname
    if(err){
    if(err.code == 11000){
    return res.json({ success: false, message: 'El nombre de usuario ya existe.'})
  }}
  res.json({message: 'El usuario se ha creado'});

})
})
//Get all pokemons through Get
// URL: http://localhost:5000/api/pokemons
.get(function(req, res){
  // Pokemon.find (function(err, pokemons){
  //   if(err) return res.send(err);
  //   res.json(pokemons);
  // })
Pokemon.find ({}, function(err, pokemons){
  User.populate(pokemons,{path:'owner', select: {name:1, username:1}, match: {username:'omur'} }, function(err, pokemons){
      res.status(200).json(pokemons)

  })
})
// .limit(3)
// .skip(1).limit(2)
//.sort({name:1}) --->ordena ASC
//.sort({name:-1}) --->ordena DESC
// .sort({name:-1})
.select({ name:1,type:1,owner:1})
})

apiRouter.route('/pokemons/:pokemon_id')
.get(function(req, res){
  Pokemon.findById(req.params.pokemon_id, function(err, pokemon){
    if(err) return res.send(err);
      res.json({message: pokemon.sayHi()});



  })

})
.put(function(req, res){
  Pokemon.findById(req.params.pokemon_id, function(err, pokemon){
    if(err) return res.send(err);
      if(req.body.name) pokemon.name = req.body.name;
      if(req.body.pokemoname) pokemon.pokemoname = req.body.pokemoname;
      if(req.body.owner) pokemon.owner = req.body.owner;

      pokemon.save(function(err){
        if(err) return res.send(err);

        res.json({message: 'Usuario actualizado'})

      })

  })

})
.delete(function(req, res){
  Pokemon.remove({
    _id: req.params.pokemon_id

  },function(err, pokemon){
    if(err) return res.send(err);
    res.json({message: 'El usuario se ha eliminado'})
  })
})


apiRouter.route('/pokemons/type/:type')
.get(function(req, res){
  Pokemon.find({
    // type: /lant/
    // type: req.params.type
    // type : new RegExp(req.params.type,'i'),
    $or : [{type: /Electric/i}, {type: /air/i}],
    // count: {
    //   //mayor que $gt
    //   //menor que $lt
    //   $gt: 0,
    //   $lt: 10
    // }
    name:{
      $in: ['Pigeot','Pikachu']
    }

  }, function(err, pokemons){
    res.json(pokemons)
  })

})


// app.get('/',function(req,res){
// res.sendFile(path.join(__dirname) + '/index.html');
// })


//Middleware
//adminRouter.use(function (req, res, next){

//console.log('--->',req.method, req.url);



//next();

//})

// adminRouter.param('name', function(req, res, next, name){
//
// console.log("req.name: ",req.name);
// console.log("name: ",name);
//
// req.name = ' Heroku';
//
// next();
//
// })

// adminRouter.param('pokemoname', function(req, res, next, pokemoname){
//
// validPokemon = 'carlos';
//
// if (username == validUser ) {
// 	req.username = 'CARLOS';
// 	next();
// } else {
// 	//console.log('FALLASTE EN USUARIO');
// 	res.redirect('/error');
// }
// })


// adminRouter.param('userpassword', function(req, res, next, userpassword){
//
// validPass = 'heroku';
//
// if (userpassword == validPass ) {
// 	console.log('entre');
// 	req.userpassword = ' con PASSWORD';
// 	next();
// } else {
// 	//req.userpassword = ' sin PASSWORD';
//
// 	//console.log('FALLASTE EN PASSWORD');
//
// res.redirect('/error');
//
// }
// })



//
// //Rutas
// adminRouter.get('/',function(req, res){
// 	res.send('Estoy en la pagina principal del admin');
//
// })
//
// adminRouter.get('/users',function(req, res){
// 	console.log('Ya llegue a la vista de usuarios');
// 	res.send('Aqui se mostraran los usuarios');
//
// }).get('/users/:name',function(req, res){
//
// 	res.send('Hola '+ req.name);
//
// })
// //
// //
// adminRouter.get('/login',function(req, res){
// 	console.log('Accesando Login');
// 	res.send('Accesando Login');
//
// }).get('/login/:username/:userpassword',function(req, res){
//
// 	res.send('Bienvenido:  '+ req.username + req.userpassword);
//
// })
//
//
//
//
// adminRouter.get('/posts',function(req, res){
// 	res.send('Aqui se mostraran los articulos');
//
// })
//
// app.use('/admin',adminRouter);
//
//
// app.route('/account')
// .get(function(req, res){
//
// console.log('Metodo GET');
// res.send('Metodo GET');
//
// })
// .post(function(req, res){
// console.log('Metodo POST');
// res.send('Metodo POST');
// })
// .put(function(req, res){
// console.log('Metodo PUT');
// res.send('Metodo PUT');
// })
// .delete(function(req, res){
// console.log('Metodo DELETE');
// 	res.send('Metodo DELETE');
// })


return apiRouter;

// TERMINA EXPORTS ===============
}
