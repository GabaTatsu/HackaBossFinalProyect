const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const newComment = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { comment, idLink } = req.body;

        const idReqUser = req.userAuth.id;

        if (!comment) {
            throw generateError('No se ha introducido ningún comentario', 400);
        }

        await connection.query(
            `INSERT INTO comment (comment, createdAt, idUser, idLink)
        VALUES (?, ?, ?, ?)`,
            [comment, new Date(), idReqUser, idLink]
        );
        const newComment = await connection.query(
            `SELECT comment.id, comment.comment, comment.createdAt, comment.idLink, comment.idUser, user.username, user.avatar
            FROM comment LEFT JOIN user
            ON (comment.idUser = user.id) 
            ORDER BY comment.id DESC LIMIT 1`
        );

        res.send({
            status: 'Ok',
            message: 'Comentario insertado con éxito!',
            data: newComment[0],
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};
module.exports = newComment;
