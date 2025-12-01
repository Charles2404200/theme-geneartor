<script setup>
import { ref, onMounted } from "vue";
import { setPrimary } from "../utils/setTheme";

const color = ref("#4f46e5");

const apply = () => {
  setPrimary(color.value);
};

onMounted(() => {
  const saved = localStorage.getItem("primaryColor");
  if (saved) {
    color.value = saved;
    setPrimary(saved);
  } else {
    apply();
  }
});
</script>

