   <template>
    <div>
      <ul>
        <li v-for="(item, index) in data" :key="index">
          {{ item.skogstyp_se }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const data = ref([]);
  
  onMounted(async () => {
    const response = await fetch('/api/fetchData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add your POST data here, if any
    });
    
    if (response.ok) {
      const result = await response.json();
      data.value = result.data;
    }
  });
  </script>
  