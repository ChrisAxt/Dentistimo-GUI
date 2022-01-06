<template class="error_message">
<div>
  <h1 id="header">Woops!</h1>
  <h1 id="message">{{this.message}}</h1>
  <button id="refresh-button" v-show="isButtonVisible" v-on:click="buttonClicked"> {{buttonText}} </button>
</div>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    message: String,
    isButtonVisible: Boolean,
    buttonText: String
  },
  methods: {
    buttonClicked: function() {
      this.$emit('button-clicked')
    }
  }
}
</script>

<style scoped>
div{
  max-width: 100%;
  max-height: 100%;
  color: red;
  text-align: center;
  align-content: center;
}
#header {
  font-size: 30px;
  padding: 10px
}

#message{
  font-size: 15px;
  padding: 5px
}

#refresh-button{
  background-color: black;
  font-weight: bold;
  align-self: center;
}
</style>