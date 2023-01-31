<template>
  <div class="nav-tabs" ref="navTabRef">
    <div
      class="tab"
      v-for="(r, i) in state.tabsRouter"
      :key="i"
      :ref="tabRefs.set"
      @click="$router.push(r.path)"
    >
      <span>{{ r.meta?.name ?? '未知名称' }}</span>
      <template v-if="state.tabsRouter.length !== 1">
        <el-icon @click.stop="closeTab(i)">
          <IconEpClose />
        </el-icon>
      </template>
    </div>
    <div class="active"></div>
  </div>
</template>

<script setup lang="ts">
import { useTabs } from '@/store'
import { useTemplateRefsList } from '@vueuse/core'

const { user } = storeToRefs(useUser())

const props = withDefaults(
  defineProps<{
    isCloseOnterTabs: boolean
  }>(),
  {
    isCloseOnterTabs: false
  }
)

const menu = useMenu()
menu.initMenu(user.value!.rolesId)

const router = useRouter()
const route = useRoute()
const navTabRef = ref<HTMLDivElement>()

const { state } = storeToRefs(useTabs())

const tabRefs = useTemplateRefsList<HTMLDivElement>()

const style = reactive({
  width: '',
  left: ''
})

const selectTab = () => {
  nextTick(() => {
    const e = tabRefs.value[state.value.activeIndex]
    style.width = e.clientWidth + 'px'
    style.left = e.offsetLeft + 'px'
  })
}

watchEffect(() => {
  const routers = router.getRoutes()
  if (route.path === '/404') return
  const r = routers.find(r => r.path === route.path)
  if (!r) return
  let i = state.value.tabsRouter.findIndex(r => r.path === route.path)
  if (i === -1) {
    state.value.tabsRouter.push(r)
    state.value.activeIndex = state.value.tabsRouter.length - 1
  } else {
    state.value.activeIndex = i
  }
  selectTab()
})

// watch(
//   () => route.path,
//   () => {
//     if (route.path === '/404') return
//     const r = routers.value.find(r => r.path === route.path)
//     if (!r) return
//     let i = state.value.tabsRouter.findIndex(r => r.path === route.path)
//     if (i === -1) {
//       state.value.tabsRouter.push(r)
//       state.value.activeIndex = state.value.tabsRouter.length - 1
//     } else {
//       state.value.activeIndex = i
//     }
//     selectTab()
//   },
//   { immediate: true }
// )

const closeTab = (i: number) => {
  const l = state.value.tabsRouter.length - 1
  const ai = state.value.activeIndex
  state.value.tabsRouter.splice(i, 1)

  if (i === ai && i === l) {
    router.push(state.value.tabsRouter[i - 1])
  } else if (i === ai && i !== l) {
    router.push(state.value.tabsRouter[i])
  } else if (i === 0 && ai === 0) {
    router.push(state.value.tabsRouter[0])
  } else if (
    ai > i ||
    (i === ai && ((i !== 0 && ai !== 0) || (i === 0 && ai !== 0)))
  ) {
    state.value.activeIndex = state.value.activeIndex - 1
    selectTab()
  } else {
    router.push(state.value.tabsRouter[i])
  }
}

const emits = defineEmits<{
  (e: 'closeEnd'): void
}>()

watch(
  () => props.isCloseOnterTabs,
  () => {
    const i = state.value.activeIndex
    const rs = state.value.tabsRouter
    state.value.tabsRouter = rs.filter(v => v.path === rs[i].path)
    state.value.activeIndex = 0
    selectTab()
    emits('closeEnd')
  }
)
</script>

<style scoped lang="less">
.nav-tabs {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;

  .tab {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
    justify-content: center;
    padding: 0 15px;
    height: 40px;
    white-space: nowrap;

    .el-icon {
      padding: 2px;
      margin-left: 10px;
      font-size: 14px;

      &:hover {
        border-radius: 50%;
        color: #fff;
        background-color: var(--el-color-primary);
      }
    }
  }

  .active {
    position: absolute;
    z-index: -1;
    border-radius: var(--el-border-radius-base);
    width: v-bind('style.width');
    transform: translateX(v-bind('style.left'));
    height: 40px;
    transition: all 0.3s;
    box-shadow: var(--el-box-shadow-light);
    background-color: var(--el-bg-color-overlay);
  }
}
</style>
