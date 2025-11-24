<template>
    <div 
        class="table-preview"
        :class="store.settings.device"
    >
        <h2>Table Preview</h2>
        <StyleInput 
            v-if="showDeviceOptions"
            type="radio"
            label="Device"
            path="device"
            :options="[
                { label: 'Mobile', value: 'mobile'},
                { label: 'Desktop', value: 'desktop' }
            ]"
            for="settings"
        />
        <div
            v-if="store.settings.customFont"
            v-html="store.settings.customFont"
        ></div>
        <div 
            class="posting-table"
            :style="store.allTableStyles"
        >
            <img 
                v-if="store.settings.imageSrc && !store.settings.wrapText"
                :src="store.settings.imageSrc"
                class="posting-table-image"
                :style="store.processedImageStyles"
            >
            <div 
                class="posting-table-content"
                ref="postingTableContent"
                :style="store.processedInnerContentStyles"
            >
                <img 
                    v-if="store.settings.imageSrc && store.settings.wrapText"
                    :src="store.settings.imageSrc"
                    class="posting-table-image"
                    :style="store.processedImageStyles"
                >
                <div 
                    v-if="store.settings.textOne && store.settings.textOnePosition === 'top'"
                    class="text-one"
                    :style="store.textOne"
                    v-html="store.settings.textOne"
                ></div>
                <div 
                    v-if="store.settings.textTwo && store.settings.textTwoPosition === 'top'"
                    class="text-two"
                    :style="store.textTwo"
                    v-html="store.settings.textTwo"
                ></div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare, eros eu vehicula cursus, tellus nulla pulvinar urna, efficitur laoreet nibh eros in risus. Praesent et erat non orci varius congue. Sed eu lorem rutrum, varius nulla in, consequat erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia ac massa sed placerat. Donec iaculis massa at dui vehicula accumsan. <span :style="store.speechStyles">"Etiam eget porta justo. Curabitur suscipit porta lectus eget laoreet. Suspendisse non auctor quam. Fusce lacinia ligula a risus aliquet, quis fringilla dui porta. Nulla accumsan lacus et est pretium lobortis."</span> Ut nec venenatis sem, eget tincidunt ligula. Pellentesque sodales neque ut metus pulvinar aliquet. Cras luctus lacus eu leo dapibus, at rhoncus eros lacinia. Nulla facilisi.</p>

                <p><span :style="store.speechStyles">"Vestibulum in ante ac elit pretium volutpat dapibus porta nisl. Donec ante felis,"</span> cursus ac mattis ac, vulputate congue magna. Vestibulum volutpat, risus sodales commodo ornare, elit risus pellentesque magna, vitae posuere turpis libero nec massa. Vivamus accumsan condimentum ornare. Sed purus lorem, efficitur et tortor rhoncus, semper pharetra ex. Mauris bibendum urna ac felis congue laoreet. Donec mauris sapien, egestas eu vehicula vel, tempor finibus nibh. Donec a velit sed est convallis bibendum vitae vitae justo. Morbi sed iaculis erat, facilisis mattis sapien. In hac habitasse platea dictumst. Suspendisse potenti. Phasellus non porttitor nisi, id fringilla neque. Morbi sem neque, sagittis ac molestie nec, fermentum ac nisl.</p>

                <div 
                    v-if="store.settings.textOne && store.settings.textOnePosition === 'bottom'"
                    class="text-one"
                    :style="store.textOne"
                    v-html="store.settings.textOne"
                ></div>
                <div 
                    v-if="store.settings.textTwo && store.settings.textTwoPosition === 'bottom'"
                    class="text-two"
                    :style="store.textTwo"
                    v-html="store.settings.textTwo"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'pinia';
import { useTableSettingsStore } from '@/stores/tableSettings';
import StyleInput from './StyleInput.vue'

export default {
    components: {
        StyleInput
    },
    data() {
        return {
            windowWidth: window.innerWidth
        }
    },
    setup() {
        const store = useTableSettingsStore()
        return { store }
    },
    computed: {
        showDeviceOptions() {
            return this.windowWidth > 500
        }
    },
    methods: {

    },
    mounted() {
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth
        })
    }
}</script>