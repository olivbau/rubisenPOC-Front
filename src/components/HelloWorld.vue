<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.<br>
      Provident voluptate, laborum voluptatum itaque
      labore architecto quo omnis dolores deserunt.<br>
      Pariatur magni quaerat suscipit quis nesciunt tenetur iure aperiam cupiditate laborum. <br>
    </p>
    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
    <ul>
      <li><a href="#" target="_blank" rel="noopener">lorem</a></li>
      <li><a href="#" target="_blank" rel="noopener">ipsum</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
