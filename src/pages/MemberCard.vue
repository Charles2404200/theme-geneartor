<<script setup>
import { ref } from "vue";
import notNhac from "@/assets/notNhac.svg";

const fileE = ref(null);
const filePha = ref(null);
const fileSol = ref(null);
const fileLa = ref(null);
const fileInternal = ref(null);
const fileInternalPlus = ref(null);

const previewE = ref(null);
const previewPha = ref(null);
const previewSol = ref(null);
const previewLa = ref(null);
const previewInternal = ref(null);
const previewInternalPlus = ref(null);

const handleSelect = (e, type) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.includes("webp")) return;
  if (file.size > 1024 * 1024) return;

  const url = URL.createObjectURL(file);

  switch (type) {
    case "e":
      previewE.value = url;
      break;
    case "pha":
      previewPha.value = url;
      break;
    case "sol":
      previewSol.value = url;
      break;
    case "la":
      previewLa.value = url;
      break;
    case "internal":
      previewInternal.value = url;
      break;
    case "internalPlus":
      previewInternalPlus.value = url;
      break;
  }
};
</script>

<template>
  <div class="min-h-screen bg-[#f7f7fa] text-[#111827]">
    <div class="max-w-6xl mx-auto py-8 px-8 space-y-6">

      <!-- Header -->
      <div>
        <p class="text-xs text-gray-400">Campaigns</p>
        <h1 class="text-2xl font-semibold mt-1">Config Interface</h1>
      </div>

      <!-- Tabs -->
      <div class="border-b border-gray-200">
        <div class="flex gap-6 text-sm">
          <RouterLink to="/color" class="pb-3 text-gray-400 hover:text-black">Color</RouterLink>
          <RouterLink to="/splash" class="pb-3 text-gray-400 hover:text-black">Splash Screen</RouterLink>
          <RouterLink to="/background" class="pb-3 text-gray-400 hover:text-black">Background</RouterLink>
          <RouterLink to="/banner" class="pb-3 text-gray-400 hover:text-black">Home - Top Banner</RouterLink>

          <!-- ACTIVE -->
          <RouterLink
            to="/member"
            class="pb-3 border-b-2 border-[#c28c51] font-medium text-[#c28c51]"
          >
            Member Card
          </RouterLink>
        </div>
      </div>

      <!-- CONTENT -->
      <div class="space-y-10">
        <div class="grid grid-cols-2 gap-10">

          <!-- Upload -->
          <div>
            <p class="text-sm font-semibold mb-2">Hạng E-Member (.webp, <1Mb)</p>

            <label
              class="border-2 border-dashed border-gray-300 rounded-2xl h-56 flex flex-col 
              items-center justify-center cursor-pointer bg-white hover:bg-gray-50 transition"
            >
              <input type="file" accept=".webp" class="hidden" @change="e=>handleSelect(e,'e')" />

              <div class="flex gap-3 text-gray-500 text-2xl mb-2">
                <span>⬆️</span>
                <span>📁</span>
              </div>

              <p class="text-sm text-gray-400">Drag & Drop a File Here</p>
            </label>
          </div>

          <!-- Preview -->
          <div>
            <p class="text-sm font-semibold mb-2">Preview</p>

            <div class="relative w-[330px] h-[200px] rounded-xl shadow overflow-hidden">

              <!-- Background (image + overlay đẹp) -->
              <div class="absolute inset-0">
                <img
                  v-if="previewE"
                  :src="previewE"
                  class="w-full h-full object-cover brightness-[0.55]"
                />

                <!-- Nếu chưa upload thì nền default -->
                <div
                  v-else
                  class="w-full h-full bg-[#91a9c5]"
                ></div>

                <!-- Overlay mờ trắng nhẹ -->
                <div class="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
              </div>

              <!-- CONTENT -->
              <div class="relative z-10 text-white p-5">

                <!-- Avatar -->
                

                <!-- Name -->
                <p class="mt-2 text-[14px] font-semibold">Duc Tran</p>

                <!-- Badge -->
                <div
                  class="mt-2 flex items-center gap-1 bg-[#B9804E] text-white w-fit px-2 py-[2px] 
                  rounded-full text-[12px] font-semibold shadow-sm"
                >
                  <img :src="notNhac" class="w-6 h-6 opacity-80" />
                  <span>0</span>
                </div>

                <!-- Tier -->
                <p class="mt-3 text-[18px] font-bold tracking-wide" style="color:#B9804E;">
                  HẠNG E-MEMBER
                </p>

                <!-- Divider -->
                <div class="w-full h-[1px] bg-white/40 mt-1"></div>

                <!-- Description -->
                <p class="mt-1 text-[12px] leading-tight opacity-90">
                  10 điểm mức ưu đãi bạn sẽ thăng lên Hạng E<br>
                  <span class="font-medium" style="color:#B9804E;">
                    Tìm hiểu về các hạng thẻ thành viên →
                  </span>
                </p>

              </div>
            </div>
          </div>

        </div>

        <!--HẠNG Pha-->
        <div class="grid grid-cols-2 gap-10">

          <!-- Upload -->
          <div>
            <p class="text-sm font-semibold mb-2">Hạng Pha (.webp, <1Mb)</p>

            <label
              class="border-2 border-dashed border-gray-300 rounded-2xl h-56 flex flex-col 
              items-center justify-center cursor-pointer bg-white hover:bg-gray-50 transition"
            >
              <input type="file" accept=".webp" class="hidden" @change="e=>handleSelect(e,'pha')" />

              <div class="flex gap-3 text-gray-500 text-2xl mb-2">
                <span>⬆️</span>
                <span>📁</span>
              </div>

              <p class="text-sm text-gray-400">Drag & Drop a File Here</p>
            </label>
          </div>

          <!-- Preview -->
          <div>
            <p class="text-sm font-semibold mb-2">Preview</p>

            <div class="relative w-[330px] h-[200px] rounded-xl shadow overflow-hidden">

              <!-- Background -->
              <div class="absolute inset-0">
                <img
                  v-if="previewPha"
                  :src="previewPha"
                  class="w-full h-full object-cover brightness-[0.55]"
                />

                <div v-else class="w-full h-full bg-[#91a9c5]"></div>

                <div class="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
              </div>

              <!-- CONTENT -->
              <div class="relative z-10 text-white p-5">

                

                <p class="mt-2 text-[14px] font-semibold">Duc Tran</p>

                <div
                  class="mt-2 flex items-center gap-1 bg-[#B9804E] text-white w-fit px-2 py-[2px] 
                  rounded-full text-[12px] font-semibold shadow-sm"
                >
                  <img :src="notNhac" class="w-6 h-6 opacity-80" />
                  <span>0</span>
                </div>

                <p class="mt-3 text-[18px] font-bold tracking-wide" style="color:#B9804E;">
                  HẠNG PHA
                </p>

                <div class="w-full h-[1px] bg-white/40 mt-1"></div>

                <p class="mt-1 text-[12px] leading-tight opacity-90">
                  10 điểm mức ưu đãi bạn sẽ thăng lên Hạng Pha<br>
                  <span class="font-medium" style="color:#B9804E;">
                    Tìm hiểu về các hạng thẻ thành viên →
                  </span>
                </p>

              </div>
            </div>
          </div>

        </div>

                <!--HẠNG Sol-->
        <div class="grid grid-cols-2 gap-10">
          <div>
            <p class="text-sm font-semibold mb-2">Hạng Sol (.webp, <1Mb)</p>

            <label
              class="border-2 border-dashed border-gray-300 rounded-2xl h-56 flex flex-col 
              items-center justify-center cursor-pointer bg-white hover:bg-gray-50 transition"
            >
              <input type="file" accept=".webp" class="hidden" @change="e=>handleSelect(e,'sol')" />

              <div class="flex gap-3 text-gray-500 text-2xl mb-2">
                <span>⬆️</span>
                <span>📁</span>
              </div>

              <p class="text-sm text-gray-400">Drag & Drop a File Here</p>
            </label>
          </div>

          <!-- Preview -->
          <div>
            <p class="text-sm font-semibold mb-2">Preview</p>

            <div class="relative w-[330px] h-[200px] rounded-xl shadow overflow-hidden">

              <!-- Background -->
              <div class="absolute inset-0">
                <img
                  v-if="previewSol"
                  :src="previewSol"
                  class="w-full h-full object-cover brightness-[0.55]"
                />

                <div v-else class="w-full h-full bg-[#91a9c5]"></div>

                <div class="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
              </div>

              <!-- CONTENT -->
              <div class="relative z-10 text-white p-5">

                

                <p class="mt-2 text-[14px] font-semibold">Duc Tran</p>

                <div
                  class="mt-2 flex items-center gap-1 bg-[#B9804E] text-white w-fit px-2 py-[2px] 
                  rounded-full text-[12px] font-semibold shadow-sm"
                >
                  <img :src="notNhac" class="w-6 h-6 opacity-80" />
                  <span>0</span>
                </div>

                <p class="mt-3 text-[18px] font-bold tracking-wide" style="color:#B9804E;">
                  HẠNG SOL
                </p>

                <div class="w-full h-[1px] bg-white/40 mt-1"></div>

                <p class="mt-1 text-[12px] leading-tight opacity-90">
                  10 điểm mức ưu đãi bạn sẽ thăng lên Hạng Sol<br>
                  <span class="font-medium" style="color:#B9804E;">
                    Tìm hiểu về các hạng thẻ thành viên →
                  </span>
                </p>

              </div>
            </div>
          </div>

        </div>

                <!--HẠNG La-->
        <div class="grid grid-cols-2 gap-10">

          <!-- Upload -->
          <div>
            <p class="text-sm font-semibold mb-2">Hạng La (.webp, <1Mb)</p>

            <label
              class="border-2 border-dashed border-gray-300 rounded-2xl h-56 flex flex-col 
              items-center justify-center cursor-pointer bg-white hover:bg-gray-50 transition"
            >
              <input type="file" accept=".webp" class="hidden" @change="e=>handleSelect(e,'la')" />

              <div class="flex gap-3 text-gray-500 text-2xl mb-2">
                <span>⬆️</span>
                <span>📁</span>
              </div>

              <p class="text-sm text-gray-400">Drag & Drop a File Here</p>
            </label>
          </div>

          <!-- Preview -->
          <div>
            <p class="text-sm font-semibold mb-2">Preview</p>

            <div class="relative w-[330px] h-[200px] rounded-xl shadow overflow-hidden">

              <!-- Background -->
              <div class="absolute inset-0">
                <img
                  v-if="previewLa"
                  :src="previewLa"
                  class="w-full h-full object-cover brightness-[0.55]"
                />

                <div v-else class="w-full h-full bg-[#91a9c5]"></div>

                <div class="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
              </div>

              <!-- CONTENT -->
              <div class="relative z-10 text-white p-5">

                

                <p class="mt-2 text-[14px] font-semibold">Duc Tran</p>

                <div
                  class="mt-2 flex items-center gap-1 bg-[#B9804E] text-white w-fit px-2 py-[2px] 
                  rounded-full text-[12px] font-semibold shadow-sm"
                >
                  <img :src="notNhac" class="w-6 h-6 opacity-80" />
                  <span>0</span>
                </div>

                <p class="mt-3 text-[18px] font-bold tracking-wide" style="color:#B9804E;">
                  HẠNG LA
                </p>

                <div class="w-full h-[1px] bg-white/40 mt-1"></div>

                <p class="mt-1 text-[12px] leading-tight opacity-90">
                  10 điểm mức ưu đãi bạn sẽ thăng lên Hạng La<br>
                  <span class="font-medium" style="color:#B9804E;">
                    Tìm hiểu về các hạng thẻ thành viên →
                  </span>
                </p>

              </div>
            </div>
          </div>

        </div>

                <!--HẠNG internal-->
        <div class="grid grid-cols-2 gap-10">

          <!-- Upload -->
          <div>
            <p class="text-sm font-semibold mb-2">Hạng Internal (.webp, <1Mb)</p>

            <label
              class="border-2 border-dashed border-gray-300 rounded-2xl h-56 flex flex-col 
              items-center justify-center cursor-pointer bg-white hover:bg-gray-50 transition"
            >
              <input type="file" accept=".webp" class="hidden" @change="e=>handleSelect(e,'internal')" />

              <div class="flex gap-3 text-gray-500 text-2xl mb-2">
                <span>⬆️</span>
                <span>📁</span>
              </div>

              <p class="text-sm text-gray-400">Drag & Drop a File Here</p>
            </label>
          </div>
          <div>
            <p class="text-sm font-semibold mb-2">Preview</p>

            <div class="relative w-[330px] h-[200px] rounded-xl shadow overflow-hidden">

              <!-- Background -->
              <div class="absolute inset-0">
                <img
                  v-if="previewInternal"
                  :src="previewInternal"
                  class="w-full h-full object-cover brightness-[0.55]"
                />

                <div v-else class="w-full h-full bg-[#91a9c5]"></div>

                <div class="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
              </div>

              <!-- CONTENT -->
              <div class="relative z-10 text-white p-5">

                

                <p class="mt-2 text-[14px] font-semibold">Duc Tran</p>

                <div
                  class="mt-2 flex items-center gap-1 bg-[#B9804E] text-white w-fit px-2 py-[2px] 
                  rounded-full text-[12px] font-semibold shadow-sm"
                >
                  <img :src="notNhac" class="w-6 h-6 opacity-80" />
                  <span>0</span>
                </div>

                <p class="mt-3 text-[18px] font-bold tracking-wide" style="color:#B9804E;">
                  HẠNG INTERNAL
                </p>

                <div class="w-full h-[1px] bg-white/40 mt-1"></div>

                <p class="mt-1 text-[12px] leading-tight opacity-90">
                  10 điểm mức ưu đãi bạn sẽ thăng lên Hạng Internal<br>
                  <span class="font-medium" style="color:#B9804E;">
                    Tìm hiểu về các hạng thẻ thành viên →
                  </span>
                </p>

              </div>
            </div>
          </div>

        </div>

                <!--HẠNG PHA-->
        <div class="grid grid-cols-2 gap-10">
          <div>
            <p class="text-sm font-semibold mb-2">Hạng Internal Plus (.webp, <1Mb)</p>

            <label
              class="border-2 border-dashed border-gray-300 rounded-2xl h-56 flex flex-col 
              items-center justify-center cursor-pointer bg-white hover:bg-gray-50 transition"
            >
              <input type="file" accept=".webp" class="hidden" @change="e=>handleSelect(e,'internalPlus')" />

              <div class="flex gap-3 text-gray-500 text-2xl mb-2">
                <span>⬆️</span>
                <span>📁</span>
              </div>

              <p class="text-sm text-gray-400">Drag & Drop a File Here</p>
            </label>
          </div>

          <div>
            <div class="relative w-[330px] h-[200px] rounded-xl shadow overflow-hidden">
              <div class="absolute inset-0">
                <img
                  v-if="previewInternalPlus"
                  :src="previewInternalPlus"
                  class="w-full h-full object-cover brightness-[0.55]"
                />

                <div v-else class="w-full h-full bg-[#91a9c5]"></div>

                <div class="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
              </div>
              <div class="relative z-10 text-white p-5">

                

                <p class="mt-2 text-[14px] font-semibold">Duc Tran</p>

                <div
                  class="mt-2 flex items-center gap-1 bg-[#B9804E] text-white w-fit px-2 py-[2px] 
                  rounded-full text-[12px] font-semibold shadow-sm"
                >
                  <img :src="notNhac" class="w-6 h-6 opacity-80" />
                  <span>0</span>
                </div>

                <p class="mt-3 text-[18px] font-bold tracking-wide" style="color:#B9804E;">
                  HẠNG INTERNAL PLUS
                </p>

                <div class="w-full h-[1px] bg-white/40 mt-1"></div>

                <p class="mt-1 text-[12px] leading-tight opacity-90">
                  10 điểm mức ưu đãi bạn sẽ thăng lên Hạng Internal Plus<br>
                  <span class="font-medium" style="color:#B9804E;">
                    Tìm hiểu về các hạng thẻ thành viên →
                  </span>
                </p>

              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>
