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
              <form @submit.prevent="onSignup">
                <v-layout
                  row
                  v-if="emailSignUp">
                  <v-flex xs12>
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
                </v-layout>
                <v-layout
                  row
                  v-else>
                  <v-flex xs12>
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
                      hint="Password's length must between 6 and 32"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="ConfirmPassword"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      prepend-icon="confirmation_number"
                      :rules="[comparePassword]">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout justify-center>
                  <v-flex class="text-xs-center">
                    <v-btn
                      dark
                      class="btn_submit light-blue darken-3"
                      type="submit"
                      :loading="loading"
                      :disabled="loading"
                    >注册</v-btn>
                  </v-flex>
                </v-layout>
              </form>
              <v-layout justify-center class="mt-3">
                <v-flex xs4 sm4  class="text-xs-center">
                  <v-btn
                    v-if="emailSignUp"
                    icon
                    flat
                    fab
                    @click="changeSignUpWay">
                    <v-icon large>mdi-cellphone
                    </v-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    icon
                    flat
                    fab
                    @click="changeSignUpWay">
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
        confirmPassword: '',
        emailSignUp: true,
        phoneNumber: ''
      }
    },
    computed: {
      comparePassword () {
        return this.password !== this.confirmPassword ? 'Password is not match' : ''
      },
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
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
      onSignup () {
        if (this.emailSignUp) {
          this.$store.dispatch('signUserUp', {email: this.email, password: this.password, emailSignUp: true})
        } else {
          this.$store.dispatch('signUserUp', {phoneNumber: this.phoneNumber, password: this.password, emailSignUp: false})
        }
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      },
      changeSignUpWay () {
        this.emailSignUp = !this.emailSignUp
      }
    }
  }
</script>

<style scoped>
  @import '../../mdi/css/materialdesignicons.min.css';
  .btn_submit{
    width: 160px;
    height: 40px;
    font-size: 18px;
  }
</style>
