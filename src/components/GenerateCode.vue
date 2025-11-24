<template>
    <div class="generate-code">
        <button
            class="generate-button"
            @click="generateCode"
        >Generate Code</button>

        <div 
            v-if="codeGenerated"
            class="generated-codes"
        >
            <h2>Code</h2>
            <h3>
                Table Header
                <button
                    class="copy"
                    @click="copyToClipboard(currentCode.tableHeader, $event)"
                >Copy</button>
            </h3>
            <code
                v-text="currentCode.tableHeader"
            ></code>

            <h3>Table Footer
                <button
                    class="copy"
                    @click="copyToClipboard(currentCode.tableFooter, $event)"
                >Copy</button>
            </h3>
            <code
                v-text="currentCode.tableFooter"
            ></code>

            <h3>Pre-speech 
                <button
                    class="copy"
                    @click="copyToClipboard(currentCode.preSpeech, $event)"
                >Copy</button></h3>
            <code
                v-text="currentCode.preSpeech"
            ></code>

            <h3>Post-speech
                <button
                    class="copy"
                    @click="copyToClipboard(currentCode.postSpeech, $event)"
                >Copy</button>
            </h3>
            <code
                v-text="currentCode.postSpeech"
            ></code>
        </div>
    </div>
</template>

<script>
import { useTableSettingsStore } from '@/stores/tableSettings';

export default {
    props: {
    },
    setup() {
        const store = useTableSettingsStore()
        return { store }
    },
    data() {
        return {
            codeGenerated: false,
            currentCode: {
                tableHeader: '',
                tableFooter: '',
                preSpeech: '',
                postSpeech: ''
            }
        }
    },
    computed: {
    },
    methods: {
        generateCode() {
            let tableHeader = ''
            let tableFooter = ''
            let preSpeech = ''
            let postSpeech = ''

            let img = ''
            let textOne = ''
            let textTwo = ''

            // If they have a custom font
            if (this.store.settings.customFont) {
                tableHeader += this.store.settings.customFont
            }

            // Base table code
            tableHeader += '<div class="posting-table" style="'
            // Begin destructuring allTableStyles
            tableHeader += this.styleObjectToInlineString(this.store.allTableStyles)
            // Close table header
            tableHeader += '">'

            // If we have an image, build it
            if (this.store.settings.imageSrc) {
                img += `<img src="${this.store.settings.imageSrc}" style="${this.styleObjectToInlineString(this.store.processedImageStyles)}">`
                
                // If we're not wrapping text, it goes here
                if (!this.store.settings.wrapText) {
                    tableHeader += img
                }
            }

            // Text One
            if (this.store.settings.textOne) {
                textOne += `<div class="text-one" style="${this.styleObjectToInlineString(this.store.textOne)}">${this.store.settings.textOne}</div>`

                if (this.store.settings.textOnePosition === 'top') {
                    tableHeader += textOne
                }
            }
            // Text Two
            if (this.store.settings.textTwo) {
                textTwo += `<div class="text-one" style="${this.styleObjectToInlineString(this.store.textTwo)}">${this.store.settings.textTwo}</div>`

                if (this.store.settings.textTwoPosition === 'top') {
                    tableHeader += textTwo
                }
            }

            // Start .posting-table-content
            tableHeader += '<div class="posting-table-content"'
            if (this.store.settings.useMaxHeight || this.store.settings.useInnerContentArea) {
                tableHeader += ` style="`
                if (this.store.settings.useMaxHeight) {
                    tableHeader += `${this.styleObjectToInlineString(this.store.maxHeightStyles)}`
                }
                if (this.store.settings.useInnerContentArea) {
                    tableHeader += `${this.styleObjectToInlineString(this.store.processedInnerContentStyles)}`
                }
                tableHeader += `"`
            }

            // Close starting tag for posting-table-content
            tableHeader += '>'

            // If we have a wrapped image, it needs to go inside of posting table content
            if (this.store.settings.wrapText) {
                tableHeader += img
            }

            // Text One
            if (this.store.settings.textOne) {
                textOne += `<div class="text-one" style="${this.styleObjectToInlineString(this.store.textOne)}">${this.store.settings.textOne}</div>`

                if (this.store.settings.textOnePosition === 'bottom') {
                    tableFooter += textOne
                }
            }
            // Text Two
            if (this.store.settings.textTwo) {
                textTwo += `<div class="text-one" style="${this.styleObjectToInlineString(this.store.textTwo)}">${this.store.settings.textTwo}</div>`

                if (this.store.settings.textTwoPosition === 'bottom') {
                    tableFooter += textTwo
                }
            }

            // Table Footer
            tableFooter += '</div></div>'

            // Base pre-speech
            preSpeech += '<span style="'
            // Begin destructuring speechStyles
            preSpeech += this.styleObjectToInlineString(this.store.speechStyles)
            // Close pre-speech
            preSpeech += '">'

            // Post-speech
            postSpeech += '</span>'

            // Set all currentCode data
            this.currentCode = {
                tableHeader: tableHeader,
                tableFooter: tableFooter,
                preSpeech: preSpeech,
                postSpeech: postSpeech
            }

            this.codeGenerated = true
        },
        styleObjectToInlineString(styleObject) {
            let string = ''
            const emptyValues = [
                "url('')",
                "0",
                "0px",
                "unset",
                'normal'
            ]

            for (const [key, value] of Object.entries(styleObject)) {
                if (!emptyValues.includes(value)) {
                    string += `${this.camelToDash(key)}: ${value.replace(/"/g, "'")}; `
                }
            }
            return string
        },
        camelToDash(string) {
            return string.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
        },
        async copyToClipboard(text, event) {
            try {
                await navigator.clipboard.writeText(text)
                event.target.innerHTML = 'Copied!'
                event.target.classList.add('success')
                setTimeout(() => {
                    event.target.innerHTML = 'Copy'
                    event.target.classList.remove('success')
                }, "2000");
            } catch ($e) {
                console.warn('Failed to copy!', $e)
            }
        }
    },
    mounted() {

    }
}</script>