const getDB = require('./getDB');

async function main() {
    let connection;

    try {
        connection = await getDB();

        console.log('Eliminando tablas...');

        await connection.query('DROP TABLE IF EXISTS comment');
        await connection.query('DROP TABLE IF EXISTS valoracion');
        await connection.query('DROP TABLE IF EXISTS link');
        await connection.query('DROP TABLE IF EXISTS user');

        console.log('Tablas eliminadas!');

        console.log('Creando tablas...');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS user (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(200) NOT NULL,
                avatar VARCHAR(255),
                createdAt DATETIME,
                active BOOLEAN default 1
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS link (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                description TEXT,
                link TEXT,
                createdAt DATETIME,
                idUser INT UNSIGNED NOT NULL,
                FOREIGN KEY (idUser) REFERENCES user (id)
                ON DELETE CASCADE
            )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS valoracion (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            valoracion INT NOT NULL,
            createdAt DATETIME,
            idUser INT UNSIGNED NOT NULL,
            FOREIGN KEY (idUser) REFERENCES user (id)
            ON DELETE CASCADE,
            idLink INT UNSIGNED NOT NULL,
            FOREIGN KEY (idlink) REFERENCES link (id)
            ON DELETE CASCADE
        )
    `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS comment (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            comment TEXT NOT NULL,
            createdAt DATETIME,
            idUser INT UNSIGNED NOT NULL,
            FOREIGN KEY (idUser) REFERENCES user (id)
            ON DELETE CASCADE,
            idLink INT UNSIGNED NOT NULL,
            FOREIGN KEY (idlink) REFERENCES link (id)
            ON DELETE CASCADE
        )
    `);

        console.log('Tablas creadas!');
        console.log('Insertando datos de prueba...');

        await connection.query(
            `INSERT INTO user (username, email, password, createdAt)
            VALUES ('userPrueba01', 'emailprueba@gmail.com', '123456', ?)`,
            [new Date()]
        );

        await connection.query(
            `INSERT INTO link (title, description, link, createdAt, idUser)
            VALUES ('Wikipedia', 'Enciclopedia libre', 'https://es.wikipedia.org/wiki/Wikipedia:Portada', '2022-08-09 17:00:00', 1),
            ('Netflix', 'Streaming Masivo', 'https://www.netflix.com/browse', '2022-08-12 17:00:00', 1),
            ('Facebook', 'Red social masiva', 'https://www.facebook.com/', '2021-10-29 17:00:00', 1),
            ('Gitlab', 'Pagina de Repositorios', 'https://about.gitlab.com/', '2012-06-09 17:00:00', 1)`
        );

        await connection.query(
            `INSERT INTO valoracion (valoracion, createdAt, idUser, idLink)
            VALUES (0, '2022-08-09 17:00:00', 1, 1),
            (1, '2022-08-12 17:00:00', 1, 2),
            (1, '2021-10-29 17:00:00', 1, 3)`
        );

        await connection.query(
            `INSERT INTO comment (comment, createdAt, idUser, idLink)
            VALUES ('Muy aburrido', '2022-08-09 17:00:00', 1, 1),
            ('No funciona', '2022-08-12 17:00:00', 1, 2)`
        );

        console.log('Datos de prueba insertados con exito!');
    } catch (error) {
        console.error(error.message);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();
