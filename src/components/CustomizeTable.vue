<template>
  <section class="customize-table">
    <h2>Customization Options</h2>
    <details open>
      <summary>
        <h3>Main Settings</h3>
      </summary>
      <div class="inputs">
        <StyleInput type="checkbox" label="Use a transparent background?" path="useTransparentBackground" for="settings" />
        <StyleInput v-if="!settings.useTransparentBackground" type="color" label="Text Color" path="color" />
        <StyleInput v-if="!settings.useTransparentBackground" type="color" label="Background Color" path="backgroundColor" />
        <StyleInput type="checkbox" label="Set a max height?" for="settings" path="useMaxHeight"
          instructions="Will create a scrollbar if the post text gets taller than the height you set!" />
        <StyleInput v-if="settings.useMaxHeight" type="number" unit="px" label="Max Height" path="maxHeight"
          for="settings" :attributes="{
            step: 50,
            min: 300,
            max: 700
          }" />
      </div>
    </details>

    <details>
      <summary>
        <h3>Custom Font</h3>
      </summary>
      <div class="inputs">
        <StyleInput type="textarea" label="Google Font" path="customFont" for="settings"
          instructions='The embed code given when you select a font on <a href="https://fonts.google.com/">Google Fonts</a>.' />
      </div>
    </details>

    <details open>
      <summary>
        <h3>Main Text</h3>
      </summary>
      <div class="inputs">
        <StyleInput type="text" label="Font Family" path="fontFamily" />
        <StyleInput type="number" label="Font Size" path="fontSize" unit="px" :attributes="{
          min: 16
        }" />
        <StyleInput type="select" label="Font Weight" path="fontWeight" :options="[
          { label: 'light', value: '200' },
          { label: 'normal', value: 'normal'},
          { label: 'thicker', value: '600'},
          { label: 'bold', value: 'bold'},
          { label: 'bolder', value: '900'}
        ]" 
          instructions="Some options not make a difference depending on which weights are available in your font!"
        />
        <StyleInput type="select" label="Font Style" path="fontStyle" :options="[
          { value: 'normal' },
          { value: 'italic' }
        ]" />
        <StyleInput type="number" label="Line Height" path="lineHeight" :attributes="{
          step: '0.25',
          min: '0.75',
          max: 2
        }" />
        <StyleInput type="number" label="Letter Spacing" path="letterSpacing" unit="px" :attributes="{
          min: 0,
          max: 2,
          step: 1
        }" 
          instructions="If you set this here, it will affect the whole table; override it away on the other sections if desired!"
        />
        <StyleInput type="select" label="Text Alignment" path="textAlign" :options="[
          { value: 'left' },
          { value: 'justify'}
        ]"
        />
      </div>
    </details>

    <details open>
      <summary>
        <h3>Speech Text</h3>
      </summary>
      <div class="inputs">
        <StyleInput type="color" label="Speech Text Color" path="color" for="speech" />
        <StyleInput type="text" label="Font Family" path="fontFamily" for="speech" />
        <StyleInput type="number" label="Font Size" path="fontSize" unit="px" for="speech" :attributes="{
          min: 16
        }" />
        <StyleInput type="number" label="Line Height" path="lineHeight" :attributes="{
          step: '0.25',
          min: '0.75',
          max: 2
        }" for="speech" />
        <StyleInput type="number" label="Letter Spacing" path="letterSpacing" for="speech" unit="px" :attributes="{
          min: 0,
          max: 2,
          step: 1
        }" />
        <StyleInput type="select" label="Font Weight" path="fontWeight" for="speech" :options="[
          { label: 'light', value: '200' },
          { label: 'normal', value: 'normal'},
          { label: 'thicker', value: '600'},
          { label: 'bold', value: 'bold'},
          { label: 'bolder', value: '900'}
        ]" 
          instructions="Some options not make a difference depending on which weights are available in your font!"
        />
        <StyleInput type="select" label="Font Style" path="fontStyle" :options="[
          { value: 'normal' },
          { value: 'italic' }
        ]" for="speech" />
      </div>
    </details>

    <details open>
      <summary>
        <h3>Spacing</h3>
      </summary>
      <div class="inputs">
        <div class="field-group">
          <label class="set-all-input" for="setAllPaddingTo">
            Set all padding to
          </label>
          <input type="number" name="setAllPaddingTo" v-model="setAllPaddingToValue" />
          <button type="button" @click="setAllPaddingTo(setAllPaddingToValue)">Set</button>
        </div>
        <StyleInput type="number" label="Padding Top" path="paddingTop" unit="px" :attributes="{
          min: 0
        }" />
        <StyleInput type="number" label="Padding Right" path="paddingRight" unit="px" :attributes="{
          min: 0
        }" />
        <StyleInput type="number" label="Padding Bottom" path="paddingBottom" unit="px" :attributes="{
          min: 0
        }" />
        <StyleInput type="number" label="Padding Left" path="paddingLeft" unit="px" :attributes="{
          min: 0
        }" />

      </div>
    </details>

    <details>
      <summary>
        <h3>Background Image</h3>
      </summary>
      <div class="inputs">
        <StyleInput type="text" label="Background Image" path="backgroundImage" />
        <StyleInput type="select" label="Background Position" path="backgroundPosition" :options="[
          { value: 'top' },
          { value: 'left' },
          { value: 'center' },
          { value: 'right' },
          { value: 'bottom' }
        ]" />
        <StyleInput type="select" label="Background Size" path="backgroundSize" :options="[
          { value: 'cover' },
          { value: 'contain' },
          { value: '100%' },
          { value: 'auto' },
          { value: 'unset' }
        ]" />
        <StyleInput type="select" label="Background Repeat" path="backgroundRepeat" :options="[
          { label: 'Repeat', value: 'repeat' },
          { label: 'Don\'t Repeat', value: 'no-repeat' }
        ]" />
      </div>
    </details>

    <details v-if="!settings.useTransparentBackground">
      <summary>
        <h3>Inner Content Section</h3>
      </summary>
      <div class="inputs">
        <StyleInput type="checkbox" label="Use an inner background layer around the content?" path="useInnerContentArea" for="settings" />
        <template
          v-if="settings.useInnerContentArea"
        >
          <div class="field-group">
            <StyleInput type="color" label="Background Color" for="settings" path="innerContentBackgroundColor" />
            <StyleInput type="number" label="Background Opacity" for="settings" path="innerContentBackgroundOpacity" :attributes="{
              min: 0,
              max: 100,
              step: 5
            }" />
            <label class="set-all-input" for="setAllPaddingTo">
              Set all padding to
            </label>
            <input type="number" name="setAllPaddingTo" v-model="setAllPaddingToValue" />
            <button type="button" @click="setAllPaddingTo(setAllPaddingToValue)">Set</button>
          </div>
          <StyleInput type="number" label="Padding Top" path="paddingTop" for="innerContentStyles" unit="px" :attributes="{
          min: 0
          }" />
          <StyleInput type="number" label="Padding Right" path="paddingRight" for="innerContentStyles" unit="px" :attributes="{
            min: 0
          }" />
          <StyleInput type="number" label="Padding Bottom" path="paddingBottom" for="innerContentStyles" unit="px" :attributes="{
            min: 0
          }" />
          <StyleInput type="number" label="Padding Left" path="paddingLeft" for="innerContentStyles" unit="px" :attributes="{
            min: 0
          }" />
          <StyleInput type="number" label="Border Width" path="borderWidth" for="innerContentStyles" unit="px" :attributes="{
            min: 0,
            max: 100
          }" />
          <StyleInput type="color" label="Border Color" for="innerContentStyles" path="borderColor" />
          <StyleInput type="select" label="Border Style" for="innerContentStyles" path="borderStyle" :options="[
            { value: 'solid' },
            { value: 'dotted' },
            { value: 'dashed' }
          ]" />
        </template>
        
      </div>
    </details>

    <details>
      <summary>
        <h3>Additional Image</h3>
      </summary>
      <div class="inputs">
        <StyleInput type="text" label="Image URL" path="imageSrc" for="settings" />
        <template
          v-if="settings.imageSrc"
        >
          <StyleInput type="checkbox" label="Wrap the table text around image?" path="wrapText" for="settings" />
          <StyleInput type="number" label="Image Width (%)" path="imageWidthPercent" unit="%" for="settings"
            instructions="The maximum % of the table width the image should take up. For example, half would be 50%. Between this and the px amount, it will choose whichever is larger."
            :attributes="{
              min: 0
            }" />
          <StyleInput type="number" label="Image Width (px)" path="imageWidthPixels" unit="px" for="settings" :attributes="{
            step: 50,
            min: 0,
            max: 350
          }" />
          <StyleInput type="select" label="Image goes which side?" path="imageSide" for="settings"
            :options="imageSideOptions" />
          <StyleInput type="number" label="Space between image and text" path="imageSpacing" unit="px" for="settings"
            :attributes="{
              min: 0
            }" />
          <StyleInput v-if="!settings.wrapText" type="select" :label="`Image Alignment`" path="imageAlignment" unit="px"
            for="settings"
            instructions="If image is on the left or the right, this will determine its vertical spacing. If it's on the top or bottom, this will determine its horizontal spacing."
            :options="[
              { value: 'center' },
              { value: 'start' },
              { value: 'end' }
            ]" />
        </template>
        
      </div>
    </details>

    <details>
      <summary><h3>Additional Text (#1)</h3></summary>
      <div class="inputs">
        <StyleInput type="text" label="Custom Text" path="textOne" for="settings" />
        <template v-if="settings.textOne">
          <StyleInput type="color" label="Text Color" path="color" for="textOne" />
          <StyleInput type="select" label="Text Position" path="textOnePosition" for="settings" :options="[
            { value: 'top' },
            { value: 'bottom'}
          ]"
          />
          <StyleInput type="text" label="Font Family" path="fontFamily" for="textOne" />
          <StyleInput type="number" label="Font Size" path="fontSize" unit="px" for="textOne" />
          <StyleInput type="select" label="Font Weight" path="fontWeight" for="textOne" :options="[
            { label: 'light', value: '200' },
            { label: 'normal', value: 'normal'},
            { label: 'thicker', value: '600'},
            { label: 'bold', value: 'bold'},
            { label: 'bolder', value: '900'}
          ]" 
            instructions="Some options not make a difference depending on which weights are available in your font!"
          />
          <StyleInput type="select" label="Font Style" path="fontStyle" for="textOne" :options="[
            { value: 'normal' },
            { value: 'italic' }
          ]" />
          <StyleInput type="number" label="Line Height" path="lineHeight" for="textOne" :attributes="{
            step: '0.25',
            min: '0.25',
            max: 2
          }" />
          <StyleInput type="number" label="Letter Spacing" path="letterSpacing" for="textOne" unit="px" :attributes="{
            min: 0,
            max: 10,
            step: 1
          }" />
          <StyleInput type="select" label="Text Alignment" path="textAlign" for="textOne" :options="[
            { value: 'left' },
            { value: 'right'},
            { value: 'justify'},
            { value: 'center'}
          ]"
          />
        </template>
      </div>
    </details>

    <details>
      <summary><h3>Additional Text (#2)</h3></summary>
      <div class="inputs">
        <StyleInput type="text" label="Custom Text" path="textTwo" for="settings" />
        <template
          v-if="settings.textTwo"
        >
          <StyleInput type="color" label="Text Color" path="color" for="textTwo" />
          <StyleInput type="select" label="Text Position" path="textTwoPosition" for="settings" :options="[
            { value: 'top' },
            { value: 'bottom'}
          ]"
          />
          <StyleInput type="text" label="Font Family" path="fontFamily" for="textTwo" />
          <StyleInput type="number" label="Font Size" path="fontSize" unit="px" for="textTwo" />
          <StyleInput type="select" label="Font Weight" path="fontWeight" for="textTwo" :options="[
            { label: 'light', value: '200' },
            { label: 'normal', value: 'normal'},
            { label: 'thicker', value: '600'},
            { label: 'bold', value: 'bold'},
            { label: 'bolder', value: '900'}
          ]" 
            instructions="Some options not make a difference depending on which weights are available in your font!"
          />
          <StyleInput type="select" label="Font Style" path="fontStyle" for="textTwo" :options="[
            { value: 'normal' },
            { value: 'italic' }
          ]" />
          <StyleInput type="number" label="Line Height" path="lineHeight" for="textTwo" :attributes="{
            step: '0.25',
            min: '0.25',
            max: 2
          }" />
          <StyleInput type="number" label="Letter Spacing" path="letterSpacing" for="textTwo" unit="px" :attributes="{
            min: 0,
            max: 10,
            step: 1
          }" />
          <StyleInput type="select" label="Text Alignment" path="textAlign" for="textTwo" :options="[
            { value: 'left' },
            { value: 'right'},
            { value: 'justify'},
            { value: 'center'}
          ]"
          />
        </template>
      </div>
    </details>

    <details>
      <summary>
        <h3>Border</h3>
      </summary>
      <div class="inputs">
        <StyleInput type="number" label="Border Width" path="borderWidth" unit="px" :attributes="{
          min: 0,
          max: 100
        }" />
        <StyleInput type="color" label="Border Color" path="borderColor" />
        <StyleInput type="select" label="Border Style" path="borderStyle" :options="[
          { value: 'solid' },
          { value: 'dotted' },
          { value: 'dashed' }
        ]" />
      </div>
    </details>
  </section>
</template>

<script>
import { mapWritableState, mapActions, storeToRefs } from 'pinia';
import { useTableSettingsStore } from '@/stores/tableSettings';
import StyleInput from './StyleInput.vue';

export default {
  components: {
    StyleInput
  },
  data() {
    return {
      setAllPaddingToValue: 0
    }
  },
  computed: {
    ...mapWritableState(useTableSettingsStore, ['tableStyles', 'imageStyles', 'innerContentStyles', 'settings']),
    imageSideOptions() {
      const options = [
        { value: 'left' },
        { value: 'right' }
      ]
      if (!this.settings.wrapText) {
        options.push({ value: 'top' })
        options.push({ value: 'bottom' })
      }

      return options
    },
    wrapText() {
      return this.settings.wrapText
    },
  },
  methods: {
    ...mapActions(useTableSettingsStore, ['setAllPaddingTo'])
  },
  watch: {
    wrapText: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.settings.imageSide = 'left'
        }
      }
    }
  },

  mounted() {

  }
}</script>