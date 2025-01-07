<template>
    <div class="p-5 rounded-md grid grid-cols-12 gap-2 items-center card-bg" :class="`${bgColor} ${textColor}`">
      <div class="col-span-9">
        <!-- Conditionally rendering the title with Vue3autocounter -->
        <h4 v-if="title" class="text-2xl">    
          <Vue3autocounter 
            ref="counter" 
            :startAmount="0" 
            :endAmount="title" 
            :duration="2" 
            prefix="" 
            suffix="" 
            separator="" 
            :autoinit="true"
          />
        </h4>
        <p v-if="subTitle" :class="`text-xs ${textColor}`">{{ subTitle }}</p>
      </div>
      <div class="col-span-3 text-end">
        <!-- Checking if the icon slot is provided before rendering -->
        <p v-if="$slots.icon" :class="`duration-700 transition-all icon ${textColor}`"><slot name="icon"></slot></p>
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
      default: 'bg-primary'
    },
    textColor: {
      type: String,
      default: 'text-white'
    }
  });
  </script>
  
  <style scoped>
  .card-bg:hover .icon {
    transform: scale(1.1);
    transition: transform 0.5s ease-in-out;
  }
  </style>
  