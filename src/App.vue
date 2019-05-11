<template>
  <vuestro-app title="vuestro"
               :user="user"
               :user-img="userImg"
               :role="role">
    <template slot="logo">
    </template>

    <template slot="navbar"></template>
    <template slot="sidebar"></template>
    <template slot="sidebar-footer"></template>

    <template slot="footer">
      <p class="default-footer">Vuestro ❤ Vue</p>
    </template>

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
      user: 'A Vue User',
      userImg: require('@/assets/default-user.jpg'),
      role: 'Admin',
    };
  },
};
</script>

<style>

body {
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

</style>
