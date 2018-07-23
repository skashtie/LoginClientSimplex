import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`https://simplex-smart3d.com:4000/users`);
    }

    getById(id: number) {
        return this.http.get(`https://simplex-smart3d.com:4000/users/` + id);
    }

    register(user: User) {
        return this.http.post(`https://simplex-smart3d.com:4000/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`https://simplex-smart3d.com:4000/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`https://simplex-smart3d.com:4000/users/` + id);
    }
}
