import { response } from 'express';

const createUser = (req: any, res = response) => {
    const { name, email, password } = req.body;

    return res.json({
        ok: true,
        msg: 'Crear usuario /create'
    });
}

const login = (req: any, res = response) => {
    const { email, password } = req.body;

    return res.json({
        ok: true,
        msg: 'Login usuario /'
    });
}

const tokenRenew = (req: any, res = response) => {
    return res.json({
        ok: true,
        msg: 'Renew'
    });
}

export {
    createUser,
    login,
    tokenRenew
};