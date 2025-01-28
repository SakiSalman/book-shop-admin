<template>
    <div class="flex items-center gap-1">
        <!-- Upload Box -->
        <div class="w-[120px] h-[120px] rounded-md border border-gray-300 flex-shrink-0">
            <label for="upload" class="w-full h-full flex justify-center items-center cursor-pointer">
                <input id="upload" type="file" hidden @change="handleAddNewImage" accept="image/*,image/svg+xml">
                <p>Upload</p>
            </label>
        </div>

        <!-- Image Previews -->
        <div v-for="(item, index) in imageList" :key="index"
            class="w-[120px] h-[120px] rounded-md border border-gray-300 overflow-hidden relative flex-shrink-0">
            <img class="w-full h-full object-cover rounded-md"
                :src="isFile(item.path) ? convertFilPreview(item.path) : item.path" alt="Uploaded Image" />
            <div @click="handleRemove(index)" class="absolute top-1 right-1 text-red-500 cursor-pointer">
                <span><i class='bx bxs-trash'></i></span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ImageInterface } from "@/models/CommonModels";
import { convertFilPreview } from "@/utils/convertFilePreview";
import { isFile } from "@/utils/validations";
import { ref, type PropType } from "vue";
import useToast from "@/composables/utils/useToast";
const {warning} = useToast()
// Define props with proper type annotations
const props = defineProps({
    images: {
        type: Array as PropType<ImageInterface[]>,
        default: () => [
            {
                path: "/images/default.webp"
            }
        ]
    },
    updateList: {
        type: Function as PropType<(updatedImages: ImageInterface[]) => void>,
        required: true
    },
    limit: {
        type: [Number, null],
        default : null
    },
});

const imageList = ref<ImageInterface[]>(props.images);

const handleRemove = (index: number) => {
    let prevList = [...imageList.value]
    prevList.splice(index, 1);
    imageList.value = prevList
    props.updateList(imageList.value);
};

const handleAddNewImage = (e: Event) => {
    const target = e.target as HTMLInputElement;

    if (props.limit) {
        if (imageList.value.length >= props.limit) {
            warning(`Exceeded the upload limit. Remove image to upload.`)
            return 
        }
    }
    if (target.files && target.files[0]) {
        const file: File = target.files[0];
        const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/gif'];

        if (!allowedTypes.includes(file.type)) {
            alert('Unsupported file type. Please upload an image (PNG, JPEG, GIF) or SVG file.');
            return;
        }
        imageList.value.push({ path: file });
        props.updateList(imageList.value);
    }
};

</script>
