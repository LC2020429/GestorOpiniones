import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Opinion Gestor API",
            version: "1.0.0",
            description: "Api simulando las publicaciones de opinion de X",
            contact:{
                name: "Luis Cordova",
                email: "lcordova-2020429@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3002/opionGestor/v1"
            }
        ]
    },
    apis:[
        
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}