<template class="error_message">
<div>
  <h1 id="header">Woops!</h1>
  <h1 id="message">{{this.message}}</h1>
</div>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    message: String
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
</style>