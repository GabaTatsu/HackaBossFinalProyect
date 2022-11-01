const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const getLinks = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        let { search, order, direction, initDate, finalDate } = req.query;

        const validOrderOptions = ['title', 'idUser', 'createdAt'];

        const validDirectionOptions = ['DESC', 'ASC'];

        const orderBy = validOrderOptions.includes(order)
            ? order
            : 'link.createdAt';

        const orderDirection = validDirectionOptions.includes(direction)
            ? direction
            : 'DESC';

        let links;

        if (!search) {
            search = '%';
        }
        if (!initDate) {
            const [iniDate] = await connection.query(
                `SELECT DATE_FORMAT(MIN(createdAt), '%Y-%m-%d %H:%i:%s') as TopDate
                FROM link limit 1`
            );
            initDate = iniDate[0].TopDate;
        } else {
            initDate = initDate + ' 00:00:00';
        }
        if (!finalDate) {
            const [finDate] = await connection.query(
                `SELECT DATE_FORMAT(MAX(createdAt), '%Y-%m-%d %H:%i:%s') as TopDate
                FROM link limit 1`
            );
            finalDate = finDate[0].TopDate;
        } else {
            finalDate = finalDate + ' 23:59:59';
        }

        [links] = await connection.query(
            `SELECT DISTINCT link.id, link.idUser, link.title, link.description, link.link, link.createdAt, (select count(*) from valoracion where link.id = valoracion.idLink AND valoracion.valoracion = 0) as likes, (select count(*) from valoracion where link.id = valoracion.idLink AND valoracion.valoracion = 1) as dislikes, user.username, user.avatar
                FROM link LEFT JOIN valoracion
                ON (link.id = valoracion.idLink)
                LEFT JOIN user ON (link.idUser = user.id) 
                WHERE (link.link LIKE ? OR link.description LIKE ? OR link.title LIKE ? OR user.username LIKE ?) AND link.createdAt >= ? AND link.createdAt <= ?
                ORDER BY ${orderBy} ${orderDirection}`,
            [
                `%${search}%`,
                `%${search}%`,
                `%${search}%`,
                `%${search}%`,
                `${initDate}`,
                `${finalDate}`,
            ]
        );

        if (links.length < 1) {
            throw generateError(
                'No existe ningún enlace con los parámetros indicados',
                404
            );
        }

        const data = links;

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

module.exports = getLinks;
