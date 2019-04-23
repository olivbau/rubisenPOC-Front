<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Ce site web permet à un utilisateur de se créer
      un compte avec pour mot de passe une séquence qui composera
      avec le cube Giiker.<br>L’authentification d’un utilisateur
      en plus de vérifier la séquence (mot de passe) choisit
      par l’utilisateur, vérifie que l’éxécution de la séquence
      correspond à celle de l’utilisateur
      (grâce à un entrainnement réalisé par l’utilisateur à l’inscription).
    </p>
    <ul>
      <li><a href="#" target="_blank" rel="noopener">Github</a></li>
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
