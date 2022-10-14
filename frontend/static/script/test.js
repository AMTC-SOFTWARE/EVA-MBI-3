var wb = XLSX.utils.book_new();
wb.Props = {
        Title: "SheetJS Tutorial",
        Subject: "Test",
        Author: "Red Stapler",
        CreatedDate: new Date(2017,12,19)
};

wb.SheetNames.push("Test Sheet","caramba");
var ws_data = [['hello' , 'world']];
var ws_data2 = [['hola' , 'peter']];
var ws = XLSX.utils.aoa_to_sheet(ws_data);
var ws2 = XLSX.utils.aoa_to_sheet(ws_data2);
wb.Sheets["Test Sheet"] = ws;
wb.Sheets["caramba"] = ws2;
var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
function s2ab(s) {

        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
        
}
function exportar(){
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'Fujikura.xlsx');
};