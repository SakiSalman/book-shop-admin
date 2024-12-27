<template>
    <div class="p-5 rounded-md grid grid-cols-12 gap-1 items-center card-bg bg-white border border-gray-200" :class="`${textColor}`">
      <div class="col-span-4 text-end">
        <!-- Checking if the icon slot is provided before rendering -->
       <div class="w-[50px] h-[50px] rounded-full flex justify-center items-center"
       :class="`${bgColor}`"
       >
        <p v-if="$slots.icon" :class="`duration-700 transition-all icon text-2xl font-bold ${iconColor}`"><slot name="icon"></slot></p>
       </div>
      </div>
      <div class="col-span-8">
        <!-- Conditionally rendering the title with Vue3autocounter -->
        <h4 v-if="title" class="text-2xl">    
          <Vue3autocounter 
            ref="counter" 
            :startAmount="0" 
            :endAmount="title" 
            :duration="2" 
            prefix="$" 
            suffix="" 
            separator="" 
            :autoinit="true"
          />
        </h4>
        <p v-if="subTitle" :class="`text-xs ${textColor}`">{{ subTitle }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import Vue3autocounter from 'vue3-autocounter';
  
  defineProps({
    title: {
      type: Number,
      default: 0
    },
    subTitle: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: 'bg-[#feeded]'
    },
    textColor: {
      type: String,
      default: 'text-black'
    },
    iconColor: {
      type: String,
      default: 'text-primaryOrange'
    }
  });
  </script>
  
  <style scoped>
  .card-bg:hover .icon {
    transform: scale(1.1);
    transition: transform 0.5s ease-in-out;
  }
  </style>
  