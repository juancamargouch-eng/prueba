import 'dotenv/config';
import app from './app.js';
import { testConnection } from './shared/db.js';

const PORT = process.env.PORT || 4000;

const iniciar = async () => {
    await testConnection();

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost: ${PORT}`);
    });
};

iniciar();