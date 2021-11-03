export class Appsettings {
  // Tiempo
  public static TIME_NOTIFICACION = 10;
  // Mensajes
  public static MESSAGE_DELETE = 'El producto fue eliminado correctamente';
  public static MESSAGE_PRODUCT = 'Producto';
  public static MESSAGE_PRODUCT_DELETE = '¿Eliminar producto?';
  public static MESSAGE_PRODUCT_CART = 'Producto agregado al carrito';
  public static MESSAGE_PUBLISH_STORE = 'Todo listo 👌\n Tu tienda fue publicada correctamente.';
  public static MESSAGE_ERROR_LOGIN = 'Usuario y/o contraseña incorrectos.';
  public static MESSAGE_ERROR_NETWORK = 'Verifique su conexión a internet e vuelva a internar.';
  public static MESSAGE_ERROR_POPUP_CLOSE = 'No se pudo validar su cuenta de Google por un cierre inesperado del pop-up. \nIntente nuevamente.';
  public static MESSAGE_ERROR_REGISTER =
    'Se produjo un error en su registro\n Vuelva a intentar!';
  public static MESSAGE_SUCCESS_REGISTER = 'Registro exitoso!';
  // Botones
  public static BTN_DELETE = 'Eliminar';
  public static BTN_PUBLISH = 'Publicar';
  public static BTN_CANCEL = 'Cancelar';
  // Rutas
  public static RUTA_LOGIN = '/user/login';
  public static RUTA_ADMIN = '/panel/products';
  // Path Realtime firebase
  public static PATH_STORES = '/stores';
  public static PATH_STORES_VERIFIED = '/stores-verified';
  public static PATH_ORDER = '/orders';
  public static PATH_PRODUCTS = 'products';
  public static PATH_STORAGE_IMAGES = 'images/';
  public static PATH_LOGO = '/logo';
  public static PATH_TIENDA_VERIFIED = 'https://superstore.web.app/';
  // Listado de categorías de tiendas
  public static CATEGORIAS = [
    { nombre: 'Alimentos', icono: 'restaurant' },
    { nombre: 'Alquileres', icono: 'apartment' },
    { nombre: 'Electrónica', icono: 'devices' },
    { nombre: 'Entretenimiento', icono: 'sports_esports' },
    { nombre: 'Familia', icono: 'people_alt' },
    { nombre: 'Hogar y jardinería', icono: 'yard' },
    { nombre: 'Pasatiempos', icono: 'smart_toy' },
    { nombre: 'Ropa y accesorios', icono: 'checkroom' },
    { nombre: 'Vehículos', icono: 'drive_eta' },
    { nombre: 'Otros', icono: 'devices_other' },
  ];

  public static REDES_SOCIALES = [
    { Facebook: false },
    { Instagram: false },
    { Tiktok: false },
    { Youtube: false },
  ];

  public static SOCIAL_NETWORK = [
    { nombre: 'Facebook', icono: 'face' },
    { nombre: 'Youtube', icono: 'smart_display' },
    { nombre: 'TikTok', icono: 'tiktok' },
  ];
  // Mensaje para Whatsapp
  public static MESSAGE_WHATSAPP =
    'Hola%2C%20me%20gustaría%20realizar%20un%20pedido%20👇🏼%0A%0A✅🛵*Entrega*%20pedido%20número%3A%203%20por%3A%20https%3A%2F%2Fpidapi.app%2Fn%2Fprisespinozacosmetica%0A--%0A▪%201%20x%20Polvo%20compacto%20a%20prueba%20de%20agua%20%2434.50%0A%0AComentarios%20o%20instrucciones%3A%0Aasdf%0A--%0ATotal%20de%20artículos%3A%20%2434.50%0AEntrega%3A%20Gratis%0A*Total*%20(%20Imp.%20incluido)%3A%20%2434.50%0A%0ADetalles%20de%20entrega🛵%0A%0A*Nombre*%3A%20asd%0ANúmero%20de%20contacto%3A%2009963789276%0ADirección%3A%20asdf%0AReferencia%3A%20asdf%0A%0A------------------------------------------%0A%0A*Pris%20Espinoza%20Cosmética%20botánica*%20confirmará%20la%20orden%20luego%20de%20recibir%20este%20mensaje.%C2%A0%0AAquí%20encuentras%20las%20opciones%20de%20pago%20disponibles👇🏼.%0A%0A*Instrucciones%20de%20pago*💳%0APagos%20en%20efectivo%20o%20transferencias%20contraentrega.%0ASe%20aceptan%20todas%20las%20tarjetas%20de%20crédito%20y%20débito.%0A%0AAquí%20está%20mi%20pedido%20☝🏼';
  public static MESSAGE_WHATSAPP_SEND =
  '`https://api.whatsapp.com/send?phone=${phoneStore}&text=%F0%9F%91%8BHola!%0AMe%20gustar%C3%ADa%20realizar%20un%20pedido%20%F0%9F%91%89%0A%0A%E2%9C%85%20${products}%0A--%0ATotal%3A%20%24${total}%0A------------------------------------------%0A%0AMi%20nombre%20es%20${buyerName}`';
  public static MESSAGE_TMP =
    'Hola, me gustaría realizar un pedido � ��*Entrega* pedido número: 3 por: https://pidapi.app/n/prisespinozacosmetica -- � 1 x Polvo compacto a prueba de agua $34.50 Comentarios o instrucciones: asdf -- Total de artículos: $34.50 Entrega: Gratis *Total* ( Imp. incluido): $34.50 Detalles de entrega� *Nombre*: asd Número de contacto: 09963789276 Dirección: asdf Referencia: asdf ------------------------------------------ *Pris Espinoza Cosmética botánica* confirmará la orden luego de recibir este mensaje. Aquí encuentras las opciones de pago disponibles�. *Instrucciones de pago*� Pagos en efectivo o transferencias contraentrega. Se aceptan todas las tarjetas de crédito y débito. Aquí está mi pedido �';
}
