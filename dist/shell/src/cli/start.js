var start = module.exports;

start.usage = [ App.Title,
    '',
    'lsc start services - Start LabShare Services',
    'lsc start site - Start LabShare Site',
    ''
];

start.services = function() {

    App.log.info("Starting LabShare services...");

};

start.site = function() {

    App.log.info("Starting LabShare site...");

};