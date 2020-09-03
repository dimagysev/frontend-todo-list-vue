<template>
  <div id="app">
    <div id="nav">
       <div v-if="!isAuth">
         <router-link v-if="!isAuth" to="/login">Login</router-link> |
         <router-link v-if="!isAuth" to="/register">Registration</router-link>
       </div>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: mapGetters(['isAuth'])
}
</script>

<style lang="scss">

  body{
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    color: #2c3e50;
  }

  #nav {
    padding: 10px;
    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .content {
    padding: 3rem;
    min-height: 350px;
  }

  .form-wrap {
    display: block;
    padding: 2rem;
    border-radius: 5px;
    border: 1px solid #228159;
    width: 400px;
    min-height: 150px;

    & form {
      display: flex;
      flex-direction: column;

      & .form-group {
        display: flex;
        flex-direction: column;

        & .input-text{
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #228159;
          margin: 10px 0;

          &:focus{
            outline: none;
          }
        }

        & label {
          align-self: flex-start;
        }
      }

      & .action {
        display: flex;
        align-self: flex-end;

        & button {
          display: block;
          font-size: 1rem;
          color: white;
          padding: 5px 20px;
          border: 1px solid #228159;
          border-radius: 5px;
          background: #228159;
          margin-top: 5px;
          transition-property: background-color, box-shadow;
          transition-duration: .2s;
          transition-timing-function: ease-in-out;
          cursor: pointer;

          &:focus {
            outline: #228159;
            box-shadow: 0 0 10px rgba(66, 185, 131, 0.7);
          }
          &:active {
            box-shadow: 0 5px #666;
            transform: translateY(1px);
          }
          &:hover {
            background: #42b983;
            box-shadow: 0 0 10px rgba(66, 185, 131, 0.7);
          }
        }
      }
    }
  }
</style>
