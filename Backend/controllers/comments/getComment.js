const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getComment = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idLink } = req.params;

        const [comments] = await connection.query(
            ` SELECT comment.id, comment.comment, comment.createdAt, comment.idLink, comment.idUser, user.username, user.avatar
            FROM comment LEFT JOIN user
            ON (comment.idUser = user.id)
            WHERE idLink = ?
            ORDER BY comment.createdAt DESC`,
            [idLink]
        );

        const data = comments;

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

module.exports = getComment;
