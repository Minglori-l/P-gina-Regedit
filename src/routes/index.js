var express = require('express');
var router = express.Router();
const usersControllers = require("../controllers/users.controles");
const postsControllers = require("../controllers/posts.controles");
const { users } = require('../database/database');

// Ruta para ver usuarios vista
router.get("/users", function (req, res, next) {
  usersControllers
    .getAll()
    .then((resultado) => {
      res.render('index', {
        users: resultado,
        title: "Usuarios de Regedit",
        menssage: false
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para ver publicaciones vista
router.get("/posts", function (req, res, next) {
  postsControllers
    .getAll()
    .then((resultado) => {
      res.render('posts', {
        posts: resultado,
        title: "Publicaciones de Regedit",
        menssage: false
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para eliminar usuarios views
router.get("/users-delete/:user", function (req, res, next) {
  usersControllers
    .delete(req.params.user)
    .then((resultado) => {
      res.render("index", {
        users: resultado.users,
        menssage: resultado.mensaje,
        title: "Usuarios de Regedit",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para registrar usuarios views
router.post("/users-register", function (req, res, next) {
  usersControllers
    .register(req.body)
    .then((resultado) => {
      res.render('index', {
        title: "Usuario Nuevo",
        users: [resultado],
        menssage: "Registrado el usuario con exito",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para editar usuarios views
router.post("/users-edit", function (req, res, next) {
  usersControllers
    .edit(req.body)
    .then((resultado) => {
      res.render('index', {
        title: "Usuario Editado",
        users: [resultado],
        menssage: "Editado el usuario con exito",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para registrar publicaciones views
router.post("/posts-add", function (req, res, next) {
    postsControllers
    .add(req.body)
    .then((resultado) => {
      res.render('posts', {
        title: "Nueva Publicación",
        posts: [resultado],
        menssage: "Publicación subida con éxito",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

module.exports = router;
