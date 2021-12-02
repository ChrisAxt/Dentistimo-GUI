<template>
<div class="hi">
</div>

  <form>
    <div class="date">
  <label for="start">Please select a date and time for your appointment: &nbsp; &nbsp;
  <input type="date" id="start" name="trip-start"
         min="2018-01-01" max="2022-12-31" required>
  <span class="validity"></span>
  </label></div>
  <div class="time">
    <label for="time">Time: &nbsp;
  <input type="time" id="start" name="trip-start"
         value="2018-07-22"
         min="2018-01-01" max="2018-12-31"> 
         </label></div>
      <div class="userInput">
<label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="" size="30"><br>
  <label for="lname">Emailadress:</label><br>
  <input type="text" id="emailadress" style="" name="lname" value="" size="30"><br>
  <label for="lname">Phone number:</label><br>
  <input type="text" id="pnumber" name="lname" value="" size="40" required><br>
  </div>
  <p>
    <button>Submit</button>
  </p>
  </form>
</template>

<script>
</script>

<style>

.date {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-left: 350px;
}
input {
  margin-bottom: 20px;
}
.time {
  display: flex;
  align-items: center;
  padding-top: 0px;
  padding-left: 350px;
}

 .userInput {
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
