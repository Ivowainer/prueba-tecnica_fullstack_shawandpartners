import express from "express";
import multer from "multer";
import ctj from "convert-csv-to-json";
import fs from "node:fs";
import { matchPerson } from "./util.js";

export interface IPersona {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    age: string;
    country: string;
    company: string;
    job_title: string;
    signup_date: string;
}

const app = express();
const PORT = 3000;

app.get("/api/users", (req, res) => {
    if (Object.keys(req.query).length === 0) {
        return res.status(400).json({ message: "No hay query param" });
    }

    try {
        const jsonString = fs.readFileSync("db.json", "utf-8");
        const data: IPersona[] = JSON.parse(jsonString);

        if (req.query.q?.length == 0) {
            return res.status(200).json({ data });
        }

        const queryAux: string = req.query.q as string;
        const query: string = queryAux.toLowerCase();
        const filteredData = data.reduce((arr: IPersona[], person) => {
            if (matchPerson(person.first_name.toLocaleLowerCase(), query)) arr.push(person);
            if (matchPerson(person.company.toLocaleLowerCase(), query)) arr.push(person);
            if (matchPerson(person.id.toLocaleLowerCase(), query)) arr.push(person);
            if (matchPerson(person.job_title.toLocaleLowerCase(), query)) arr.push(person);
            if (matchPerson(person.last_name.toLocaleLowerCase(), query)) arr.push(person);
            if (matchPerson(person.country.toLocaleLowerCase(), query)) arr.push(person);
            if (matchPerson(person.email.toLocaleLowerCase(), query)) arr.push(person);
            return arr;
        }, []);

        return res.status(200).json({ data: filteredData });
    } catch (error) {
        return res.status(500).json({ message: "Error interno" });
    }
});

app.post("/api/files", multer().single("file"), (req, res) => {
    console.log(req.file);
    if (!req.file || req.file.mimetype != "text/csv" || req.file.fieldname != "file") {
        return res.status(400).json({ message: "Archivo invalido" });
    }

    try {
        const dataString = req.file?.buffer.toString();
        const data = ctj.fieldDelimiter(",").csvStringToJsonStringified(dataString!);
        fs.writeFileSync("db.json", data);
    } catch (error) {
        return res.status(500).json({ message: "Error interno" });
    }

    res.status(200).json({ message: "El archivo se cargó correctamente" });
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
