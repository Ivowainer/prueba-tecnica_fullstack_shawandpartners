import express from "express"
import multer from "multer"
import ctj from "convert-csv-to-json"
import fs from "node:fs"

const app = express()
const PORT = 3000

app.get("/api/users", (req, res) => {
    res.status(200).send("working...")
})

app.post("/api/files", multer().single("file"), (req, res) => {

    console.log(req.file)
    if(!req.file || req.file.mimetype != "text/csv" || req.file.fieldname != "file"){
        res.status(400).json({ message: "Archivo invalido" })
    }

    try {
        const dataString = req.file?.buffer.toString()
        const data = ctj.fieldDelimiter(",").csvStringToJsonStringified(dataString!)
        fs.writeFileSync("db.json", data)
    } catch (error) {
        res.status(500).json({ message: "Error interno" })
    }

    res.status(200).json({ message: "El archivo se cargó correctamente" })
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})