const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const newLinks = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { title, description, link } = req.body;

        const idReqUser = req.userAuth.id;

        if (!title) {
            throw generateError('Debes indicar el título', 400);
        }
        if (!link) {
            throw generateError('Debes indicar el enlace', 400);
        }
        if (title.length < 5) {
            throw generateError(
                'El título del enlace debe tener más de 4 caracteres',
                400
            );
        }

        await connection.query(
            `INSERT INTO link (title, description, link, createdAt, idUser)
            VALUES (?, ?, ?, ?, ?)`,
            [title, description, link, new Date(), idReqUser]
        );

        res.send({
            status: 'Ok',
            message: 'Enlace insertado con éxito!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newLinks;
