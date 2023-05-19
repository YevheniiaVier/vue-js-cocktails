<template>
  <section class="rating">
    <div class="logo">
      <img src="/star-filled.svg" alt="star" />
    </div>

    <div class="intro">
      <h1>How do you like this drink?</h1>
    </div>

    <form name="select-rating" class="select-rating" @submit.prevent="onSubmit">
      <fieldset>
        <div v-for="value in values" :key="value" class="form-group">
          <input
            @change="onChange"
            type="radio"
            name="rating"
            :id="value"
            :value="value"
            v-model="rating"
          />
          <label :for="value">{{ value }}</label>
        </div>
      </fieldset>

      <button type="submit" title="submit review">Submit</button>
    </form>
  </section>
</template>

<script setup>
import { addRating, getAverageRating } from "@/services/cocktails-api";
import { ref } from "vue";
// import { useToast } from "vue-toast-notification";
// import "vue-toast-notification/dist/theme-sugar.css";
const rating = ref(1);
const emit = defineEmits(["close", "update-rating"]);

const props = defineProps({
  values: {
    type: Number,
    default: 5,
  },
  drinkId: {
    type: String,
    required: true,
  },
});
// const $toast = useToast();
const onChange = (e) => {
  rating.value = e.target.value;
};
const onSubmit = async () => {
  try {
    await addRating(props.drinkId, rating.value);
    // const { avgRating, totalVotes } = await getAverageRating(props.drinkId);
    emit("update-rating");
  } catch (error) {
    console.log(error);
  }
  emit("close");
};
</script>

<style lang="scss" scoped></style>
