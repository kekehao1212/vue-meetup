<template>
  <v-container>
    <v-layout row v-if="error" justify-center>
      <v-flex xs12 sm6 md4>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12 sm6 md4>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12 v-if="emailSignIn">
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      prepend-icon="email"
                      required>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 v-else>
                    <v-text-field
                      name="phoneNumber"
                      label="PhoneNumber"
                      id="phoneNumber"
                      v-model="phoneNumber"
                      type="phoneNumber"
                      prepend-icon="smartphone"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      prepend-icon="dvr"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout justify-center>
                  <v-flex class="text-xs-center">
                    <v-btn
                      dark
                      class="btn_submit light-blue darken-3"
                      @click="onSignin"
                      :loading="loading"
                      :disabled="loading"
                    >Sign in
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
              <v-layout justify-center class="mt-3">
                <v-flex xs4 sm4 class="text-xs-center">
                  <v-btn
                    v-if="emailSignIn"
                    icon
                    flat
                    fab
                    @click="changeSignInWay">
                    <v-icon large>mdi-cellphone
                    </v-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    icon
                    flat
                    fab
                    @click="changeSignInWay">
                    <v-icon large>
                      mdi-email
                    </v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs4 sm4 class="text-xs-center">
                  <v-btn
                    icon
                    flat
                    fab>
                    <v-icon large>mdi-wechat
                    </v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs4 sm4 class="text-xs-center">
                  <v-btn
                    icon
                    flat
                    fab>
                    <v-icon large>mdi-qqchat
                    </v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        emailSignIn: true,
        phoneNumber: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      },
      error () {
        return this.$store.getters.error
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignin () {
        if (this.emailSignIn) {
          this.$store.dispatch('signUserIn', {email: this.email, password: this.password, emailSignIn: true})
        } else {
          this.$store.dispatch('signUserIn', {phoneNumber: this.phoneNumber, password: this.password, emailSignIn: false})
        }
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      },
      changeSignInWay () {
        this.emailSignIn = !this.emailSignIn
      }
    }
  }
</script>

<style scoped>
  .btn_submit {
    width: 160px;
    height: 40px;
    font-size: 18px;
  }

  @import '../../mdi/css/materialdesignicons.min.css';
</style>
