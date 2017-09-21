<template>
  <v-app light>
    <v-navigation-drawer
      v-model="sideNav"
      absolute
      persistent
      temporary
      light
    >
      <v-list>
        <v-list-tile
          avatar
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
          >
          <v-list-tile-action>
            <v-icon class="black--text">{{item.icon}}</v-icon>
          </v-list-tile-action>
            <v-list-tile-content>
              {{item.title}}
            </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="red darken-3" dark>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor : pointer">Meet</router-link>
      </v-toolbar-title>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav">
      </v-toolbar-side-icon>
      <v-spacer></v-spacer>
        <v-btn
          flat
          class="hidden-xs-only"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
        </v-btn>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>

</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        menuItems: [
          {icon: 'payment', title: 'Create Meetup', link: '/Meetup/new'},
          {icon: 'person', title: 'Meet up', link: '/Meetups'},
          {icon: 'donut_large', title: 'Sign in', link: '/Signin'},
          {icon: 'face', title: 'Sign up', link: '/Signup'}
        ]
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
