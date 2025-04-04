<template>
  <div class="box mb-4">
    <h3 class="is-size-4 mb-6">Order #{{ order.id }}</h3>

    <h4 class="is-size-5">Products</h4>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in order.items" v-bind:key="item.product.id">
          <td>{{ item.product.name }}</td>
          <td>${{ item.product.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>${{ getItemTotal(item).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "OrderSummary",
  props: {
    order: Object,
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    orderTotalLength(order) {
      return order.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
  },
  mounted() {
    console.log("Order data:", this.order);
  },
};
</script>

<style scoped>
.box {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0px 0 1px rgba(10, 10, 10, 0.02);
  padding: 1.25rem;
  margin-bottom: 1.5rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.table th,
.table td {
  padding: 0.75rem;
  border-bottom: 1px solid #dbdbdb;
  text-align: left;
}

.table th {
  color: #363636;
  font-weight: 600;
}

.is-size-4 {
  font-size: 1.5rem !important;
}

.is-size-5 {
  font-size: 1.25rem !important;
}

.mb-6 {
  margin-bottom: 1.5rem !important;
}

.is-fullwidth {
  width: 100%;
}
</style>
