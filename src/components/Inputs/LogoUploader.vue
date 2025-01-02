<template>
    <div class="flex items-center gap-1">
        <!-- Upload Box -->
        <div class="w-[120px] h-[120px] rounded-md border border-gray-300">
            <label for="upload" class="w-full h-full flex justify-center items-center cursor-pointer">
                <input id="upload" type="file" hidden @change="handleAddNewImage" accept="image/*,image/svg+xml">
                <p>Upload</p>
            </label>
        </div>

        <!-- Image Previews -->
        <div v-if="imageList"
            class="w-[120px] h-[120px] rounded-md border border-gray-300 overflow-hidden relative">
            <img 
                class="w-full h-full object-cover rounded-md" 
                :src="convertFilPreview(imageList)" 
                alt="Uploaded Image" 
            />
            <div @click="handleRemove()" class="absolute top-1 right-1 text-red-500 cursor-pointer">
                <span><i class='bx bxs-trash'></i></span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import useToast from "@/composables/utils/useToast";
import { convertFilPreview } from "@/utils/convertFilePreview";

const { warning } = useToast();

// Define props with proper type annotations
const props = defineProps({
    defaultImage: {
        type: [String, File, null],
        default: "",
    },
    images: {
        type: [File, String, null],
        default: null,
    },
    updateList: {
        type: Function as PropType<(updatedImages: File | String | null) => void>,
        required: true,
    },
});

const imageList = ref<File | String | null>(props.images ? props.images : props.defaultImage);
const handleRemove = () =>{
    imageList.value = null
    props.updateList(imageList.value)
}
const handleAddNewImage = (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (imageList.value) {
        warning("Exceeded the upload limit. Remove an image to upload.");
        return;
    }

    if (target.files && target.files[0]) {
        const file: File = target.files[0];
        const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml", "image/gif"];

        if (!allowedTypes.includes(file.type)) {
            warning("Unsupported file type. Please upload an image (PNG, JPEG, GIF) or SVG file.");
            return;
        }

        const previewUrl = URL.createObjectURL(file); // Generate the preview URL
        imageList.value = previewUrl; // Push the URL (string) directly into the array
        props.updateList(imageList.value as string) // Notify the parent component
    }
};

</script>
