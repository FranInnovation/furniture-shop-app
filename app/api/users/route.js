// app/api/users/route.js
import { NextResponse } from 'next/server';
import { getUsers, getUserByEmail } from '../../../lib/users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

const ServerSecretKey = 'Server_Secret_Key'

export async function GET() {
    const users = getUsers();
    return NextResponse.json(users);
}

export async function POST(request) {
    const { email, password } = await request.json();
    const user = getUserByEmail(email);
    console.log('USER: ', user)
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id, email: user.email }, ServerSecretKey, { expiresIn: '1h'})
        return NextResponse.json({ token });
    } else {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }


    // if (user) {
    //     return NextResponse.json(user);
    // } else {
    //     return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    // }
}
