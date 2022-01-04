
<template>

</template>
<script>
//push
import Booking from '/src/views/Booking.vue'
import CircuitBreaker from 'opossum'

const options = {
    timeout: 1000,
    errorThresholdPercentage: 50,
    resetTimeout: 5500,
}
const $Booking = new Booking();

const breaker = CircuitBreaker($Booking.goToBooking, this.options);
breaker.fallback(() => 'Sorry, out of service right now');
breaker.on('timeout', () => console.log('The request is taking too long to respond'));
breaker.on('open', () => console.log('Breaker status changed to open'));
breaker.on('close', () => console.log('Breaker status changed to closed'));
breaker.on('halfOpen', () => console.log('Breaker status changed to half open'));
breaker.on('semaphore-locked', () => console.log('Breaker has reached maximum capacity and cannot execute the request'));

export default {
    mounted() {
    this.goToBookingPage()
    },

    // TODO: fix issue with the goToBookingPage() method
    /*methods() {
        goToBookingPage() {
            breaker.fire().catch((e) => console.error(e));
        
    },
};
*/
}
</script>