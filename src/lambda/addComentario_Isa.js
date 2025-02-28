const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const anuncioId = event.pathParameters.id; // Obtener el ID del anuncio
    const comentario = JSON.parse(event.body); // Obtener el cuerpo de la solicitud

    // Obtener el anuncio actual
    const getParams = {
        TableName: 'Anuncios_Isa',
        Key: {
            id: anuncioId
        }
    };

    try {
        const data = await docClient.get(getParams).promise();
        if (!data.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Anuncio no encontrado' })
            };
        }

        // Agregar el nuevo comentario
        const updatedComentarios = [...data.Item.comentarios, comentario.texto];

        const updateParams = {
            TableName: 'Anuncios',
            Key: { id: anuncioId },
            UpdateExpression: 'set comentarios = :c',
            ExpressionAttributeValues: {
                ':c': updatedComentarios
            }
        };

        await docClient.update(updateParams).promise();

        return {
            statusCode: