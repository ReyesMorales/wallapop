# Wallapop (Clon)
NOVEDADES:
- Cada vez que se cree un nuevo usuario, se enviara un correo de verificacion del correo "whataduck.project@gmail.com"
- Cada vez que se inicia sesión se guardan 3 Cookies. (El primero guarda el token de Sesion, el segundo guarda el nombre del Usuario que inicio sesion, la tercera Cookie guarda el correo de el Usuario que inicio sesión
- El buscador de publicacion funciona con los nombres de los productos
- Al cerrar Sesion, se ocultan las publicaciones disponibles y tambien se borran todas las Cookies.

- NOTA: En las carpetas de "backend" y "frontend" se encuentran 2 documentos "env.txt", al descargar el codigo, instalar mediante la terminal las dependencias con el comando "npm i" y despues crear un nuevo archivo .env en cada carpeta y despues copiar y pegar toda la informacion en los 2 archivos "env.txt" diferentes.

- Si ocurre un error en el envio de Correo, es posible que sea porque se intenta enviar desde otro país diferente al país de origen que fue creado el Correo (Ecuador).
- Ejecutar el Backend y el Frontend con el comando "npm run start" en terminales separadas. El codigo Frontend corre en el puerto 3000 mientras que el BackEnd corre en el puerto 4000
- La Base de datos se llama wallapop, con 2 colecciones de "adverts" y de "users", en el caso de que no se cree automaticamente, se puede crear manualmente


