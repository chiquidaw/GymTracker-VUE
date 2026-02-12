<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
    <!-- Header Component -->
    <AppHeader />

    <!-- Main Content -->
    <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full relative z-10">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 class="text-4xl font-extrabold text-white mb-2 tracking-tight">Mis Rutinas</h2>
          <p class="text-gray-400 text-lg">Tu centro de entrenamiento personal</p>
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <button 
            @click="showAll = !showAll"
            class="inline-flex items-center justify-center border-2 border-gray-700 hover:border-blue-500 text-gray-400 hover:text-white font-bold py-3 px-6 rounded-2xl transition duration-300 backdrop-blur-md"
            :class="showAll ? 'bg-blue-600/20 border-blue-500 text-blue-400' : ''"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {{ showAll ? 'Ver solo las mías' : 'Ver todas las disponibles' }}
          </button>
          
          <router-link 
            to="/routines/create"
            class="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-8 rounded-2xl transition duration-300 shadow-xl shadow-blue-500/30 transform hover:-translate-y-1"
          >
            <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Nueva Rutina
          </router-link>
        </div>
      </div>

      <!-- Messages Area with Animation -->
      <Transition name="fade">
        <div v-if="successMessage || errorMessage" class="mb-8">
          <div v-if="successMessage" class="bg-green-500/10 backdrop-blur-md border border-green-500/50 text-green-400 px-6 py-4 rounded-2xl text-sm flex items-center shadow-lg">
            <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="bg-red-500/10 backdrop-blur-md border border-red-500/50 text-red-400 px-6 py-4 rounded-2xl text-sm flex items-center shadow-lg">
            <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            {{ errorMessage }}
          </div>
        </div>
      </Transition>

      <div v-if="loading" class="flex flex-col items-center justify-center py-32 space-y-4">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
          <div class="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"></div>
        </div>
        <p class="text-blue-400 font-medium animate-pulse">Cargando rutinas...</p>
      </div>

      <TransitionGroup 
        v-else-if="filteredRoutines.length > 0" 
        tag="div" 
        name="list-complete"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div 
          v-for="routine in filteredRoutines" 
          :key="routine.id"
          class="group bg-gray-800/40 backdrop-blur-xl rounded-[2rem] border border-gray-700/50 p-8 hover:border-blue-500/50 hover:bg-gray-800/60 transition-all duration-500 shadow-2xl relative overflow-hidden flex flex-col list-complete-item"
        >
          <!-- Accent blur -->
          <div class="absolute -right-10 -top-10 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-colors"></div>
          
          <div class="relative z-10 h-full flex flex-col">
            <div class="flex justify-between items-start mb-6">
              <div class="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-gray-900/50 text-gray-500 border border-gray-700">
                {{ routine.exercises?.length || 0 }} Ejercicios
              </span>
            </div>
            
            <h3 class="text-2xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors">{{ routine.name }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed mb-8 flex-1 line-clamp-2">
              {{ routine.description || 'Entrenamiento diseñado para resultados máximos.' }}
            </p>

            <div class="flex items-center gap-4 mt-auto">
              <!-- If subscribed or owner: Train -->
              <router-link 
                v-if="isSubscribed(routine) || isOwner(routine)"
                :to="`/routines/${routine.id}`"
                class="flex-1 bg-white hover:bg-blue-500 text-gray-900 hover:text-white text-sm font-black py-3 px-4 rounded-xl transition-all duration-300 text-center shadow-lg"
              >
                ENTRENAR
              </router-link>
              <!-- If NOT subscribed nor owner: Subscribe -->
              <button 
                v-else
                @click="handleSubscribe(routine)"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-black py-3 px-4 rounded-xl transition-all duration-300 text-center shadow-lg uppercase"
              >
                Suscribirse
              </button>

              <!-- Secondary Action: Unsubscribe -->
              <button 
                v-if="isSubscribed(routine) && !isOwner(routine)"
                @click="handleUnsubscribe(routine)"
                class="aspect-square bg-gray-900/50 hover:bg-red-500/20 text-gray-500 hover:text-red-500 p-3 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-300"
                title="Desvincular"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty State -->
      <div v-else class="bg-gray-800/20 backdrop-blur-sm rounded-[3rem] border-2 border-dashed border-gray-700 p-20 text-center animate-fade-in">
        <div class="max-w-md mx-auto">
          <div class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto mb-8 shadow-inner border border-gray-700">
            <svg class="h-12 w-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 class="text-3xl font-black text-white mb-4 tracking-tight">No hay rutinas</h3>
          <p class="text-gray-500 text-lg mb-10 leading-relaxed">Prueba a cambiar el filtro o crea una nueva rutina para empezar.</p>
          <router-link 
            to="/routines/create"
            class="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-10 rounded-2xl transition duration-300 shadow-2xl shadow-blue-500/30 transform hover:scale-105"
          >
            CREAR MI RUTINA
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>
        </div>
      </div>
    </main>

    <AppFooter class="relative z-10" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import routineService from '@/services/routineService'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const showAll = ref(false)
const routines = ref([])
const myRoutinesIds = ref([]) 
const loading = ref(true)
const successMessage = ref('')
const errorMessage = ref('')

const fetchRoutines = async () => {
  loading.value = true
  try {
    // Parallel fetch: All routines + Subscribed (official)
    const [all, mine] = await Promise.all([
      routineService.getRoutines(),
      routineService.getMyRoutines()
    ])
    
    routines.value = Array.isArray(all) ? all : []
    myRoutinesIds.value = Array.isArray(mine) ? mine.map(r => r.id) : []
  } catch (error) {
    showFeedback('Error al sincronizar rutinas', true)
  } finally {
    loading.value = false
  }
}

const isOwner = (routine) => {
  if (!authStore.user?.id) return false
  const userId = Number(authStore.user.id)
  const routineUserId = routine.user_id ? Number(routine.user_id) : null
  const routineCreatorId = routine.creator_id ? Number(routine.creator_id) : null
  
  return routineUserId === userId || routineCreatorId === userId
}

const isSubscribed = (routine) => {
  const routineId = Number(routine.id)
  return myRoutinesIds.value.some(id => Number(id) === routineId)
}

const filteredRoutines = computed(() => {
  if (showAll.value) return routines.value
  
  // Only show mine: created by me OR subscribed
  return routines.value.filter(r => isOwner(r) || isSubscribed(r))
})

const handleSubscribe = async (routine) => {
  try {
    await routineService.subscribe(routine.id)
    myRoutinesIds.value.push(routine.id)
    showFeedback('Suscrito correctamente')
  } catch (error) {
    showFeedback('Error al suscribir', true)
  }
}

const handleUnsubscribe = async (routine) => {
  if (!confirm(`¿Eliminar "${routine.name}" de tus rutinas?`)) return
  
  try {
    await routineService.unsubscribe(routine.id)
    myRoutinesIds.value = myRoutinesIds.value.filter(id => id !== routine.id)
    showFeedback('Rutina eliminada de tu lista')
  } catch (error) {
    showFeedback('Error al desvincular', true)
  }
}

const showFeedback = (msg, isError = false) => {
  if (isError) errorMessage.value = msg
  else successMessage.value = msg
  setTimeout(() => {
    successMessage.value = ''
    errorMessage.value = ''
  }, 3000)
}

onMounted(fetchRoutines)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.list-complete-item {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.list-complete-enter-from, .list-complete-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
.list-complete-leave-active {
  position: absolute;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>
