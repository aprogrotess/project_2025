<template>
  <header class="header">
    <div>
      <cc-svg-icon
        class-name="menu-fold"
        icon-class="menu-fold"
        @click="handleMenuFold"
      ></cc-svg-icon>
    </div>

    <div style="text-align: center;" >
    <img :src="require('@/assets/images/cx.png')" style=" display: inline-block;
          height: 100%;
          display: table-cell; //主要是这个属性
         vertical-align: middle;
         ">
    </div>
    <div class="header-right">
      <div class="icon-items">
        <el-dropdown
          @visible-change="dropdownVivibleHandle"
          @command="handleDropdownCommand"
        >
          <div
            class="icon-item"
            :class="{
              opened: dropdownVivible
            }"
          >
            <cc-svg-icon
              class-name="icon-avatar"
              icon-class="avatar"
            ></cc-svg-icon>
            <span>{{ userName }}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in dropdownList"
              :key="item.name"
              :divided="item.divided"
              :command="item"
            >
              <cc-svg-icon :icon-class="item.icon"></cc-svg-icon>
              {{ item.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>
<script>
import Vue from 'vue'
import { mapActions, mapGetters, createNamespacedHelpers } from 'vuex'
import { Breadcrumb, BreadcrumbItem, Badge } from 'element-ui'
const { mapState } = createNamespacedHelpers('user')
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(Badge.name, Badge)
export default {
  name: 'Header',
  components: {
  },
  data () {
    return {
      dropdownVivible: false,
      noticeVisible: false,
      activeName: 'notice',
      dropdownList: [
        {
          name: '个人中心',
          icon: 'person'
        },
        {
          name: '个人设置',
          icon: 'setting'
        },
        {
          name: '退出登录',
          divided: true,
          icon: 'login-out'
        }
      ]
    }
  },
  computed: {
    ...mapState(['userName']),
    ...mapGetters(['getMenuCollapse', 'getBreadcrumbItems'])
  },
  methods: {
    ...mapActions(['MENU_COLLAPSE']),
    handleMenuFold () {
      this.MENU_COLLAPSE(!this.getMenuCollapse)
    },
    dropdownVivibleHandle (visible) {
      this.dropdownVivible = visible
    },
    handleDropdownCommand (dropdownItem) {
      switch (dropdownItem.name) {
        case '退出登录':
          this.$router.replace('/login')
          break
        default:
          this.$message.info(`click on item ${dropdownItem.name}`)
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$headerHeight: 65px;
.header {
  height: $headerHeight;
  line-height: $headerHeight;
  padding: 0 35px;
  background: #fff;
  @include boxShadow;
  @include flex(row);
  justify-content: flex-start;
  align-items: center;
  .menu-fold {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
  .header-right {
    float: right;
    height: 100%;
    overflow: hidden;
    // /deep/ .el-dropdown-link {
    //   cursor: pointer;
    //   color: #409eff;
    // }
    // /deep/ .el-icon-arrow-down {
    //   font-size: 12px;
    // }
    // color: rgba(0, 0, 0, 0.65);
    @include flex(row);
    align-items: center;
    .icon-items {
      margin-right: 10px;
      height: 100%;
      @include flex(row);
      align-items: center;
      .icon-item {
        padding: 0 12px;
        @include flex(row);
        align-items: center;
        cursor: pointer;
        &.opened {
          background: $touchColor;
        }
        &:focus {
          outline: none;
        }
      }
    }
    .el-badge__content.is-fixed {
      top: 25px;
    }
    .icon-avatar {
      @include wh(30px, 30px);
      margin-right: 10px;
      vertical-align: middle !important;
    }
  }
  > div:first-child {
    padding: 0 10px;
  }
  > div:nth-child(2) {
    flex: 1;
    padding-left: 10px;
  }
  .fade-move-enter-active,
  .fade-move-leave-active {
    transition: 0.3s all ease;
    // position: absolute
  }
  .fade-move-enter,
  .fade-move-leave-to {
    opacity: 0;
    transform: translateX(-100px);
  }
  .fade-move-enter-to,
  .fade-move-leave {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
