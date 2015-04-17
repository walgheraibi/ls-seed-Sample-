/**
 * Created by weaamalgheraibi on 4/17/15.
 */

var greeting = module.exports;
// 'hello' is sub-command of 'greeting'
// After the LabShare Shell loads the 'greeting' module, 'hello' can be invoked using `lsc greeting hello <name>`.
greeting.hello = function (name, cb) {
    this.log.info('Hello ' + name + '!');
    cb(null);
};
greeting.goodbye = function (name, cb) {
    this.log.info('Goodbye ' + name + '!');
    cb(null);
};
// The help text for the 'greeting' command.  The help text can be displayed with `lsc help greeting`.
greeting.usage = [
    'lsc greeting hello <name> - Say hello to <name>',
    'lsc greeting goodbye <name> - Say goodbye to <name>'
];