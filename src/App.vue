<template>
  <vuestro-app title="vuestro"
               :logo="logo"
               :user="user"
               :user-img="userImg"
               :role="role"
  >
  </vuestro-app>
</template>

<script>

/* global __VERSION__ */

export default {
  name: 'app',
  data() {
    return {
      version: __VERSION__,
      logo: require('@/assets/logo.svg'),
      user: 'User',
      userImg: require('@/assets/default-user.jpg'),
      role: 'Admin',
    };
  },
};
</script>

<style>

html, body { 
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

</style>
