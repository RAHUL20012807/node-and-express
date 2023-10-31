const config={

    user:"sa",
    password:"Pa$$w00rd",
    server:"192.218.2.12",
    database:"testdb",
    options:{
        trustedConnection:true,
        encrypt:false,
        enableArithAbort:true,
        trustedServerCertificate:false
    },
    driver:"tedious"
}
console.log(config);
export {config};