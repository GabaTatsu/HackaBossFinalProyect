const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const editComment = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { id } = req.params;

        const { comment } = req.body;

        const idUser = req.userAuth.id;

        if (!comment) {
            throw generateError(
                'No se ha introducido un nuevo comentario',
                400
            );
        }

        const [comments] = await connection.query(
            `SELECT * FROM comment WHERE id = ?`,
            [id]
        );

        if (comments.length < 1) {
            throw generateError('No existe el comentario seleccionado', 404);
        }

        if (comments[0].idUser !== idUser) {
            throw generateError(
                'No eres el propietario del comentario a editar',
                404
            );
        }

        await connection.query(`UPDATE comment SET comment = ? WHERE id = ?`, [
            comment,
            id,
        ]);

        res.send({
            status: 'Ok',
            message: `El comentario ha sido modificado con éxito!`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editComment;
