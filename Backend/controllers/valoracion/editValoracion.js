const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const editValoracion = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idLink } = req.params;

        const { valoracion } = req.body;

        const idReqUser = req.userAuth.id;

        if (valoracion === undefined || valoracion === null) {
            throw generateError('No se ha introducido ningún dato', 400);
        }

        const [valoraciones] = await connection.query(
            `SELECT * FROM valoracion WHERE idLink = ? AND idUser = ?`,
            [idLink, idReqUser]
        );
        let data = valoraciones;

        if (valoraciones.length < 1) {
            await connection.query(
                `INSERT INTO valoracion (valoracion, idUser, idLink, createdAt)
          VALUES (?, ?, ?, ?)`,
                [valoracion, idReqUser, idLink, new Date()]
            );
            data = [];
        } else if (valoraciones[0].valoracion === +valoracion) {
            await connection.query(`DELETE FROM valoracion WHERE id = ?`, [
                valoraciones[0].id,
            ]);
        } else {
            await connection.query(
                `UPDATE valoracion SET valoracion = ? WHERE id = ?`,
                [valoracion, valoraciones[0].id]
            );
        }

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

module.exports = editValoracion;
