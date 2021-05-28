import jwt from 'jsonwebtoken';

function generateJWT(uid: any, name: string, seed: any) {
    const payload = { uid, name };
    const secret = seed;

    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, {
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