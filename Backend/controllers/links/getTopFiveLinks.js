const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getTopFiveLinks = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        let topLinks;

        [topLinks] = await connection.query(
            `SELECT DISTINCT link.id, link.idUser, link.title, link.link, (select count(*) from valoracion where link.id = valoracion.idLink AND valoracion.valoracion = 0) as likes, (select count(*) from valoracion where link.id = valoracion.idLink AND valoracion.valoracion = 1) as dislikes, user.username, user.avatar
    FROM link LEFT JOIN valoracion
	ON (link.id = valoracion.idLink)
    LEFT JOIN user ON (link.idUser = user.id)
    ORDER BY (likes - dislikes) DESC
    LIMIT 4`
        );
        if (topLinks.length < 1) {
            throw generateError('No se apodido obtener ningún enlace', 404);
        }

        const data = topLinks;
        res.send({
            status: 'Ok',
            data: data,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getTopFiveLinks;
