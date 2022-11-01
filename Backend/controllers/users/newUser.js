const getDB = require('../../db/getDB');
const bcrypt = require('bcrypt');
const { generateError } = require('../../helpers');

const newUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { email, username, password } = req.body;

        if (!email) {
            throw generateError('Faltan el correo electrónico', 400);
        }
        if (!username) {
            throw generateError('Faltan el nombre de usuario', 400);
        }
        if (!password) {
            throw generateError('Falta la contraseña', 400);
        }

        const [user] = await connection.query(
            `SELECT id, active FROM user WHERE email = ? AND active = ?`,
            [email, 1]
        );

        const [oldUser] = await connection.query(
            `SELECT * FROM user WHERE email = ? AND active = ?`,
            [email, password, 0]
        );

        if (user.length > 0) {
            throw generateError('Ya existe un usuario con ese email', 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (oldUser.length > 0) {
            await connection.query(
                `UPDATE user SET active = ?, username = ?, password = ? WHERE id = ?`,
                [1, username, hashedPassword, oldUser[0].id]
            );
        } else {
            await connection.query(
                `INSERT INTO user (username, email, password, createdAt)
        VALUES (?, ?, ?, ?)`,
                [username, email, hashedPassword, new Date()]
            );
        }

        res.send({
            status: 'Ok',
            message: 'Usuario creado con éxito',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newUser;
