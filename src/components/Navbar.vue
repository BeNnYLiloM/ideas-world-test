<template>
  <div class="navbar">
    <button class="navbar__mobile-btn" @click="toggleMenu">
      <span></span>
    </button>
    <nav class="navbar__nav" :class="{show: showMenu}" @click="toggleMenu">
      <router-link exactly :to="{name: 'films'}"> Films </router-link>
      <router-link exactly :to="{name: 'tvshows'}">Serials</router-link>
      <router-link exactly :to="{name: 'favorites'}">Favorite</router-link>
    </nav>
    <search />
    <v-spacer />
    <v-btn link @click="logout">Logout</v-btn>
  </div>
</template>

<script>
import Search from '@/components/Search'

export default {
  name: 'Navbar',
  components: {Search},
  data() {
    return {
      showMenu: false,
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    toggleMenu() {
      if (window.innerWidth < 600) {
        this.showMenu = !this.showMenu
      }
    },
  },
}
</script>

<style lang="scss">
.navbar {
  display: flex;
  align-items: center;

  .navbar__nav a {
    color: #fff;
  }

  &__nav {
    @media (max-width: 600px) {
      position: absolute;
      top: 0;
      height: 100vh;
      width: 100%;
      left: -100%;
      transition: 0.2s ease-out;
      background: #272727;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 40px;

      &.show {
        left: 0;
      }
    }

    a {
      color: #fff;
      text-decoration: none;
      margin-right: 50px;

      @media (max-width: 600px) {
        margin-right: 0;
        margin-bottom: 40px;
      }

      &.router-link-active {
        text-decoration: underline;
      }
    }
  }

  &__mobile-btn {
    display: none;
    outline: none;
    border: none;
    padding: 0;
    width: 40px;
    height: 32px;
    align-items: center;
    margin-right: 30px;

    @media (max-width: 600px) {
      display: inline-flex;
    }

    span {
      display: inline-block;
      background: #fff;
      width: 100%;
      height: 2px;
      position: relative;

      &::before,
      &::after {
        content: '';
        background: #fff;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
      }

      &::before {
        top: -12px;
      }

      &::after {
        bottom: -12px;
      }
    }
  }
}
</style>
