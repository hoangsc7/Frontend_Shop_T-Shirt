<template>
  <div class="page-sign-up">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Sign up</h1>
        <form @submit.prevent="submitForm">
          <div class="field">
            <label>Username</label>
            <div class="control">
              <input type="text" class="input" v-model="username" />
            </div>
          </div>
          <div class="field">
            <label>Password</label>
            <div class="control">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="input"
                v-model="password"
              />
              <span
                class="icon is-small is-right"
                @click="togglePasswordVisibility"
              >
                <i
                  :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
                ></i>
              </span>
            </div>
          </div>
          <div class="field">
            <label>Repeat Password</label>
            <div class="control">
              <input
                :type="showPassword2 ? 'text' : 'password'"
                class="input"
                v-model="password2"
              />
              <span
                class="icon is-small is-right"
                @click="togglePassword2Visibility"
              >
                <i
                  :class="showPassword2 ? 'fas fa-eye' : 'fas fa-eye-slash'"
                ></i>
              </span>
            </div>
          </div>
          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-dark">Sign up</button>
            </div>
          </div>
          <hr />
          Or <router-link to="log-in">Click here</router-link> to login!
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      errors: [],
      showPassword: false,
      showPassword2: false,
    };
  },
  mounted() {
    document.title = "Sign up | T-Shirt Shop";
  },
  methods: {
    submitForm() {
      this.errors = [];

      if (this.username.length < 4) {
        this.errors.push("Username must be at least 4 characters long.");
      }
      if (this.password.length < 8) {
        this.errors.push("Password must be at least 8 characters long.");
      }
      if (this.password !== this.password2) {
        this.errors.push("Passwords do not match.");
      }
      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
        };

        axios
          .post("/api/v1/users/", formData)
          .then((response) => {
            toast({
              message: "User created successfully!",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });

            this.$router.push("/log-in");
          })

          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }

              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again later.");

              console.log(JSON.stringify(error.message));
            }
          });
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    togglePassword2Visibility() {
      this.showPassword2 = !this.showPassword2;
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  cursor: pointer;
}
.control.has-icons-right {
  position: relative; /* Đảm bảo thẻ cha có position: relative */
}
.icon.is-right {
  position: absolute;
  right: 10px; /* Căn lề phải */
  top: 50%; /* Đặt ở giữa theo chiều dọc */
  transform: translateY(-50%); /* Căn chỉnh chính xác giữa */
  z-index: 10; /* Đảm bảo biểu tượng nằm trên input */
}
</style>
