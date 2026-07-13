# 📊 Configuración de Integración con Google Sheets

Guía paso a paso para que todas las respuestas del formulario interactivo se guarden automáticamente en una hoja de cálculo de Google Sheets.

---

## Paso 1: Crear la Hoja de Google Sheets

1. Entra a [Google Sheets](https://sheets.google.com) y crea una nueva hoja vacía.
2. En la primera fila (Fila 1), coloca las siguientes columnas exactas:

| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Fecha** | **Nombre** | **Teléfono** | **Provincia** | **Deudas** | **Entidades** | **Ingresos** | **Urgencia** |

---

## Paso 2: Crear el Google Apps Script

1. En el menú superior de Google Sheets, haz clic en **Extensiones** > **Apps Script**.
2. Borra todo el código que aparezca e introduce el siguiente script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.fecha || new Date().toLocaleString(),
      data.nombre || '',
      data.telefono || '',
      data.provincia || '',
      data.deudas || '',
      data.entidades || '',
      data.ingresos || '',
      data.urgencia || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## Paso 3: Publicar como Aplicación Web

1. Haz clic en el botón azul **Implementar** (arriba a la derecha) > **Nueva implementación**.
2. Selecciona el icono de engranaje ⚙️ y elige **Aplicación web**.
3. Configura los parámetros:
   - **Descripción**: `Defensa del Deudor Webhook`
   - **Ejecutar como**: `Yo (tu correo)`
   - **Quién tiene acceso**: **`Cualquiera`** *(Es fundamental seleccionar "Cualquiera" para que los visitantes puedan enviar los datos sin iniciar sesión).*
4. Haz clic en **Implementar** y autoriza los permisos si Google te lo solicita.
5. Copia la **URL de la aplicación web** (tendrá un formato similar a `https://script.google.com/macros/s/.../exec`).

---

## Paso 4: Conectar la URL con el Proyecto Astro

1. En la raíz del proyecto, crea un archivo llamado `.env` (o edítalo si ya existe).
2. Añade la variable con la URL que copiaste:

```env
PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/TU_ID_DE_SCRIPT_AQUI/exec"
```

¡Y listo! Cada respuesta enviada por un usuario aparecerá al instante en tu hoja de cálculo.
