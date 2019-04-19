<template>
  <vuestro-app title="vuestro"
               :user="user"
               :user-img="userImg"
               :role="role"
               >
    <template slot="logo">
      <img :src="logo"/>
    </template>
    
    <template slot="navbar"></template>
    <template slot="sidebar"></template>
    <template slot="sidebar-footer"></template>
    
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
      user: 'Vue User',
      userImg: require('@/assets/default-user.jpg'),
      role: 'Admin',
    };
  },
};
</script>

<style>

@font-face {
  font-family: 'Quicksand';
  src: url('./assets/Quicksand-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: 'Quicksand';
  src: url('./assets/Quicksand-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Quicksand';
  src: url('./assets/Quicksand-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: 'Quicksand';
  src: url('./assets/Quicksand-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}


html, body { 
  margin: 0;
  padding: 0;
}

body {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-family: 'Quicksand', sans-serif;
}

</style>
