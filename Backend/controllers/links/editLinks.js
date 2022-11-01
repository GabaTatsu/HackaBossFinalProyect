const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const editLinks = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idLink } = req.params;

        const idUser = req.userAuth.id;

        const { title, description, link } = req.body;

        if (!(title || description || link)) {
            throw generateError('No se ha introducido ningún dato', 400);
        }

        const [links] = await connection.query(
            `SELECT title, description, link, idUser FROM link WHERE id = ?`,
            [idLink]
        );

        if (links.length < 1) {
            throw generateError('No existe el enlace seleccionado', 404);
        }

        if (idUser !== links[0].idUser) {
            throw generateError(
                'No eres el propietario del enlace a editar',
                404
            );
        }

        await connection.query(
            `UPDATE link SET title = ?, description = ?, link = ? WHERE id = ?`,
            [
                title || links[0].title,
                description || links[0].description,
                link || links[0].link,
                idLink,
            ]
        );

        res.send({
            status: 'Ok',
            message: `El enlace con título "${title}", ha sido modificado con éxito!`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editLinks;
