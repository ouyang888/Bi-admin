<template>
    <div>
        <div class="align-box bg-top"></div>
        <div class="align-box bg-bottom"></div>
        <div class="justify-box bg-right"></div>
        <div class="justify-box bg-left"></div>   

    </div>
</template>
<script>
export default {
}
</script>
<style scoped>
    .justify-box{
    position:absolute;
    height:calc(100% - 2px);
    width:8px;
    right:0;
    top:-1px;
    border-top:2px solid rgb(102, 255, 255);
    border-bottom:2px solid rgb(102, 255, 255);
  }
  .align-box{
    position:absolute;
    height:8px;
    width:calc(100% - 2px);
    right:-1px;
    border-left:2px solid rgb(102, 255, 255);
    border-right:2px solid rgb(102, 255, 255);
  }
  .bg-left{
    left:0;
  }
  .bg-right{
    right:0;
  }
  .bg-top{
    top:0;
  }
  .bg-bottom{
    bottom:0;
  }


</style>
