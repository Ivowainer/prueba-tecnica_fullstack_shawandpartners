import type { ApiUploadResponse } from "./types";

export const uploadFile = async (file: File): Promise<[Error?, ApiUploadResponse?]> => {

    const formData = new FormData();
    formData.append("file", file);
    try {

        const res = await fetch("http://localhost:3000/api/files", {
            method: "POST",
            body: formData
        })

        if(!res.ok) return [new Error(`Error subiendo archivo: ${res.statusText}`)]
        const data = await res.json() as ApiUploadResponse;
        return [undefined, data]
    } catch (e) {
        if(e instanceof Error) return [e]
    }

    return [new Error("Error desconocido")]
}