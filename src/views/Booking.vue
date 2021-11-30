<template>
<div class="hi">
</div>

  <form>
  <label for="start">Please select a date and time for your appointment: &nbsp; &nbsp;
  <input type="date" id="start" name="trip-start"
         min="2018-01-01" max="2022-12-31" required>
  <span class="validity"></span>
  </label>
  <p>
    <button>Submit</button>
  </p>
  </form>

</template>

<script>
</script>

<style>

label {
  display: flex;
  align-items: center;
  padding-top: 100px;
  padding-left: 350px;
}

span::after {
  padding-left: 5px;
}

input:invalid + span::after {
  content: '✖';
  color: red;
}

input:valid+span::after {
  content: '✓';
  color: #8cc63f;
}

p {
  display: flex;
  padding-top: 40px;
  padding-left: 350px;
}
.hi{
  background-image: linear-gradient(rgba(3, 3, 3, 0.7), rgba(3, 3, 3, 0.7)), url(../assets/smiling_woman_with_perfect_white_teeth-opt.png);
  background-size: cover;
  background-position: bottom;
  height: 50vh;
  background-attachment: fixed;
  color: white;
}
</style>
