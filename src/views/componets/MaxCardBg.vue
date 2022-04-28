<template>
    <div>
      <div class="content-bg-left-top"></div>
      <div class="content-bg-left-bottom"></div>
      <div class="content-bg-right-top"></div>
      <div class="content-bg-right-bottom"></div>   

    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
  [class*='content-bg']{
    position: absolute;
    width:12px;
    height:9px;
    background-color: hsla(188, 100%, 50%, 1);
  }
  .content-bg-left-top{
   left:0;
   top:0;
  }
  .content-bg-left-bottom{
    left:0;
   bottom:0;
  }
  .content-bg-right-top{
   right:0;
   top:0;
  }
  .content-bg-right-bottom{
   right:0;
   bottom:0;
  }

</style>
