Controllers:

    Significado: son responsables de manejar las solicitudes entrantes desde el cliente y devolver las respuestas adecuadas. Actúan como intermediarios entre el modelo y la vista (El modelo gestiona los datos y la lógica de la aplicación, mientras que la vista presenta la interfaz de usuario y muestra los datos del modelo).
    Son funciones que controlan el flujo de datos entre el servidor y el cliente. Estas funciones suelen interactuar con la base de datos y envían las respuestas al cliente.
    Ejemplo: Si tienes un controlador de usuario, podría tener funciones como getUser, createUser, updateUser, deleteUser, etc.

Middlewares:

    Son funciones que tienen acceso al objeto de solicitud (req), al objeto de respuesta (res), y a la siguiente función de middleware en el ciclo de solicitud/respuesta de la aplicación.
    Pueden ejecutar cualquier código, realizar cambios en la solicitud y los objetos de respuesta, terminar el ciclo de solicitud/respuesta, o llamar a la siguiente función en la pila.
    Ejemplo: Un middleware para la autenticación podría verificar si un usuario está autenticado antes de permitir el acceso a ciertas rutas. Otros ejemplos incluyen middlewares para manejo de errores, logging, parsing de JSON, etc.
    
Helpers:

    Significado: Los helpers son funciones utilitarias que ayudan a simplificar y reutilizar el código dentro de la aplicación.
    Función: En esta carpeta se colocan los archivos .js que contienen funciones de ayuda o utilitarias que pueden ser usadas en diferentes partes de la aplicación. Estas funciones suelen ser independientes del ciclo de vida de las solicitudes y respuestas.
    Ejemplo: Funciones para formatear fechas, generar tokens, encriptar contraseñas, validaciones comunes, etc.