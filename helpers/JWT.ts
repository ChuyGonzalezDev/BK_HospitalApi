import jwt from 'jsonwebtoken';

require('dotenv').config();

function generateJWT(id: any, name: string) {
    const payload = { id, name };
    
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRETPRIVATEKEY || '', {
            expiresIn: '24h',
        }, (error, token) => {
            if (error) {
                /** No valido */
                console.log(error);
                reject(error);
            } else {
                /** Valido */
                resolve(token);
            }
        });
    });
}

export { generateJWT }