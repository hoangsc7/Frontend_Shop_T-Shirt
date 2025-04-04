<template>
  <div class="page-log-in">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h1 class="title">Log in</h1>

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
          <div class="notification is-danger" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-dark">Log in</button>
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

export default {
  name: "LogIn",
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      errors: [],
    };
  },
  mounted() {
    document.title = "Log in | T-Shirt Shop";
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async submitForm() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      const data = {
        username: this.username,
        password: this.password,
      };
      await axios
        .post("/api/v1/token/login/", data)
        .then((response) => {
          const token = response.data.auth_token;
          this.$store.commit("setToken", token);
          axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);
          const toPath = this.$route.query.to || "/cart";
          this.$router.push(toPath);
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[key]}`);
            }
          } else {
            this.errors.push("An error occurred. Please try again later.");
            console.error(JSON.stringify(error));
          }
        });
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
