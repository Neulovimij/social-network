import axios from "axios";

const istance = axios.create({
    baseURL:"https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY":"281c8ae9-01a4-4a38-b0e7-a6ad0aac3a5f"
    }
})

export const usersAPI = {
    getUsers (currentPage: number, pageSize: number) {
        return  istance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            } );
    },
    deleteFollowing (id:number) {
        return istance.delete(`follow/${id}`)
            .then(response => {
                return response.data
            } )
    },
    postFollowing (id:number) {
        return istance.post(`follow/${id}`)
            .then(response => {
                return response.data
            } )
    },

}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    captchaIsRequired = 10
}

type SingInType = {
    data: {
        id: string
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginType = {
    data: {
        userId: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const headerAuthMeAPI = {
    singIn() {
        return istance.get<SingInType>(`auth/me`)
            .then(response => {
                return response.data
            })
    },
    login(email: string | null, password: string, rememberMe: boolean = false) {
        return istance.post<LoginType>(`auth/login`, {email, password, rememberMe} )
            .then(response => {
                return response.data
            })
    },
    logOut() {
        return istance.delete(`auth/login` )
            .then(response => {
                return response.data
            })
    },
}

export const profileAPI = {
    getProfile (userId: string) {
        return istance.get(`profile/`+ userId)
            .then(response => {
                return response.data
            })
    },
    getStatus (userId: string) {
        return istance.get(`profile/status/`+ userId)
            .then(response => {
                return response.data
            })
    },
    updateStatus (status: string) {
        return istance.put(`profile/status/`, {status: status})
            .then(response => {
                return response.data
            })
    },
}
