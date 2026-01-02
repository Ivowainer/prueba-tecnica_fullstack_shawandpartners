import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

import "./App.css";
import { uploadFile } from "./utils/upload";
import type { IPersona } from "../../shared/types/persona";
import UserCard from "./components/UserCard";
import { requestFilter } from "./utils/request";
import { useDebounce } from "@uidotdev/usehooks";

function App() {
    const [data, setData] = useState<IPersona[] | null>(null);
    const [search, setSearch] = useState<string>("");
    const [, setIsSearching] = useState<boolean>(false);
    const debouncedSearchTerm = useDebounce(search, 100);

    useEffect(() => {
        const request = async () => {
            setIsSearching(true)
            if(debouncedSearchTerm || debouncedSearchTerm.trim() === ""){
                const [error, response] = await requestFilter(search)
                if(error) return toast.error(error.message)
                    if(response!.data) return setData(response!.data)
            }
            setIsSearching(false)
        }

        request()
    }, [debouncedSearchTerm])

    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const selectedFile = e.target.files?.[0];
        if (!selectedFile || selectedFile.type != "text/csv") return toast.error("Archivo incorrecto");

        const [error, response] = await uploadFile(selectedFile);
        if (error) return toast.error(error.message);

        if (response?.data) {
            setData(response?.data)
            toast.success("Archivo subido correctamente");
        };
    };

    return (
        <>
            <Toaster />
            <main className="px-20 py-12 w-full">
                <form className="flex w-full justify-between gap-2 mb-10">
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} className="w-full border rounded-md focus:outline-none px-4" placeholder="Nombre, apellido, país, email, empresa, edad..." />
                    <input type="file" name="file" onChange={(e) => handleSubmit(e)} id="hidden-file-input" className="file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-500 hover:file:bg-gray-600 file:cursor-pointer file:transition-colors" />
                </form>

                {data ? (
                    <div className="grid grid-cols-3 gap-2">
                        {data?.map((person) => (
                            <UserCard key={person.id} person={person} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-300 text-4xl">Todavia no has subido ningún archivo</p>
                )}
            </main>
        </>
    );
}

export default App;
