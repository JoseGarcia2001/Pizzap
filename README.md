# Pizzapp 🍕
![Group-18422.jpg](https://i.postimg.cc/rF9YXjK1/Group-18422.jpg)

Hola, esta es mi solución a la prueba técnica. 😁

Para ello usé React, con React-Router para las rutas y Redux para el manejo de estado de la aplicación la aplicación está diseñada partiendo de mobile first. Para simular la API usé json-server

Pizzapp es una aplicación donde tu puedes ser el chef, como cliente podrás diseñar las pizzas a tu gusto y guardarlas para luego poder repetir.
Como chef vas a poder crear pizzas para el menú que verán los clientes y además tener un panel de datos interesantes respecto a las ventas.

La aplicación cuenta con manejo de sesión, por ende los datos son únicos para cada usuario. Dentro de la aplicación existen dos roles, el de cliente y el de chef.

## Como chef
- Al crear pizzas serán agregadas al menú que verán todos los clientes junto con las del resto de chefs
- Eliminar pizzas del menú o propias
- Tendrás acceso a un panel de datos recopilatorios


## Como cliente
- Podrás crear tus propias pizzas
- Eliminar tus pizzas
- Comprar las pizzas creadas por los chefs y las que creaste

## Acotaciones
- Solo podrás crear una pizza si esta tiene 3 o más ingredientes
- En el menú solo aparecerán las pizzas creadas por los chefs
- La pizza tendrá un costo base de 10.000 por la masa
- No podrás crear dos usuarios con el mísmo nombre de usuario
- Como cliente no podrás eliminar pizzas del menú

### Instalación
1. Clona el repositorio y accede a la carpeta
    ```
    git clone https://github.com/JoseGarcia2001/Pizzap.git
    cd Pizzap
    ```
2. instala las dependencias
     ```
    npm install
    ```
3. En dos instancias de la consola corre  en una el servidor (La simulación con json-server)
     ```
    npm run serve
    ```
    en la otra la aplicación
    ```
    npm run start
    ```
    ¡Y listo accede a http://localhost:3000!
    
    Tienes los usuarios
    
    user: chef - password: 1234
    user: jose - password: 1234
    
    Sin embargo, puedes crear los que gustes
    
### Posdata
Fue muy cool realizar el ejercicio, no pude dedicarle el tiempo que me hubiese gustado debido a mis actuales responsabilidades. Sin embargo, hice mi mayor esfuerzo. 
¡Espero me puedan compartir su feedback respecto a la prueba! Gracias ✨
