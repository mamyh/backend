const EventEmitter = require('events');
// EventEmitter is a class thats why its uppercase

class School extends EventEmitter {
    startPeriod() {
        console.log('class started');

        // raise the bell events
        setTimeout(() => {
            this.emit('bellRing', {
                period: 'first',
                text: ' period ended',
            });
        }, 1000);
    }
}
module.exports = School;
