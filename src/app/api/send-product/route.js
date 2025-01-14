import { connection } from "../../db/dbConnection";

export async function POST(req) {
    try {
        const data = await req.json();

        console.log(data)

        connection.connect();



   
        connection.end();

        return new Response("Datos procesados correctamente.", { status: 200 });
    } catch (error) {
        console.error("Error en la operación:", error.message);
        return new Response("Error procesando la solicitud.", { status: 500 });
    }
}