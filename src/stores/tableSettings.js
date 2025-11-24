import { defineStore } from 'pinia'

export const useTableSettingsStore = defineStore('tableSettings', {
    state: () => ({
        tableStyles: {
            color: '#FFFFFF',
            backgroundColor: '#000000',
            fontSize: '16px',
            lineHeight: '1.5',
            fontFamily: 'Arial',
            borderColor: '#696969',
            borderWidth: '0px',
            borderStyle: 'solid',
            fontWeight: 'normal',
            backgroundImage: "url('')",
            backgroundSize: "unset",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            paddingRight: '25px',
            paddingLeft: '25px',
            paddingBottom: '25px',
            paddingTop: '25px',
            fontStyle: 'normal',
            textAlign: 'left',
            letterSpacing: '0px'
        },
        speechStyles: {
            color: '#FF7A00',
            fontStyle: 'normal',
            fontFamily: 'Georgia',
            lineHeight: '1.5',
            fontWeight: 'normal',
            fontSize: '16px',
            letterSpacing: '0px'
        },
        innerContentStyles: {
            paddingRight: '25px',
            paddingLeft: '25px',
            paddingBottom: '25px',
            paddingTop: '25px',
            borderColor: '#696969',
            borderWidth: '0px',
            borderStyle: 'solid'
        },
        imageStyles: {
            float: 'none'
        },
        textOne: {
            color: '#FF7A00',
            fontStyle: 'normal',
            fontFamily: 'Georgia',
            lineHeight: '1.5',
            fontWeight: 'normal',
            fontSize: '16px',
            textAlign: 'center',
            letterSpacing: '0px'
        },
        textTwo: {
            color: '#FF7A00',
            fontStyle: 'normal',
            fontFamily: 'Georgia',
            lineHeight: '1.5',
            fontWeight: 'normal',
            fontSize: '16px',
            textAlign: 'center',
            letterSpacing: '0px'
        },
        settings: {
            customFont: '',
            device: 'desktop',
            imageSrc: '',
            wrapText: false,
            imageSide: 'left',
            imageSpacing: '16px',
            imageAlignment: 'start',
            imageWidthPercent: '50%',
            imageWidthPixels: '200px',
            useMaxHeight: false,
            maxHeight: '500px',
            textOne: '',
            textTwo: '',
            textOnePosition: 'top',
            textTwoPosition: 'bottom',
            useInnerContentArea: false,
            innerContentBackgroundColor: '#000000',
            innerContentBackgroundOpacity: 100,
            useTransparentBackground: false
        }
    }),
    getters: {
        allTableStyles(state) {
            return {
                ...state.tableStyles,
                ...{ gap: state.settings.imageSpacing },
                ...state.flexDirection,
                ...state.imageAlign,
            }
        },
        imageAlign(state) {
            let alignItems = 'flex-start'
            let justifyContent = 'flex-start'
            const alignment = state.settings.imageAlignment
            const side = state.settings.imageSide

            if (!state.settings.wrapText) {
                switch(side) {
                    case 'right':
                    case 'left':
                        switch(alignment) {
                            case 'start':
                            case 'end':
                                justifyContent = `flex-${alignment}`
                                break
                            case 'center':
                                justifyContent = 'center'
                                break
                        }
                        break
                    case 'top':
                    case 'bottom':
                        switch(alignment) {
                            case 'start':
                            case 'end':
                                alignItems = `flex-${alignment}`
                                break
                            case 'center':
                                alignItems = 'center'
                                break
                        }
                        break
                }
            }

            return {
                alignItems: alignItems,
                justifyContent: justifyContent
            }
        },
        maxHeightStyles(state) {
            const maxHeight = state.settings.useMaxHeight ? state.settings.maxHeight : 'unset'
            const overflow = state.settings.useMaxHeight ? 'auto' : 'unset'
            
            return {
                overflow: overflow,
                maxHeight: maxHeight
            }
        },
        processedImageStyles(state) {
            const imageStyles = state.imageStyles
            const styles = {
                ...imageStyles,
            }
            
            const wrapText = state.settings.wrapText
            const side = state.settings.imageSide

            if (wrapText) {
                styles.float = side
                switch(side) {
                    case 'left':
                        styles.marginRight = state.settings.imageSpacing
                        styles.marginBottom = state.settings.imageSpacing
                        break
                    case 'right':
                        styles.marginLeft = state.settings.imageSpacing
                        styles.marginBottom = state.settings.imageSpacing
                        break
                }
            }

            styles.width = `max(${state.settings.imageWidthPercent}, ${state.settings.imageWidthPixels})`

            return styles
        },
        innerContentBackground(state) {
            const opacity = state.settings.innerContentBackgroundOpacity
            const color = state.settings.innerContentBackgroundColor
            let hex = color

            if (opacity !== 100) {
                hex += opacity
            }

            return {
                backgroundColor: hex
            }
        },
        processedInnerContentStyles(state) {
            let styles = { ...state.maxHeightStyles, ...state.innerContentStyles }

            if (state.settings.useInnerContentArea) {
                styles = { ...styles, ...state.innerContentBackground }
            }

            return styles
        },
        flexDirection(state) {
            let direction = 'row'
            const side = state.settings.imageSide

            if (!state.settings.wrapText) {
                switch(side) {
                    case 'right':
                        direction = 'row-reverse'
                        break
                    case 'top':
                        direction = 'column'
                        break
                    case 'bottom':
                        direction = 'column-reverse'
                }
            }

            return {
                flexDirection: direction
            }
        },
    },
    actions: {
        setAllPaddingTo(value) {
            this.tableStyles.paddingTop = `${value}px`
            this.tableStyles.paddingRight = `${value}px`
            this.tableStyles.paddingBottom = `${value}px`
            this.tableStyles.paddingLeft = `${value}px`
        }
    }
})