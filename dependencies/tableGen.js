//http://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array
var table;
function getTable(directory) {
    let result = ["<table border=1'>"];
    for(let row of directory) {
        result.push("<tr>");
        for(let cell of row){
            result.push(`<td>${cell}</td>`);
        }
        result.push("</tr>");
    }
    result.push("</table>");
    return result.join('\n');
  }