function buildTable(data) {
    var table = document.getElementById('exports')

    for (var index = 0; index < data.length; index++) {
        var row =  `<tr>
                        <td>${data[index].directorate}</td>
                        <td>${data[index].inspectorNumber}</td>
                        // <td>${data[index].inspectionCertificatNumber}</td>
                        // <td>${data[index].exitPoint}</td>
                        // <td>${data[index].transportMethod}</td>
                        // <td>${data[index].exporterNumber}</td>
                        // <td>${data[index].name}</td>
                        // <td>${data[index].status}</td>
                        // <td>${data[index].importerName}</td>
                        // <td>${data[index].importerStatus}</td>
                        // <td>${data[index].importerAddress}</td>
                        // <td>${data[index].importerCountry}</td>
                        // <td>${data[index].productFamily}</td>
                        // <td>${data[index].productDescription}</td>
                        // <td>${data[index].unitsNumber}</td>
                        // <td>${data[index].weight}</td>
                        // <td>${data[index].surface}</td>
                        <td>${data[index].value}</td>
                    </tr>`
        table.innerHTML += row
    }
}

buildTable(exports)