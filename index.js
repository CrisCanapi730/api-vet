const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// Conexión con la BD en Azure
const db = mysql.createConnection({
    host: "vetpatito.mysql.database.azure.com",
    user: "sergio",
    password: "@Te20to00",
    database: "veterinaria",
    port: 3306,
    ssl: { rejectUnauthorized: true } 
});

// Probar la conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error al conectar con la base de datos:", err);
    } else {
        console.log("Conexión exitosa a la base de datos en Azure");
    }
});

// Rutas del backend
app.get("/", (req, res) => {
    res.send("¡La API está funcionando correctamente!");
});
// BACKEND USUARIOS
app.post("/create", (req, res) => {
    const { nombre, correo, contrasena, rol } = req.body;

    db.query(
        "INSERT INTO usuarios(nombre, correo, contrasena, rol) VALUES(?,?,?,?)",
        [nombre, correo, contrasena, rol],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al registrar el usuario");
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/usuarios", (req, res) => {
    db.query("SELECT * FROM usuarios", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al cargar los usuarios");
        } else {
            res.send(result);
        }
    });
});

app.put("/update", (req, res) => {
    const { nombre, correo, contrasena, rol, id } = req.body;

    db.query(
        "UPDATE usuarios SET nombre=?, correo=?, contrasena=?, rol=? WHERE id=?",
        [nombre, correo, contrasena, rol, id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al actualizar el usuario");
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM usuarios WHERE id=?", [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al eliminar el usuario");
        } else {
            res.send(result);
        }
    });
});

// BACKEND MASCOTAS
app.post("/createMascota", (req, res) => {
    const { nombre, especie, edad, id_usuario } = req.body;

    db.query(
        "INSERT INTO mascotas(nombre, especie, edad, id_usuario) VALUES(?,?,?,?)",
        [nombre, especie, edad, id_usuario],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al registrar la mascota");
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/mascotas", (req, res) => {
    db.query("SELECT * FROM mascotas", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al cargar las mascotas");
        } else {
            res.send(result);
        }
    });
});

app.put("/updateMascota", (req, res) => {
    const { nombre, especie, edad, id_usuario, id } = req.body;

    db.query(
        "UPDATE mascotas SET nombre=?, especie=?, edad=?, id_usuario=? WHERE id=?",
        [nombre, especie, edad, id_usuario, id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al actualizar la mascota");
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/deleteMascota/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM mascotas WHERE id=?", [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al eliminar la mascota");
        } else {
            res.send(result);
        }
    });
});

// BACKEND PRODUCTOS
app.post("/createProducto", (req, res) => {
    const { nombre, descripcion, precio, contenido, cantidadUnidades, imagen } = req.body;

    db.query(
        "INSERT INTO productos(nombre, descripcion, precio, contenido, cantidadUnidades, imagen) VALUES(?,?,?,?,?,?)",
        [nombre, descripcion, precio, contenido, cantidadUnidades, imagen],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al registrar el producto");
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/productos", (req, res) => {
    db.query("SELECT * FROM productos", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al cargar los productos");
        } else {
            res.send(result);
        }
    });
});

app.put("/updateProducto", (req, res) => {
    const { nombre, descripcion, precio, contenido, cantidadUnidades, imagen, cod } = req.body;

    db.query(
        "UPDATE productos SET nombre=?, descripcion=?, precio=?, contenido=?, cantidadUnidades=?, imagen=? WHERE cod=?",
        [nombre, descripcion, precio, contenido, cantidadUnidades, imagen, cod],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al actualizar el producto");
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/deleteProducto/:cod", (req, res) => {
    const { cod } = req.params;

    db.query("DELETE FROM productos WHERE cod=?", [cod], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al eliminar el producto");
        } else {
            res.send(result);
        }
    });
});

// BACKEND CITAS
app.post("/createCitas", (req, res) => {
    const { fecha, hora, id_mascota, id_usuario, especie, nivel_urgencia } = req.body;

    db.query(
        "INSERT INTO citas(fecha, hora, id_mascota, id_usuario, especie, nivel_urgencia) VALUES(?,?,?,?,?,?)",
        [fecha, hora, id_mascota, id_usuario, especie, nivel_urgencia],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al registrar la cita");
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/citas", (req, res) => {
    db.query("SELECT * FROM citas", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al cargar las citas");
        } else {
            res.send(result);
        }
    });
});

app.put("/updateCitas/:id", (req, res) => {
    const { fecha, hora, id_mascota, id_usuario, especie, nivel_urgencia } = req.body;
    const { id } = req.params;

    db.query(
        "UPDATE citas SET fecha=?, hora=?, id_mascota=?, id_usuario=?, especie=?, nivel_urgencia=? WHERE id=?",
        [fecha, hora, id_mascota, id_usuario, especie, nivel_urgencia, id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al actualizar la cita");
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/deleteCitas/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM citas WHERE id=?", [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al eliminar la cita");
        } else {
            res.send(result);
        }
    });
});

// Servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
