<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',

}
</script>

<style>
@font-face {
  font-family: 'write_font_name';
  src: url("@/fonts/Ownglyph_2022_UWY_Si_Woo-Rg.ttf") format('woff');
  font-weight: normal;
  font-style: normal;
}
#app {
  font-family: 'write_font_name';
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  text-align: center;
  color: #2c3e50;
}
</style>
