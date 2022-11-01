const getDB = require('../../db/getDB');
const { generateError, deletePhoto, savePhoto } = require('../../helpers');
const bcrypt = require('bcrypt');

const editUserAvatar = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idUser = req.userAuth.id;

        const { email, username, oldPass, newPass } = req.body;

        const avatar = req.files?.avatar;

        if (!(avatar || email || username || oldPass || newPass)) {
            throw generateError('No se ha introducido ningún dato', 400);
        }

        if (oldPass && !newPass) {
            throw generateError(
                'Debes indicar la nueva contraseña para el cambio',
                400
            );
        }

        if (newPass && !oldPass) {
            throw generateError(
                'Debes indicar la antigua contraseña para el cambio',
                400
            );
        }
        if (newPass || oldPass) {
            if (newPass === oldPass) {
                throw generateError(
                    'La antigua y nueva contraseñas son la misma',
                    400
                );
            }
        }

        const [user] = await connection.query(
            `SELECT * FROM user WHERE id = ?`,
            [idUser]
        );
        let avatarName;
        if (avatar) {
            if (user[0].avatar) {
                await deletePhoto(user[0].avatar);
            }
            avatarName = await savePhoto(avatar);
            await connection.query(`UPDATE user SET avatar = ? WHERE id = ?`, [
                avatarName,
                idUser,
            ]);
        }

        if (email || username) {
            await connection.query(
                `UPDATE user SET email = ?, username = ? WHERE id = ?`,
                [email || user[0].email, username || user[0].username, idUser]
            );
        }

        if (oldPass && newPass) {
            const isValid = await bcrypt.compare(oldPass, user[0].password);

            if (!isValid) {
                throw generateError('La contraseña antigua no coincide', 401);
            }

            const hashedPassword = await bcrypt.hash(newPass, 10);

            await connection.query(
                `UPDATE user SET password = ? WHERE id = ?`,
                [hashedPassword, idUser]
            );
        }

        res.send({
            status: 'Ok',
            message: 'Datos del usuario modificados con éxito',
            data: avatarName,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editUserAvatar;
