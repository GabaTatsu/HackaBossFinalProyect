const getDB = require('../../db/getDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../../helpers');
const { token } = require('morgan');
require('dotenv').config();

const loginUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { email, password } = req.body;

        if (!email) {
            throw generateError('Falta el correo electrónico', 400);
        }

        if (!password) {
            throw generateError('Falta la contraseña', 400);
        }

        const [user] = await connection.query(
            `SELECT id, email, password FROM user WHERE email = ? AND active = ?`,
            [email, 1]
        );

        if (user.length < 1) {
            throw generateError(
                'No existe un usuario registrado con ese email',
                404
            );
        }

        const validPassword = await bcrypt.compare(password, user[0].password);

        if (!validPassword) {
            throw generateError('La contraseña es incorrecta', 401);
        }
        const tokenInfo = {
            id: user[0].id,
        };

        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '10d',
        });

        res.send({
            status: 'Ok',
            authToken: token,
            message: `Has iniciado sesión`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = loginUser;
