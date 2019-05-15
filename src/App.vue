<template>
  <v-app id="app">
    <v-layout column align-center justify-content-start>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/events/new">Events</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <h2>Waaru (ワール)</h2>
      <router-view />
    </v-layout>
  </v-app>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
