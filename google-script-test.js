/**
 * CÓDIGO GOOGLE APPS SCRIPT PARA PRUEBAS (Google Sheets)
 * 
 * Instrucciones en 3 pasos:
 * 1. En tu Google Sheets -> Extensiones -> Apps Script.
 * 2. Pega este código y guarda (Ctrl+S).
 * 3. Implementar -> Nueva implementación -> Tipo: "Aplicación Web" -> Acceso: "Cualquiera".
 * 4. Copia la URL de la Web App resultante y colócala en tu archivo .env:
 *    PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL="tu_url_aqui"
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Si la hoja está vacía, agregar encabezados automáticamente
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Fecha", "Nombre", "Teléfono", "Provincia", "Deudas", "Entidades", "Ingresos", "Urgencia"]);
    }
    
    sheet.appendRow([
      data.fecha || new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" }),
      data.nombre || "",
      data.telefono || "",
      data.provincia || "",
      data.deudas || "",
      data.entidades || "",
      data.ingresos || "",
      data.urgencia || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
