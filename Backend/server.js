const express = require('express');
const morgan = require('morgan');
const fileUptoad = require('express-fileupload');
const cors = require('cors');

const app = express();

app.use(
    cors({
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    })
);

app.use(express.json());

app.use(express.static('static'));

app.use(morgan('dev'));

app.use(fileUptoad());

/**
 * ###################
 * ### Middlewares ###
 * ###################
 */

const isAuth = require('./middlewares/isAuth');

/**
 * #################################
 * ### CONTROLADORES DE USUARIOS ###
 * #################################
 */

const getUser = require('./controllers/users/getUser');
const newUser = require('./controllers/users/newUser');
const loginUser = require('./controllers/users/loginUser');
const deleteUser = require('./controllers/users/deleteUser');
const editUser = require('./controllers/users/editUser');

/**
 * ##############################
 * ### CONTROLADORES DE LINKS ###
 * ##############################
 */

const deleteLink = require('./controllers/links/deleteLink');
const getLinks = require('./controllers/links/getLinks');
const newLinks = require('./controllers/links/newLinks');
const editLinks = require('./controllers/links/editLinks');
const getTopFiveLinks = require('./controllers/links/getTopFiveLinks');

/**
 * #####################################
 * ### CONTROLADORES DE VALORACIONES ###
 * #####################################
 */

const editValoracion = require('./controllers/valoracion/editValoracion');

/**
 * ####################################
 * ### CONTROLADORES DE COMENTARIOS ###
 * ####################################
 */

const newComment = require('./controllers/comments/newComment');
const getComment = require('./controllers/comments/getComment');
const editComment = require('./controllers/comments/editComment');
const deleteComment = require('./controllers/comments/deleteComment');

/**
 * #############################
 * ### ENDPOINTS DE USUARIOS ###
 * #############################
 */

app.get('/users/:idUser', getUser);
app.post('/register', newUser);
app.post('/login', loginUser);
app.post('/users/delete', isAuth, deleteUser);
app.put('/users/edit', isAuth, editUser);

/**
 * ##########################
 * ### ENDPOINTS DE LINKS ###
 * ##########################
 */

app.delete('/links/delete/:idLink', isAuth, deleteLink);
app.get('/links', getLinks);
app.post('/links/new', isAuth, newLinks);
app.put('/links/:idLink', isAuth, editLinks);
app.get('/links/topfive', getTopFiveLinks);

/**
 * #################################
 * ### ENDPOINTS DE VALORACIONES ###
 * #################################
 */

app.put('/valoraciones/edit/:idLink', isAuth, editValoracion);

/**
 * ################################
 * ### ENDPOINTS DE COMENTARIOS ###
 * ################################
 */

app.post('/comment/new', isAuth, newComment);
app.get('/comment/:idLink', getComment);
app.put('/comment/:id', isAuth, editComment);
app.delete('/comment/delete/:id', isAuth, deleteComment);

//////////////////////

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.httpStatus || 500);
    res.send({
        status: 'Error',
        message: error.message,
    });
});

app.use((req, res) => {
    res.status(404);
    res.send({
        status: 'Error',
        message: 'Not found',
    });
});

app.listen(4000, () => {
    console.log('Server listening at http://localhost:4000');
});
