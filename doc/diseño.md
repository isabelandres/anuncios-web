# Documento de Diseño

## 1. Introducción

Este proyecto tiene como objetivo desarrollar una aplicación web de anuncios que permita a los usuarios publicar, listar y comentar sobre anuncios. Utilizando tecnologías serverless de Amazon Web Services (AWS), buscamos crear una solución escalable y de bajo costo que facilite la interacción entre los usuarios y los anuncios publicados.

## 2. Arquitectura

La arquitectura del sistema está diseñada en un enfoque serverless, utilizando los siguientes servicios de AWS:

- **AWS Lambda**: Funciones que manejan la lógica del backend, permitiendo ejecutar código en respuesta a eventos sin necesidad de gestionar servidores.
- **Amazon API Gateway**: Proporciona una interfaz RESTful para que los clientes interactúen con las funciones de Lambda.
- **Amazon DynamoDB**: Base de datos NoSQL que almacena anuncios y comentarios, permitiendo un acceso rápido y escalable.
- **AWS S3 (opcional)**: Para almacenar archivos estáticos, como imágenes que puedan estar asociadas a los anuncios.
- **AWS Cognito (opcional)**: Para gestionar la autenticación de usuarios, permitiendo que solo usuarios registrados puedan publicar anuncios.



## 4. Detalle de Endpoints

### 1. Listar Anuncios
- **Método:** GET
- **Endpoint:** `/api/anuncios`
- **Descripción:** Devuelve una lista de todos los anuncios.
- **Ejemplo de Solicitud:**
  ```http
  GET /api/anuncios HTTP/1.1
  Host: tu-api.com
- **Ejemplo de respuesta:**
[
  {
    "id": "1",
    "texto": "Anuncio 1",
    "comentarios": []
  },
  {
    "id": "2",
    "texto": "Anuncio 2",
    "comentarios": ["Comentario 1"]
  }
]
### 2. Ver detalles de anuncios
- **Método:** GET
- **Endpoint:** /api/anuncios/{id}
- **Descripción:** Devuelve los detalles de un anuncio específico.
- **Ejemplo de Solicitud:**
GET /api/anuncios/1 HTTP/1.1
Host: tu-api.com
- **Ejemplo de respuesta:**
{
  "id": "1",
  "texto": "Anuncio 1",
  "comentarios": []
}

### 3. Publicar un nuevo anuncio
- **Método:** POST
- **Endpoint:** /api/anuncios
- **Descripción:** Permite publicar un nuevo anuncio.
- **Ejemplo de Solicitud:**
POST /api/anuncios HTTP/1.1
Host: tu-api.com
Content-Type: application/json

{
  "texto": "Nuevo anuncio"
}
- **Ejemplo de respuesta:**
{
  "message": "Anuncio creado exitosamente"
}

### 4. Añadir comentarios a un anuncio
- **Método:** POST
- **Endpoint:** /api/anuncios/{id}/comentarios
- **Descripción:** Permite publicar un nuevo anuncio.
- **Ejemplo de Solicitud:**
POST /api/anuncios/1/comentarios HTTP/1.1
Host: tu-api.com
Content-Type: application/json

{
  "texto": "Este es un comentario"
}
- **Ejemplo de respuesta:**
{
  "message": "Comentario añadido exitosamente"
}

### Uso de servicios serverless: Al utilizar AWS Lambda y DynamoDB, solo pagaremos por el uso real de recursos, evitando costos fijos de ### servidores.
### Escalabilidad automática: DynamoDB se escala automáticamente según la demanda, lo cual es ideal para manejar picos de tráfico sin costos adicionales.
### Monitoreo y optimización: Se utilizarán servicios como AWS CloudWatch para monitorizar el uso y ajustar la configuración según sea necesario, optimizando así los costos.