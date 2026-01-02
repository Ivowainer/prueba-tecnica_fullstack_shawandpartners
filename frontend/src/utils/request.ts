import type { ApiUploadResponse } from "../types";

export const requestFilter = async (search: string): Promise<[Error?, ApiUploadResponse?]> => {
    try {
        const res = await fetch(`http://localhost:3000/api/users?q=${search}`, {
            method: "GET"   
        })

        if(!res.ok) return [new Error("Error interno")]

        const data = await res.json() as ApiUploadResponse

        if(data.message) return [new Error(data.message)]

        if(data.data) return [undefined, data]

    } catch (error) {
        if(error instanceof Error) return [error]
    }

    return [new Error("Error interno")]

}