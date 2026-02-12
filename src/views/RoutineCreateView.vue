<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
    <AppHeader />

    <main class="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10">
      <!-- Header -->
      <div class="mb-12">
        <nav class="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <router-link to="/my-routines" class="hover:text-white transition-colors flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </router-link>
          <span>/</span>
          <span class="text-blue-500 font-black uppercase tracking-widest text-[10px]">Arquitecto de Rutinas</span>
        </nav>
        <h1 class="text-4xl md:text-5xl font-black text-white tracking-tighter">
          Crea tu <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Plan Maestro</span>
        </h1>
      </div>

      <!-- Progressive Stepper -->
      <div class="mb-16 max-w-2xl mx-auto px-4">
        <div class="relative flex items-center justify-between">
          <div class="absolute top-1/2 left-0 w-full h-[2px] bg-gray-800 -translate-y-1/2 z-0"></div>
          <div 
            class="absolute top-1/2 left-0 h-[2px] bg-blue-500 -translate-y-1/2 transition-all duration-700 z-0"
            :style="{ width: `${(step - 1) * 50}%` }"
          ></div>
          
          <div 
            v-for="i in 3" 
            :key="i"
            class="relative z-10 flex flex-col items-center group"
          >
            <div 
              class="w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 border-2"
              :class="[
                step >= i 
                  ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] rotate-3' 
                  : 'bg-gray-900 border-gray-800 text-gray-600'
              ]"
            >
              <svg v-if="step > i" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
              <span v-else>{{ i }}</span>
            </div>
            <span 
              class="absolute -bottom-8 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 whitespace-nowrap"
              :class="step >= i ? 'text-blue-400' : 'text-gray-600'"
            >
              {{ ['Identidad', 'Arsenal', 'Ajuste'][i-1] }}
            </span>
          </div>
        </div>
      </div>

      <div class="max-w-4xl mx-auto">
        <!-- Step 1: Identity -->
        <Transition name="slide-fade">
          <div v-if="step === 1" class="space-y-10">
            <div class="bg-gray-800/30 backdrop-blur-xl rounded-[2.5rem] border border-gray-700/50 p-12 md:p-16 shadow-2xl relative overflow-hidden text-center">
              <div class="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
              
              <div class="relative z-10 space-y-8">
                <div class="inline-block p-4 rounded-3xl bg-blue-500/10 text-blue-400 mb-4 border border-blue-500/20">
                  <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h2 class="text-3xl md:text-4xl font-black text-white px-4">¿Cuál es el nombre de tu misión?</h2>
                <div class="max-w-md mx-auto relative group">
                  <input 
                    v-model="form.name"
                    type="text"
                    placeholder="Escribe el nombre aquí..."
                    class="w-full bg-transparent text-2xl font-bold text-white border-b-2 border-gray-800 focus:border-blue-500 outline-none pb-4 transition-all text-center placeholder:text-gray-700"
                    @keyup.enter="nextStep"
                  />
                  <div class="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500"></div>
                </div>
                
                <div class="pt-8">
                  <button 
                    @click="nextStep"
                    :disabled="!form.name.trim()"
                    class="group relative inline-flex items-center justify-center bg-white hover:bg-blue-600 disabled:bg-gray-800 text-gray-900 hover:text-white disabled:text-gray-600 font-black py-5 px-16 rounded-2xl transition-all duration-300 shadow-xl disabled:shadow-none hover:shadow-blue-500/40 overflow-hidden"
                  >
                    <span class="relative z-10 uppercase tracking-widest text-sm">Próximo Paso</span>
                    <div class="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Step 2: Exercise Arsenal -->
        <Transition name="slide-fade">
          <div v-if="step === 2" class="space-y-8">
            <!-- Search Hub -->
            <div class="bg-gray-800/40 backdrop-blur-md rounded-3xl border border-gray-700/50 p-6 shadow-xl flex flex-col md:flex-row gap-4">
              <div class="flex-1 relative group">
                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  v-model="searchQuery"
                  type="text"
                  placeholder="Busca en el arsenal..."
                  class="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
                />
              </div>
              <div class="relative md:w-64">
                <select 
                  v-model="selectedCategory"
                  class="w-full pl-6 pr-10 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl text-white outline-none focus:border-blue-500/50 transition-all appearance-none font-bold text-sm"
                >
                  <option value="">Todos los grupos</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
                <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <!-- Result Source -->
              <div class="space-y-4">
                <h3 class="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] px-2 flex items-center">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                  Arsenal Disponible
                </h3>
                <div class="bg-gray-800/20 rounded-[2rem] border border-gray-700/30 p-4 max-h-[550px] overflow-y-auto space-y-3 custom-scrollbar">
                  <div 
                    v-for="ex in filteredExercises" 
                    :key="ex.id"
                    class="group flex items-center justify-between p-5 rounded-2xl bg-gray-800/40 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div>
                      <h4 class="font-black text-white text-base tracking-tight mb-1">{{ ex.name }}</h4>
                      <span class="text-[9px] text-blue-500/80 font-black uppercase tracking-widest">{{ getCategoryName(ex.category_id) }}</span>
                    </div>
                    <button 
                      @click="addExercise(ex)"
                      class="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center border border-blue-500/20 shadow-lg"
                    >
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Selection Tray -->
              <div class="space-y-4">
                <h3 class="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] px-2 flex justify-between">
                  Tu Configuración <span>{{ selectedExercises.length }} Activos</span>
                </h3>
                <div class="bg-blue-500/5 rounded-[2.5rem] border-2 border-dashed border-blue-500/20 p-6 min-h-[400px] max-h-[550px] overflow-y-auto space-y-3 custom-scrollbar">
                  <TransitionGroup name="list">
                    <div v-if="selectedExercises.length === 0" class="py-24 text-center space-y-4">
                      <div class="w-20 h-20 bg-gray-900/50 rounded-full flex items-center justify-center mx-auto border border-gray-800">
                        <svg class="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <p class="text-gray-600 font-bold uppercase tracking-widest text-[10px]">Añade piezas a tu rutina</p>
                    </div>
                    <div 
                      v-for="ex in selectedExercises" 
                      :key="ex.id"
                      class="flex items-center justify-between p-5 rounded-2xl bg-gray-900/80 border border-blue-500/30 shadow-xl"
                    >
                      <h4 class="font-black text-white text-base tracking-tight">{{ ex.name }}</h4>
                      <button 
                        @click="removeExercise(ex.id)"
                        class="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center border border-red-500/20"
                      >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4" />
                        </svg>
                      </button>
                    </div>
                  </TransitionGroup>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center pt-8">
              <button @click="step--" class="text-gray-500 hover:text-white font-bold transition-colors flex items-center uppercase tracking-widest text-xs">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
                </svg>
                Atrás
              </button>
              <button 
                @click="nextStep"
                :disabled="selectedExercises.length === 0"
                class="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 text-white disabled:text-gray-600 font-black py-4 px-12 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-500/20 uppercase tracking-widest text-sm"
              >
                Configurar Cargas
              </button>
            </div>
          </div>
        </Transition>

        <!-- Step 3: Optimization -->
        <Transition name="slide-fade">
          <div v-if="step === 3" class="space-y-10">
            <div class="space-y-6">
              <div 
                v-for="(ex, index) in selectedExercises" 
                :key="ex.id"
                class="bg-gray-800/40 backdrop-blur-xl rounded-[2.5rem] border border-gray-700/50 p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10 shadow-2xl relative overflow-hidden group animate-fade-in"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <div class="absolute -right-16 -bottom-16 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500"></div>
                
                <div class="flex-1 relative z-10">
                  <span class="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2 block">Punto de Acción #{{ index + 1 }}</span>
                  <h4 class="text-3xl font-black text-white tracking-tighter">{{ ex.name }}</h4>
                  <p class="text-xs text-gray-500 font-bold tracking-widest mt-2">{{ getCategoryName(ex.category_id) }}</p>
                </div>

                <div class="flex flex-wrap items-center gap-8 relative z-10">
                  <!-- Sets -->
                  <div class="flex flex-col gap-3">
                    <label class="text-[9px] font-black text-gray-600 uppercase tracking-widest text-center">Series</label>
                    <div class="flex items-center bg-gray-900 rounded-2xl border-2 border-gray-800 p-1">
                      <button @click="adjust(ex.id, 'target_sets', -1)" class="w-10 h-10 rounded-xl hover:bg-gray-800 text-gray-400 flex items-center justify-center transition-all"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/></svg></button>
                      <input type="number" v-model.number="ex.pivot.target_sets" class="w-14 bg-transparent text-center font-black text-xl text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <button @click="adjust(ex.id, 'target_sets', 1)" class="w-10 h-10 rounded-xl hover:bg-gray-800 text-gray-400 flex items-center justify-center transition-all"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/></svg></button>
                    </div>
                  </div>
                  <!-- Reps -->
                  <div class="flex flex-col gap-3">
                    <label class="text-[9px] font-black text-gray-600 uppercase tracking-widest text-center">Repeticiones</label>
                    <div class="flex items-center bg-gray-900 rounded-2xl border-2 border-gray-800 p-1">
                      <button @click="adjust(ex.id, 'target_reps', -1)" class="w-10 h-10 rounded-xl hover:bg-gray-800 text-gray-400 flex items-center justify-center transition-all"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/></svg></button>
                      <input type="number" v-model.number="ex.pivot.target_reps" class="w-14 bg-transparent text-center font-black text-xl text-white outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <button @click="adjust(ex.id, 'target_reps', 1)" class="w-10 h-10 rounded-xl hover:bg-gray-800 text-gray-400 flex items-center justify-center transition-all"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/></svg></button>
                    </div>
                  </div>
                  <!-- Rest -->
                  <div class="flex flex-col gap-3">
                    <label class="text-[9px] font-black text-gray-600 uppercase tracking-widest text-center">Descanso (Seg)</label>
                    <div class="flex items-center bg-gray-900 rounded-2xl border-2 border-gray-800 p-1">
                      <button @click="adjust(ex.id, 'rest_seconds', -15)" class="px-3 h-10 font-black text-[10px] hover:bg-gray-800 text-gray-500 rounded-xl">-15</button>
                      <input type="number" v-model.number="ex.pivot.rest_seconds" class="w-14 bg-transparent text-center font-black text-xl text-blue-400 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      <button @click="adjust(ex.id, 'rest_seconds', 15)" class="px-3 h-10 font-black text-[10px] hover:bg-gray-800 text-gray-500 rounded-xl">+15</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-center gap-10 pt-16">
              <div class="flex items-center gap-10">
                <button @click="step--" class="text-gray-500 hover:text-white font-black uppercase tracking-widest text-xs transition">Atrás</button>
                <button 
                  @click="saveRoutine"
                  :disabled="saving"
                  class="relative group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-black py-5 px-20 rounded-[2rem] transition-all duration-300 shadow-2xl shadow-green-500/20 active:scale-95 flex items-center"
                >
                  <div v-if="saving" class="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin mr-4"></div>
                  <span class="uppercase tracking-widest">Desplegar Rutina</span>
                </button>
              </div>
              <Transition name="fade">
                <p v-if="saving" class="text-emerald-400 font-black text-xs uppercase tracking-[0.4em] animate-pulse">Codificando en el servidor...</p>
              </Transition>
            </div>
          </div>
        </Transition>
      </div>
    </main>

    <AppFooter class="relative z-10" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import routineService from '@/services/routineService'
import exerciseService from '@/services/exerciseService'

const router = useRouter()

// UI State
const step = ref(1)
const saving = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')

// Data
const categories = ref([])
const allExercises = ref([])
const selectedExercises = ref([])

const form = reactive({
  name: '',
  description: ''
})

const nextStep = () => {
  if (step.value < 3) step.value++
}

const fetchInitialData = async () => {
  try {
    const cats = await exerciseService.getCategories()
    categories.value = cats
    
    if (cats.length > 0) {
      // Fetch exercises for each category and flatten them
      const allResults = await Promise.all(
        cats.map(c => exerciseService.getExercisesByCategory(c.id).catch(() => []))
      )
      allExercises.value = allResults.flat()
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const filteredExercises = computed(() => {
  return allExercises.value.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCat = !selectedCategory.value || ex.category_id === Number(selectedCategory.value)
    const notSelected = !selectedExercises.value.some(s => s.id === ex.id)
    return matchesSearch && matchesCat && notSelected
  })
})

const getCategoryName = (id) => {
  return categories.value.find(c => c.id === id)?.name || 'Categoría'
}

const addExercise = (ex) => {
  selectedExercises.value.push({
    ...ex,
    pivot: {
      target_sets: 3,
      target_reps: 12,
      rest_seconds: 60
    }
  })
}

const removeExercise = (id) => {
  selectedExercises.value = selectedExercises.value.filter(s => s.id !== id)
}

const adjust = (id, field, amount) => {
  const ex = selectedExercises.value.find(s => s.id === id)
  if (ex) {
    ex.pivot[field] = Math.max(0, (ex.pivot[field] || 0) + amount)
  }
}

const saveRoutine = async () => {
  if (selectedExercises.value.length === 0) return
  saving.value = true
  
  const routineData = {
    name: form.name.trim(),
    description: `Rutina enfocada en ${selectedExercises.value.slice(0, 2).map(e => e.name).join(', ')}`,
    exercises: selectedExercises.value.map((ex, index) => ({
      exercise_id: Number(ex.id),
      sequence: index + 1,
      target_sets: Number(ex.pivot.target_sets),
      target_reps: Number(ex.pivot.target_reps),
      rest_seconds: Number(ex.pivot.rest_seconds)
    }))
  }

  try {
    const response = await routineService.createRoutine(routineData)
    
    // Extract ID and subscribe if backend doesn't do it automatically
    const newRoutineId = response.id || response.data?.id
    if (newRoutineId) {
      try {
        await routineService.subscribe(newRoutineId)
      } catch (subError) {
        // Silent fail if already subscribed
      }
    }
    
    router.push('/my-routines')
  } catch (error) {
    console.error('Error saving routine:', error)
    
    // Extract validation errors if available
    let errorMsg = 'No se pudo guardar la rutina.'
    if (error.response?.data?.errors) {
      const errors = error.response.data.errors
      errorMsg = Object.values(errors).flat().join('\n')
    } else if (error.response?.data?.message) {
      errorMsg = error.response.data.message
    }
    
    alert(`Error: ${errorMsg}`)
  } finally {
    saving.value = false
  }
}

onMounted(fetchInitialData)
</script>

<style scoped>
/* Stepper & Layout Animations */
.slide-fade-enter-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.list-enter-active, .list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}
</style>
