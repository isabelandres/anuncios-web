const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const anuncio = JSON.parse(event.body); // Obtener el cuerpo de la solicitud
    const params = {
        TableName: 'Anuncios',
        Item: {
            id: Date.now().toString(), // Generar un ID único
            texto: anuncio.texto,
            comentarios: []
        }
    };

    try {
        await docClient.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Anuncio creado exitosamente' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al crear el anuncio' })
        };
    }
};