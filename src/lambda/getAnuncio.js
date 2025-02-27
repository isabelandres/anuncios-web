const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const anuncioId = event.pathParameters.id; // Obtener el ID del anuncio de los parámetros de la ruta
    const params = {
        TableName: 'Anuncios',
        Key: {
            id: anuncioId
        }
    };

    try {
        const data = await docClient.get(params).promise();
        if (!data.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Anuncio no encontrado' })
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al obtener el anuncio' })
        };
    }
};