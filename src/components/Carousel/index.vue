<template>
  <div class="swiper-container" id="floor1Swiper" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件，工具 js，第三方插件 js，json，文件，图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';

// 引入swiper
import Swiper from "swiper";

export default {
  name: "Carousel",
  //import 引入的组件需要注入到对象中才能使用
  components: {},
  props: ["list"],
  data() {
    //这里存放数据
    return {};
  },
  //计算属性 类似于data概念
  computed: {},
  //监控 data 中的数据变化
  watch: {
    // 为了和listContainer保持一样的写法以便写全局的共用组件，其实写mounted()里面即可（因为本组件是ListContainer的子组件）
    // 数据请求是父组件发的，父组件通过props传递给本子组件，本子组件结构都有了的情况下执行mounted
    list: {
      // 立即监听，不管数据有没有变化，上来就立即监听一次
      // 为什么watch监听不到list，因为这个数据自父组件给了以后就没变过
      immediate: true,
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击分页器小球也能切换
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
  //方法集合
  methods: {},
  //生命周期 - 创建完成(可以访问当前 this 实例)
  created() {},
  //生命周期 - 挂载完成(可以访问 DOM 元素)
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有 keep-alive 缓存功能，这个函数会触发
};
</script>
<style scoped></style>
