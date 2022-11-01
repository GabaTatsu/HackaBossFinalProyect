const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const deleteLink = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idLink } = req.params;

        const idUser = req.userAuth.id;

        const [link] = await connection.query(
            `SELECT * FROM link WHERE id = ?`,
            [idLink]
        );

        if (link.length < 1) {
            throw generateError('No existe el enlace seleccionado', 404);
        }

        if (idUser !== link[0].idUser) {
            throw generateError(
                'No eres el propietario del enlace a editar',
                404
            );
        }

        await connection.query(`DELETE FROM link WHERE id = ?`, [idLink]);
        res.send({
            status: 'Ok',
            message: `El enlace con título "${link[0].title}", ha sido eliminado con éxito`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteLink;
