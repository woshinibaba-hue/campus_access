<template>
  <div class="not">
    <img src="../../assets/images/404.svg" alt="" />
    <p>404 资源不存在</p>
    <p>生活总归带点荒谬</p>
  </div>
</template>

<style lang="less" scoped>
.not {
  height: calc(100vh - 200px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 250px;
    height: 250px;
  }

  p:nth-child(2) {
    font-size: 32px;
    margin: 20px 0;
  }

  p:last-child {
    color: var(--el-text-color-regular);
    font-size: 14px;
  }
}
</style>
