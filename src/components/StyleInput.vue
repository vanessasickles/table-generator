<template>
    <div class="input-group">
        <label
            v-if="type !== 'checkbox'"
            :for="forStoreName + path"
        >{{ label }}</label>
        <p 
            v-if="instructions && (type !== 'radio' && type !== 'checkbox')"
            class="instructions"
            v-html="instructions">
        </p>
        
        <template
            v-if="inputTypes.includes(type)"
        >
            <template
                v-if="type !== 'radio' && type !== 'checkbox'"
            >
                <input 
                    :type="type"
                    :name="forStoreName + path" 
                    :id="forStoreName + path"
                    v-model="model"
                    v-bind="attributes"
                >
                <span v-if="unit" class="unit">{{ unit }}</span>
            </template>
            <template
                v-else-if="type === 'radio'"
            >
                <label
                    v-for="option in options"
                    :key="option.value"
                >
                    <input 
                        :type="type"
                        :name="forStoreName + path" 
                        :id="forStoreName + path + option.value"
                        :value="option.value"
                        v-model="model"
                    />
                    {{ option.label || option.value }}
                </label>
            </template>
            <template
                v-else-if="type === 'checkbox'"
            >
                <label>
                    <input 
                        :type="type"
                        :name="forStoreName + path" 
                        :id="forStoreName + path"
                        v-model="model"
                    />
                    {{ label }}
                </label>
            </template>
        </template>
        <select
            v-else-if="type === 'select'"
            v-model="model"
            :name="forStoreName + path"
            :id="forStoreName + path"
        >
            <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
            >{{ option.label || option.value }}</option>
        </select>
        <textarea
            v-else-if="type === 'textarea'"
            v-model="model"
            :name="forStoreName + path"
            :id="forStoreName + path"
        ></textarea>

        <p 
            v-if="instructions && (type === 'radio' || type === 'checkbox')"
            class="instructions"
            v-html="instructions">
        </p>
    </div>
</template>

<script>
import { mapWritableState } from 'pinia';
import { useTableSettingsStore as store } from '@/stores/tableSettings';

export default {
    props: {
        type: String,
        label: String,
        path: String,
        instructions: String,
        options: {
            type: Array,
            default: null
        },
        unit: {
            type: String,
            default: null
        },
        attributes: {
            type: Object,
            default: {}
        },
        for: {
            type: String,
            default: 'table'
        }
    },
    data() {
        return {
            inputTypes: [
                'color',
                'text',
                'checkbox',
                'number',
                'url',
                'radio'
            ],
            forStoreName: this.for
        }
    },
    computed: {
        ...mapWritableState(store, ['tableStyles', 'speechStyles', 'innerContentStyles', 'imageStyles', 'textOne', 'textTwo', 'settings']),
        forStore() {
            let forStore
            const styleSets = [
                'table',
                'speech',
                'image'
            ]

            if (styleSets.includes(this.for)) {
                forStore = `${this.for}Styles`
            } else {
                forStore = this.for
            }

            return forStore
        },
        model: {
            get() {
                let value = this[this.forStore][this.path]
                if (value && this.unit && value.includes(this.unit)) {
                    value = value.replace(this.unit, "")
                }
                return value
            },
            set(value) {
                if (typeof value !== 'string') {
                    if (Number.isInteger(value)) {
                        value = value.toString()
                    } else {
                        value = value.toFixed(2)
                    }

                    if (this.unit) {
                        value += this.unit
                    }
                }

                this[this.forStore][this.path] = value
            }
        }
    },
    methods: {

    },
    mounted() {

    }
}</script>