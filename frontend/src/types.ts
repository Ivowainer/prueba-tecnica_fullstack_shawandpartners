import type { IPersona } from "../../shared/types/persona"

export interface ApiUploadResponse {
    message?: string;
    data: IPersona[];
}