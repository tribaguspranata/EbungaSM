onmessage = function (e) {
    console.log("Proses to workers detected");
    const workerResult = "Result: " + e.data.nama;
    let nama = e.data.nama;
    
    tampilDataNama(nama);
    postMessage(workerResult);
};

/**
 * Function
 */
function tampilDataNama(nama)
{
    
}

