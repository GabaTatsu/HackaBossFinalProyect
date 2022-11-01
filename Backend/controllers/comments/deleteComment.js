const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const deleteComment = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { id } = req.params;

        const idUser = req.userAuth.id;

        const [comments] = await connection.query(
            `SELECT * FROM comment WHERE id = ?`,
            [id]
        );

        if (comments.length < 1) {
            throw generateError('No existe el comentario seleccionado', 404);
        }

        if (idUser !== comments[0].idUser) {
            throw generateError(
                'No eres el propietario del comentario a eliminar',
                404
            );
        }

        await connection.query(`DELETE FROM comment WHERE id = ?`, [id]);

        res.send({
            status: 'Ok',
            message: `El comentario ha sido eliminado con éxito`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteComment;
