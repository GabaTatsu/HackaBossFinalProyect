const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();
        const { idUser } = req.params;
        const [[user]] = await connection.query(
            `SELECT username, id, email, avatar, createdAt FROM user WHERE id = ?`,
            [idUser]
        );

        if (!user) {
            throw generateError('No existe el usuario seleccionado', 404);
        }

        const [userLinks] = await connection.query(
            `SELECT DISTINCT link.id, link.idUser, link.title, link.description, link.link, link.createdAt, (select count(*) from valoracion where link.id = valoracion.idLink AND valoracion.valoracion = 0) as likes, (select count(*) from valoracion where link.id = valoracion.idLink AND valoracion.valoracion = 1) as dislikes
            FROM link LEFT JOIN valoracion
            ON (link.id = valoracion.idLink)
            WHERE link.idUser = ?`,
            [idUser]
        );

        res.send({
            status: 'Ok',
            data: { ...user, userLinks },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getUser;
